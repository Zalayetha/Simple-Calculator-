const KEY_CACHE = 'Calculation_History';
function checkStorage() {
  return typeof Storage !== 'undefined';
}

function putHistory(data) {
  if (checkStorage()) {
    let historyData = null;
    if (localStorage.getItem(KEY_CACHE) === null) {
      historyData = [];
    } else {
      historyData = JSON.parse(localStorage.getItem(KEY_CACHE));
    }
    historyData.unshift(data);
    console.log('historyData');
    console.table(historyData);
    if (historyData.length > 5) {
      historyData.pop();
    }
    localStorage.setItem(KEY_CACHE, JSON.stringify(historyData));
  } else {
    alert('Tidak mendukung web storage');
  }
}
function showHistory() {
  if (checkStorage()) {
    return JSON.parse(localStorage.getItem(KEY_CACHE));
  } else {
    return [];
  }
}
function renderHistory() {
  let historyData = showHistory();
  let historyList = document.querySelector('.historyList');
  console.log(historyList);

  //   kosongkan html agar tidak terjadi tubrukan data
  historyList.innerHTML = '';
  let row = null;
  for (let history of historyData) {
    row = document.createElement('tr');
    row.innerHTML = '<td>' + history.firstNumber + '</td>';
    row.innerHTML += '<td>' + history.secondNumber + '</td>';
    row.innerHTML += '<td>' + history.operator + '</td>';
    row.innerHTML += '<td>' + history.result + '</td>';
    historyList.appendChild(row);
  }
}
renderHistory();
