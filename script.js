
// triggers function getMovie on keyup event
document.getElementById("movie-name").onkeyup = getMovie;

// id for movie
let movieId = 0;

// fetching data using getMovie
function getMovie() {
    // Getting movie name from searchbox
  var val = document.getElementById("movie-name").value;
  clearMovieList();

// Initializing xhrHttp request variable
  var xhr = new XMLHttpRequest();

    // Getting response from the api 
  xhr.onload = function () {
    var result = JSON.parse(xhr.response);
    var names = result.Search;

    if (names == null) {
      clearMovieList();
      console.log("not found");
    } else {
      for (var i of names) {
        var li = document.createElement("li");
        li.innerText = i.Title;
        li.id = i.imdbID;
        li.classList.add("list-group-item");
        li.addEventListener("click", function () {
          movieId = this.id;
          document.getElementById("movie-name").value = this.innerText;
          clearMovieList();
        // bringing the focus to input and display --------------------->
          document.getElementById("movie-name").focus();
          return;
        });

        var ul = document.getElementById("auto-complete").appendChild(li);
      }
    }
  };
  // xmlRequest
  xhr.open("get", "https://www.omdbapi.com/?&apikey=9f1f931&s=" + val);
  xhr.send();
}

// handling " Enter " key event
document.getElementById("movie-name").addEventListener("keydown", function (e) {
  if (e.keyCode == 13) {
    if (movieId == 0) {
      alert("No movie found!!!");
    } else {
      showMovie();
    }
  }
});

function clearMovieList() {
  var list = document.getElementById("auto-complete");
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
}

document.getElementById("btn-search").addEventListener("click", showMovie);

function showMovie(){
    var name = document.getElementById("movie-name").value;
    if (name == "") {
        alert("Please enter the name of movie");
    }
    else if (movieId == 0) {
        alert("No movie found");
    }
    else {
        window.open("show_movie.html?id=" + movieId, "blank");
        console.log(movieId);
    }
}

document.getElementById("btn-favourite").addEventListener("click", function () {
    window.location.assign("favourite_movies.html");
})