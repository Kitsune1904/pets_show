const chooseBtns = document.getElementsByClassName("choose-btn");
const automaticBtn = document.getElementById("automatic");
const handleBtn = document.getElementById("handle");
const createAutoTableBtn = document.getElementById("autoAgree");
const reloadTableBtn = document.getElementById("reloadTableBtn");
const startAgainBtn = document.getElementById("startAgainBtn");

const reloadHandTableBtn = document.getElementById("reloadHandTableBtn");
const startAgainHandBtn = document.getElementById("startAgainHandBtn");

const settingsBtns = document.getElementsByClassName("settings");

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
const backHandTableArrow = document.getElementById("backHandTableArrow");

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

backHandTableArrow.addEventListener("click", () => {
  tableHolderHand.style.display = "none";
  modeBlock.style.display = "flex";
});

startAgainBtn.addEventListener("click", () => {
  location.reload(true);
});

startAgainHandBtn.addEventListener("click", () => {
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

const getAndColorWinner = (juryCount, table, rowsNum, isHandle) => {
  let sumArr = [];
  for (let row = 1; row < rowsNum; row++) {
    let sum = 0;
    for (let col = 1; col <= juryCount + 1; col++) {
      if (isHandle) {
        const valueName = table.rows[row].cells[0].children[0].value;
        if (valueName == "") {
          alert("Нет клички животного");
          throw new Error("not all values");
        }
        table.rows[row].cells[0].children[0].disabled = true;
      }
      if (col != juryCount + 1) {
        const value = Number(table.rows[row].cells[col].children[0].value);
        if (value === 0) {
          alert("Заполните все поля");
          throw new Error("not all values");
        } else {
          sum += value;
        }
        const inputObj = table.rows[row].cells[col].children[0];
        inputObj.disabled = true;
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
  getAndColorWinner(juryNum, table, rows, false);
  reloadTableBtn.style.display = "none";
  startAgainBtn.style.display = "block";
  backAutoTableArrow.style.display = "none";
  tableTitle.innerText = "Поздравляем победителей!!!";
  document.getElementById("autoText").style.display = "none";
});

const createAndFillRow = (colNum) => {
  const row = document.createElement("tr");
  for (let i = 0; i < colNum; i++) {
    const input = document.createElement("input");
    const col = document.createElement("td");
    if (i == colNum - 1) {
      row.appendChild(col);
    } else {
      if (i == 0) {
        input.type = "text";
      } else {
        input.type = "number";
      }
      col.appendChild(input);
      row.appendChild(col);
    }
  }
  return row;
};

const addAndRemoveCell = (table, isAdd) => {
  for (let i = 0; i < table.rowsNum; i++) {
    const row = table.body.rows[i];
    const input = document.createElement("input");
    const place = table.colCount - 1;
    if (isAdd) {
      const newCell = row.insertCell(place);
      if (table.colCount > 10) {
        alert("Вы не можете добавить больше 10 судей");
        throw new Error("Cant add more columes");
      }
      if (i == 0) {
        newCell.innerText = `Судья ${table.colCount - 1}`;
      } else {
        input.type = "number";
        newCell.appendChild(input);
      }
    } else {
      if (table.colCount == 4) {
        alert("Вы не можете удалить этот столбец");
        throw new Error("Cant delete this col");
      } else {
        row.deleteCell(table.colCount - 2);
      }
    }
  }
};

const settHandleTable = (actionType, table) => {
  switch (actionType) {
    case "addRow":
      if (table.rowsNum >= 20) {
        alert("Вы не можете добавить больше 20 строк");
      }
      table.body.appendChild(createAndFillRow(table.colCount));
      break;
    case "removeRow":
      if (table.rowsNum == 3) {
        alert("Вы не можете удалить эту строку");
      } else {
        table.body.deleteRow(table.rowsNum - 1);
      }
      break;
    case "addCol":
      addAndRemoveCell(table, true);
      break;
    case "removeCol":
      addAndRemoveCell(table, false);
      break;
  }
};

handleBtn.addEventListener("click", () => {
  tableHolderHand.style.display = "flex";
  modeBlock.style.display = "none";
});

const getTableInfo = () => {
  const handTableInfo = {};
  handTableInfo.body = document.getElementById("handleTableBlock");
  handTableInfo.rowsArr = Array.from(handleTableBlock.rows);
  handTableInfo.rowsNum = handTableInfo.rowsArr.length;
  handTableInfo.colCount = handTableInfo.rowsArr[0].children.length;
  return handTableInfo;
};

Array.from(settingsBtns).forEach((element) => {
  element.addEventListener("click", () => {
    const handTableInfo = getTableInfo();
    const actionType = element.id;
    settHandleTable(actionType, handTableInfo);
  });
});

reloadHandTableBtn.addEventListener("click", () => {
  let handTableInfo = getTableInfo();
  console.log(handTableInfo);
  const juryCount = handTableInfo.colCount - 2;
  getAndColorWinner(juryCount, handTableInfo.body, handTableInfo.rowsNum, true);
  Array.from(settingsBtns).forEach(
    (element) => (element.style.display = "none")
  );
  backHandTableArrow.style.display = "none";
  startAgainHandBtn.style.display = "block";
  reloadHandTableBtn.style.display = "none";
  const p = document.getElementById("handText");
  p.classList.add("congrat");
  p.innerText = "Поздравляем победителей!!!";
});
