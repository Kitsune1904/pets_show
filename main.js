const chooseBtns = document.getElementsByClassName("choose-btn");
const automatic = document.getElementById("automatic");
const handle = document.getElementById("handle");
const autoAgree = document.getElementById("autoAgree");

const mainBlock = document.getElementsByClassName("main")[0];
const modeBlock = document.getElementsByClassName("mode")[0];
const autoBlock = document.getElementsByClassName("auto")[0];

const backPetsArrow = document.getElementById("backPetsArrow");
const backAutoArrow = document.getElementById("backAutoArrow");

let choosenId;

Array.from(chooseBtns).forEach((element) => {
  element.addEventListener("click", () => {
    mainBlock.style.display = "none";
    modeBlock.style.display = "flex";
    choosenId = element.id;
  });
});

backPetsArrow.addEventListener("click", () => {
  mainBlock.style.display = "flex";
  modeBlock.style.display = "none";
});


automatic.addEventListener("click", () => {
  modeBlock.style.display = "none";
  autoBlock.style.display = "flex";
})

backAutoArrow.addEventListener("click", () => {
  autoBlock.style.display = "none";
  modeBlock.style.display = "flex";
});

const checkData = (checkedEl, petsCount) => {
  if(checkedEl.value === "") {
    alert("")
  }
}

autoAgree.addEventListener("click", () => {

})