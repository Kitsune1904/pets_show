const chooseBtns = document.getElementsByClassName("choose-btn");
const automaticBtn = document.getElementById("automatic");
const handleBtn = document.getElementById("handle");
const createAutoTableBtn = document.getElementById("autoAgree");

const mainBlock = document.getElementsByClassName("main")[0];
const modeBlock = document.getElementsByClassName("mode")[0];
const autoBlock = document.getElementsByClassName("auto")[0];

const tableBlock = document.getElementById("tableHolder");
const tableTitle = document.getElementById("tableTitle");

const backPetsArrow = document.getElementById("backPetsArrow");
const backAutoArrow = document.getElementById("backAutoArrow");

const juryCount = document.getElementById("juryCount");
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

automaticBtn.addEventListener("click", () => {
  modeBlock.style.display = "none";
  autoBlock.style.display = "flex";
});

backAutoArrow.addEventListener("click", () => {
  autoBlock.style.display = "none";
  modeBlock.style.display = "flex";
});

const isNormalData = (checkedEl, petsNum) => {
  const duplicates = checkedEl.filter(
    (item, index) => checkedEl.indexOf(item) !== index
  );
  if (checkedEl.length != petsNum || checkedEl.length === 1) {
    alert("Введенное кол-во имен не совпадает с кол-вом участников.");
    return false;
  }
  if (duplicates.length != 0) {
    alert(
      `У вас повторяются имена животных. Придумайте для ${duplicates.map(
        (value) => value
      )} отличия.`
    );
    return false;
  }
  return true;
};

const createAutoTable = (petsCount, juryCount, petsNames) => {
  const title = `Добро пожаловать на выставку ${
    choosenId === "catBtn" ? "кошек!" : "собак!"
  }`;
  tableTitle.innerText = title;
  const table = document.createElement("table");
  for (let row = 0; row <= petsCount; row++) {
    const tableRow = document.createElement("tr");
    for (let col = 0; col <= juryCount+1; col++) {
      const cell = document.createElement("td");
      if (row == 0 && col != 0 && col != juryCount+1) {
        cell.appendChild(document.createTextNode(`Судья ${col}`));
      }
      else if (col == 0 && row != 0 ) {
        cell.appendChild(document.createTextNode(`${petsNames[row-1]}`));
      } else if (col != 0 && row != 0 && col != juryCount+1) {
        const input = document.createElement("input");
        input.type = "number"
        cell.appendChild(input);
      } else if (col == juryCount+1 && row == 0) {
        cell.appendChild(document.createTextNode("Сумма"))
      } else if (col == juryCount+1 && row != 0) {
        cell.appendChild(document.createTextNode(""))
      } else {
        const petSpan = document.createElement("span");
        const jurySpan = document.createElement("span");
        petSpan.appendChild(document.createTextNode("Клички"));
        jurySpan.appendChild(document.createTextNode("Судьи"));
        cell.appendChild(jurySpan);
        cell.appendChild(petSpan);
      }
      tableRow.appendChild(cell);
    }
    table.appendChild(tableRow);
  }
  tableBlock.appendChild(table);
};



createAutoTableBtn.addEventListener("click", () => {
  const petsNameArr = petsName.value.split(",");
  const petsNum = Number(petsCount.value);
  const juryNum = Number(juryCount.value);
  if (isNormalData(petsNameArr, petsNum)) {
    autoBlock.style.display = "none";
    tableBlock.style.display = "flex";
    createAutoTable(petsNum, juryNum, petsNameArr);
  } else {
    alert("Выполните все условия для генерации таблицы");
  }
});
