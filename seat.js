
const forms=document.querySelector('#formitem');
const movieTitle=document.getElementById('movietitless');
let numberOfSeats=document.getElementById('seat');
let prices = document.getElementById('price');
const seatContainer=document.querySelector('.theatreroom');
const seatSelection=document.querySelectorAll('.seats:not(.reserveds)');



const baseUrl ='https://api.themoviedb.org/3';
const apiKey ='api_key=06b3976eb4a79e0488be027200e686a1';
const nowPlaying = '/movie/now_playing?';
const moviestored= baseUrl+nowPlaying+apiKey ;



function updatedSelected (){
prices.value=12;
    const selectedSeats = document.querySelectorAll('.selecteds');
    const selectedSeatsCount=selectedSeats.length;
    numberOfSeats.value=selectedSeatsCount;
  let  priceTotal=selectedSeatsCount*prices.value;
  prices.value=priceTotal;


}

function seatFunction(e) {
    if(e.target.classList.contains('seats') && !e.target.classList.contains('reserveds')) {
        e.target.classList.toggle('selecteds');

    updatedSelected();

    }
}

seatContainer.addEventListener('click', seatFunction)



 //fetch request for nowshowing movies

 async function movieData (url) {
    let urlNow = await fetch(url);
    let moviesresponse = await urlNow.json();
    let moviesResults=moviesresponse.results;
    showMovies(moviesResults);
    
    
 }  


 function showMovies (data) {
  data.forEach(mov => {
    const{title}=mov; 
  let options =document.createElement('option');
options.innerText=`${title}`;
  movieTitle.appendChild(options);
  
  
  
  
  
  });
    }

movieData(moviestored);

