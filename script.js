// selectors
const arrowLeft = document.querySelector(".leftarrow");
const arrowRight = document.querySelector(".rightarrow");
const sliderImages = document.querySelectorAll(".slides");
const sliderImage1 = document.querySelector(".slide1");
const sliderImage2 = document.querySelector(".slide2");
const sliderImage3 = document.querySelector(".slide3");
const slideMovieTitle = document.querySelectorAll(".movietitle");
const slideMovieDetails = document.querySelectorAll(".moviedetails");
const slideBookNow = document.querySelector(".book");
let current = 0;
const moviesection = document.querySelector(".moviessection");
const upcomingmoviesection = document.querySelector(".upcomingmoviessection");

//api url
const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "api_key=06b3976eb4a79e0488be027200e686a1";
const nowPlaying = "/movie/now_playing?";
const upcomingMovies = "/movie/upcoming?";
const videoAppend = "&append_to_response=videos";
const moviestored = baseUrl + nowPlaying + apiKey + videoAppend;

const upcomingstored = baseUrl + upcomingMovies + apiKey;
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
const backgroundImageUrl = "https://image.tmdb.org/t/p/original";

const mobileNavBar = document.querySelector(".mobilenav");

function navBarFunction() {
  let mobileUi = document.querySelector(".mobileul");
  if (mobileUi.style.display === "block") {
    mobileUi.style.display = "none";
  } else {
    mobileUi.style.display = "block";
  }
}

mobileNavBar.addEventListener("click", navBarFunction);

// image slider

async function backgroundData(url) {
  let urlNow = await fetch(url);
  let bgi = await urlNow.json();
  let nowResults = bgi.results;
  apiSlides(nowResults);
}

//collection of data from api for  slider heropage
function apiSlides(dt) {
  dt.forEach((elem, index) => {
    const { title, overview, backdrop_path, id } = elem;
    if (index === 0) {
      sliderImage1.style.backgroundImage = `url(${
        backgroundImageUrl + backdrop_path
      })`;
      slideMovieTitle[0].textContent = `${title}`;
      slideMovieDetails[0].textContent = `${overview}`;
    }
    if (index === 1) {
      sliderImage2.style.backgroundImage = `url(${
        backgroundImageUrl + backdrop_path
      })`;
      slideMovieTitle[1].innerHTML = `${title}`;
      slideMovieDetails[1].textContent = `${overview}`;
    }
    if (index === 2) {
      sliderImage3.style.backgroundImage = `url(${
        backgroundImageUrl + backdrop_path
      })`;
      slideMovieTitle[2].textContent = `${title}`;
      slideMovieDetails[2].textContent = `${overview}`;
    }
  });
}

backgroundData(moviestored);
//  reset slider
function reset() {
  for (let i = 0; i < sliderImages.length; i++) {
    sliderImages[i].style.display = "none";
  }
}
function startSlide() {
  for (let i = 0; i < sliderImages.length; i++) {
    sliderImages[0].style.display = "flex";
  }
}
// Show prev
function slideLeft() {
  reset();
  sliderImages[current - 1].style.display = "flex";
  current--;
}

// Show next
function slideRight() {
  reset();
  sliderImages[current + 1].style.display = "flex";
  current++;
}

// Left arrow click
arrowLeft.addEventListener("click", function () {
  if (current === 0) {
    current = sliderImages.length;
  }
  slideLeft();
});

// Right arrow click
arrowRight.addEventListener("click", function () {
  if (current === sliderImages.length - 1) {
    current = -1;
  }
  slideRight();
});
setInterval(() => {
  if (current === sliderImages.length - 1) {
    current = -1;
  }
  slideRight();
}, 6000);
startSlide();

//fetch request for nowshowing movies

async function movieData(url) {
  let urlNow = await fetch(url);
  let moviesresponse = await urlNow.json();
  let moviesResults = moviesresponse.results;
  showMovies(moviesResults);
}

//fetch request for upcoming movies
async function upcomingData(url) {
  let urlNow = await fetch(url);
  let upcomingresponse = await urlNow.json();
  let upcomingResults = upcomingresponse.results;

  upcoming(upcomingResults);
}

// creating of elements in function for nowshowing

function showMovies(data) {
  moviesection.innerHTML = "";
  data.forEach((mov) => {
    const {
      title,
      overview,
      backdrop_path,
      genre_ids,
      poster_path,
      id,
      video,
    } = mov;
    let trailer = baseUrl + "/movie/" + id + "/videos?" + apiKey;
    function youtubetry(params) {
      let re = params.split();
      re.forEach((element) => {
        let youtubeTrailerLink = "https://www.youtube.com/embed/" + element;
        let movies = document.createElement("div");

        movies.className = "movie";
        movies.innerHTML = `<div class="imageandtitle">
    <img src="${imageBaseUrl + poster_path}" alt="${title}">
    
    </div>
    <span class="moviename">${title}</span>
    <span class="genre"></span>
    <div class="moviedetails">
    <p>${overview}</p>
    
    
    </div>
    <div class="watchtrailer">
    <i class="far fa-play-circle "><a class="trailerplay" href="#" >Watch Trailer</a> </i>
    </div>
    <div class="bookbutton">
    <button><a href="seats.html">Book Now</a></button>
    </div>`;
        function videoPopUp(e) {
          if (e.target.classList.contains("trailerplay")) {
            const iframeModal = document.querySelector(".frame");
            iframeModal.src = youtubeTrailerLink;
            const youtubeModal = document.querySelector(".youtubemodal");

            youtubeModal.style.display = "block";
            const closeModal = document.querySelector(".closemodal");
            function closeModalFunction() {
              youtubeModal.style.display = "none";
              iframeModal.src = "#";
            }
            closeModal.addEventListener("click", closeModalFunction);
          }
        }

        moviesection.appendChild(movies);
        movies.addEventListener("click", videoPopUp);
      });
    }

    // let trailer = baseUrl + "/movie/" + id + "/videos?" + apiKey;

    async function trailerApi(url) {
      let urlTrailerNow = await fetch(url);
      let trailerResponse = await urlTrailerNow.json();
      let trailerResults = trailerResponse.results[0].key;

      youtubetry(trailerResults);
    }

    trailerApi(trailer);
  });
}

function upcoming(d) {
  upcomingmoviesection.innerHTML = "";
  d.forEach((up) => {
    const { title, poster_path, release_date } = up;
    let upcomingM = document.createElement("div");
    upcomingM.className = "upcomingmovie";
    upcomingM.innerHTML = `<div class="imageandtitle">
  <img src="${imageBaseUrl + poster_path}" alt="${title}">
  
</div>
<span class="moviename">${title}</span>
<span class="moviename"> Release Date: ${release_date}</span>

</div>
`;

    upcomingmoviesection.appendChild(upcomingM);
  });
}
movieData(moviestored);
upcomingData(upcomingstored);
