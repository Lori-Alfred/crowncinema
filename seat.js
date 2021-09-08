const forms = document.querySelector("#formitem");
const movieTitle = document.getElementById("movietitless");
let numberOfSeats = document.getElementById("seat");
let prices = document.getElementById("price");
let pickDate = document.getElementById("pickadate");
let enterName = document.getElementById("entername");
const seatContainer = document.querySelector(".theatreroom");

const closeTicket = document.querySelector(".closeticket");
const printTicket = document.querySelector(".printticket");
const formBox = document.querySelector(".formbox");
const ticketModal = document.querySelector(".ticketmodal");
const ticketLoader = document.querySelector(".ticketloader");
const ticketName = document.querySelector(".ticketname");
const seatwrapper = document.querySelector(".seatwrapper");
const seatSelection = document.querySelectorAll(".seats:not(.reserveds)");

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "api_key=06b3976eb4a79e0488be027200e686a1";
const nowPlaying = "/movie/now_playing?";
const moviestored = baseUrl + nowPlaying + apiKey;

// loader script
function loaderScript(e) {
  e.preventDefault();

  if (formBox.value) {
    seatwrapper.style.display = "none";
    seatwrapper.style.opacity = "0";
    ticketLoader.style.display = "flex";
    ticketLoader.style.opacity = "1";
  }
  setTimeout(() => {
    seatwrapper.style.display = "block";
    seatwrapper.style.opacity = "1";
    ticketLoader.style.display = "none";
    ticketLoader.style.opacity = "0";
  }, 5000);
  setTimeout(() => {
    ticketModal.style.display = "block";
    ticketName.value = enterName.value;
  }, 1000);
  closeTicket.addEventListener("click", () => {
    ticketModal.style.display = "none";
    seatwrapper.style.opacity = "1";
  });
  seatwrapper.addEventListener("click", () => {
    ticketModal.style.display = "none";
  });
  printTicket.addEventListener("click", () => {
    window.print();
  });
}
document.querySelector(".formbutton").addEventListener("click", loaderScript);
//ticket gneration function

function updatedSelected() {
  prices.value = 12;
  const selectedSeats = document.querySelectorAll(".selecteds");
  const selectedSeatsCount = selectedSeats.length;
  numberOfSeats.value = selectedSeatsCount;
  let priceTotal = selectedSeatsCount * prices.value;
  prices.value = priceTotal;
}

function seatFunction(e) {
  if (
    e.target.classList.contains("seats") &&
    !e.target.classList.contains("reserveds")
  ) {
    e.target.classList.toggle("selecteds");

    updatedSelected();
  }
}

seatContainer.addEventListener("click", seatFunction);

//fetch request for nowshowing movies

async function movieData(url) {
  let urlNow = await fetch(url);
  let moviesresponse = await urlNow.json();
  let moviesResults = moviesresponse.results;
  showMovies(moviesResults);
}

function showMovies(data) {
  data.forEach((mov) => {
    const { title } = mov;
    let options = document.createElement("option");
    options.innerText = `${title}`;
    movieTitle.appendChild(options);
  });
}

movieData(moviestored);
