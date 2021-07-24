// selectors
let arrowLeft = document.querySelector('.leftarrow');
let arrowRight = document.querySelector('.rightarrow');
let sliderImages=document.querySelectorAll('.slides');
current=0;


// image slider 
//  reset slider
function reset () {
    for(i=0; i<sliderImages.length; i++) {
        sliderImages[i].style.display ="none";
    }
}
function startSlide () {
    for(i=0; i<sliderImages.length; i++) {
        sliderImages[0].style.display ="flex";
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
  arrowLeft.addEventListener("click", function() {
    if (current === 0) {
      current = sliderImages.length;
    }
    slideLeft();
  });
  
  // Right arrow click
  arrowRight.addEventListener("click", function() {
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
  