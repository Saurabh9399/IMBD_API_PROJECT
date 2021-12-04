
//Fetching Movie from api
var xhrRequest = new XMLHttpRequest();

// Accessing the Movie id from current window object for use
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var movieId = urlParams.get("id");
let movieObject = null;

//after we get response , we will handel the data with function
xhrRequest.onload = function () {
  var result = JSON.parse(xhrRequest.response);
  // Getting all the available data for use ------------>
  var names = result;
  movieObject = names;
  fillmoviedata(movieObject);
  document.getElementById("movie-image").attributes.src = movieObject.image.url;
};
//Making a connection
xhrRequest.open("get", "https://www.omdbapi.com/?apikey=9f1f931&i=" + movieId);
//sending request
xhrRequest.send();



// fillmoviedata function to fill all the  Movie data 

function fillmoviedata(data) {
  var img = document.getElementById("movie-image");
  img.setAttribute("src", data.Poster);
  document.getElementById("movie-name").innerText = data.Title;
  allDetails((data.Poster = ""));
  allDetails(data);
  var connections = data.connections["group-affiliation"];
  document.getElementById("connections").innerText =
    "Connections : " + connections;
  var publisher = document.createElement("span");
  publisher.innerText = data.allDetails.publisher;
  publisher.style.fontFamily = "sans-serif";
  publisher.style.fontSize = "1.3rem";
  document.getElementById("additional-info").appendChild(publisher);
}


// this function shows all details of movie searched
function allDetails(bio) {
  console.log(bio);
  for (const [key, value] of Object.entries(bio)) {
    var p = document.createElement("p");
    p.innerText = `${key}: ${value}`;
    p.style.textTransform = "capitalize";
    document.getElementById("occupation").appendChild(p);
  }
}

// Adding stats of the Movie elemnets 
function AddRuntime(Runtime) {

  // Traversing through Runtime
  for (const [key, value] of Object.entries(Runtime)) {
    var p = document.createElement("p");
    p.innerText = `${key}: ${value}`;
    p.classList.add("details");
    document.getElementById("movie-details").appendChild(p);
  }
}


//Function to show alert message and display
document
  .getElementById("btn-add-favourite")
  .addEventListener("click", addToFavourite);
function showToastMesage(added) {
  var message;
  if (added) {
    message = "Added your Movie to Favourites Successfully!";
  } else {
    message = "Movie Already Added!";
  }
  var elem = document.getElementById("msg-container");
  elem.innerText = message;
  elem.style.display = "block";
  setTimeout(function () {
    elem.style.display = "none";
  }, 1300);
}

// function to add the ----Movie ----------->

function addToFavourite() {
  let movieName = movieObject.Title;
  let movieImage = movieObject.Poster;
  var movie = {
    id: movieId,
    name: movieName,
    image: movieImage,
  };
  // pushing data from and to local storage ------------------>

  var titleStired = JSON.parse(localStorage.getItem("names") || "[]");

  if (titleStired == null) {
    var names = [];
    names.push(movie);
    window.localStorage.setItem("names", JSON.stringify(names));
    showToastMesage(true);
  } else {
    var res = containsObject(movieId, titleStired);
    console.log(res);
    if (!res) {
      titleStired.push(movie);
      window.localStorage.setItem("names", JSON.stringify(titleStired));
      showToastMesage(true);
    } else {
      showToastMesage(false);
    }
  }

  console.log(titleStired);
}
// Function to check if movie already added -------------->

function containsObject(id, list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id == id) {
      return true;
    }
  }
  return false;
}
// on clicking my favourite button ---------------->
document.getElementById("btn-favourite").addEventListener("click", function () {
  window.location.assign("favourite_movies.html");
});
