const apiUrl = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';
const errMessage = '系統不穩定，請再試一次！';

// 印出中獎資訊
function printData(num, str) {
  const div = document.createElement('div');
  div.classList.add(`prize${num}`);
  div.innerHTML = `
    <div class="prize__item">
      <h3 class="prize__title">${str}</h3>
      <div class="prize__content-btn">
        <button class="btn__prize" onclick="javascript:window.location.reload()">我要抽獎</button>
      </div>
    </div>`;
  document.querySelector('section').appendChild(div);
}
// 串 api
function drawApi(callback) {
  const request = new XMLHttpRequest();
  request.open('GET', apiUrl, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      let json;
      try {
        json = JSON.parse(request.responseText);
      } catch (err) {
        callback(errMessage);
        return;
      }
      if (!json.prize) {
        callback(errMessage);
        return;
      }
      callback(null, json);
    } else {
      callback(errMessage);
    }
  };
  request.onerror = function() {
    callback(errMessage);
  };
  request.send();
}

document.querySelector('.btn__draw').addEventListener('click', () => {
  drawApi((err, data) => {
    if (err) {
      alert(errMessage);
      return;
    }
    document.querySelector('.draw').classList.toggle('hide');
    switch (data.prize) {
      case 'FIRST':
        printData(1, '恭喜你中頭獎了！日本東京來回雙人遊！');
        break;
      case 'SECOND':
        printData(2, '恭喜你中貳獎了！90 吋電視一台！');
        break;
      case 'THIRD':
        printData(3, '恭喜你中參獎了！知名 YouTuber 簽名握手會入場券一張！');
        break;
      case 'NONE':
        printData(0, '銘謝惠顧');
        break;
    }
  });
});
