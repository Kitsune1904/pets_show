const chooseBtns = document.getElementsByClassName("choose-btn");
const automaticBtn = document.getElementById("automatic");
const handleBtn = document.getElementById("handle");
const createAutoTableBtn = document.getElementById("autoAgree");
const reloadTableBtn = document.getElementById("reloadTableBtn");
const startAgainBtn = document.getElementById("startAgainBtn");

const mainBlock = document.getElementsByClassName("main")[0];
const modeBlock = document.getElementsByClassName("mode")[0];
const autoBlock = document.getElementsByClassName("auto")[0];
const tableBlock = document.getElementById("tableHolder");

const tableTitle = document.getElementById("tableTitle");
const tableContainer = document.getElementById("tableContainer");

const backPetsArrow = document.getElementById("backPetsArrow");
const backAutoArrow = document.getElementById("backAutoArrow");
const backHandleArrow = document.getElementById("backHandleArrow");
const backAutoTableArrow = document.getElementById("backAutoTableArrow");

const juryCount = document.getElementById("juryCount");
const petsCount = document.getElementById("petsCount");
const petsName = document.getElementById("petsName");

let choosenId;
let petsNum;
let juryNum;

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

backAutoTableArrow.addEventListener("click", () => {
  tableContainer.innerHTML = "";
  petsName.value = [];
  tableBlock.style.display = "none";
  autoBlock.style.display = "flex";
});

startAgainBtn.addEventListener("click", () => {
  location.reload(true);
});

const isNormalData = (checkedEl, petsNum) => {
  const duplicates = [
    ...new Set(checkedEl.filter((e, i, a) => a.indexOf(e) !== i)),
  ];
  if (checkedEl.length != petsNum || checkedEl.length === 1) {
    alert("Введенное кол-во имен не совпадает с кол-вом участников.");
    return false;
  }
  if (duplicates.length != 0) {
    alert(
      `У вас повторяются имена животных. Придумайте для ${duplicates.join(
        ", "
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
  table.id = "tabela";
  for (let row = 0; row <= petsCount; row++) {
    const tableRow = document.createElement("tr");
    for (let col = 0; col <= juryCount + 1; col++) {
      const cell = document.createElement("td");
      if (row == 0 && col != 0 && col != juryCount + 1) {
        cell.appendChild(document.createTextNode(`Судья ${col}`));
      } else if (col == 0 && row != 0) {
        cell.appendChild(document.createTextNode(`${petsNames[row - 1]}`));
      } else if (col != 0 && row != 0 && col != juryCount + 1) {
        const input = document.createElement("input");
        input.type = "number";
        cell.appendChild(input);
      } else if (col == juryCount + 1 && row == 0) {
        cell.appendChild(document.createTextNode("Сумма"));
      } else if (col == juryCount + 1 && row != 0) {
        cell.appendChild(document.createTextNode(""));
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
  tableContainer.appendChild(table);
};

createAutoTableBtn.addEventListener("click", () => {
  const petsNameArr = petsName.value.split(",");
  petsNum = Number(petsCount.value);
  juryNum = Number(juryCount.value);
  if (isNormalData(petsNameArr, petsNum)) {
    autoBlock.style.display = "none";
    tableBlock.style.display = "flex";
    createAutoTable(petsNum, juryNum, petsNameArr);
    tableBlock.appendChild(reloadTableBtn);
  } else {
    alert("Выполните все условия для генерации таблицы");
  }
});

const getAndColorWinner = (juryCount, table, rows) => {
  let sumArr = [];
  for (let row = 1; row < rows; row++) {
    let sum = 0;
    for (let col = 1; col <= juryCount + 1; col++) {
      if (col != juryCount + 1) {
        let value = Number(table.rows[row].cells[col].children[0].value);
        if (value === 0) {
          alert("Заполните все поля");
          throw new Error("not all values");
        } else {
          sum += value;
        }
      } else {
        table.rows[row].cells[col].innerText = `${sum}`;
      }
    }
    sumArr.push({ sum: sum, row: table.rows[row], place: -1 });
  }
  sumArr.sort((a, b) => b.sum - a.sum);
  const unicSumArr = new Set(sumArr.map((obj) => obj.sum));
  const sortedUnicSumArr = Array.from(unicSumArr).sort((a, b) => b - a);
  sumArr.forEach((obj) => (obj.place = sortedUnicSumArr.indexOf(obj.sum) + 1));
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  sumArr.forEach((obj) => {
    const row = obj.row;
    switch (obj.place) {
      case 1:
        row.style.boxShadow = "inset 0 10px 30px 5px rgba(255, 230, 0, 0.781)";
        break;
      case 2:
        row.style.boxShadow = "inset 0 10px 30px 5px rgba(221, 255, 255, 0.87)";
        break;
      case 3:
        row.style.boxShadow = "inset 0 10px 30px 5px rgba(189, 113, 0, 0.87)";
        break;
    }
    table.appendChild(row);
  });
};

reloadTableBtn.addEventListener("click", () => {
  const table = document.getElementById("tabela");
  const rows = table.rows.length;
  juryNum = Number(juryCount.value);
  tableTitle.innerText = "Поздравляем победителей!";
  getAndColorWinner(juryNum, table, rows);
  reloadTableBtn.style.display = "none";
  startAgainBtn.style.display = "block";
  backAutoTableArrow.style.display = "none";
});


handleBtn.addEventListener("click", () => {

})