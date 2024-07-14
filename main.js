const chooseBtns = document.getElementsByClassName("choose-btn");
const automatic = document.getElementById("automatic");
const handle = document.getElementById("handle");
const autoAgree = document.getElementById("autoAgree");

const mainBlock = document.getElementsByClassName("main")[0];
const modeBlock = document.getElementsByClassName("mode")[0];
const autoBlock = document.getElementsByClassName("auto")[0];

const backPetsArrow = document.getElementById("backPetsArrow");
const backAutoArrow = document.getElementById("backAutoArrow");

const petsCount = document.getElementById("petsCount");
const petsName = document.getElementById("petsName");


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

const isNormalData = (checkedEl, petsNum) => {
  const petsNames = checkedEl.value.split(",");
  const count = petsNum.value;
  const duplicates = petsNames.filter((item, index) => petsNames.indexOf(item) !== index);
  console.log(petsNames)
  console.log(petsNames.length)
  console.log(count)
  console.log(duplicates)
  if(petsNames.length != count || petsNames.length === 1) {
    alert("Введенное кол-во имен не совпадает с кол-вом участников.")
    return false
  }
  if(duplicates.length != 0) {
    alert(`У вас повторяются имена животных. Придумайте для ${duplicates.map((value) => value)} отличия.`)
    return false
  }
  return true
}



autoAgree.addEventListener("click", () => {
  isNormalData(petsName, petsCount)
})