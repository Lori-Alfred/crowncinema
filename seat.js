document.getElementById('movietitle').value="alfred";
let numberOfSeats=document.getElementById('seat');
let prices = document.getElementById('price');
const seatContainer=document.querySelector('.theatreroom');
const seatSelection=document.querySelectorAll('.seats:not(.reserveds)');
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