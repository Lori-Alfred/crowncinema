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
