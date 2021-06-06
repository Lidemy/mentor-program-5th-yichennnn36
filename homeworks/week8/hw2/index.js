const baseUrl = 'https://api.twitch.tv/kraken';
const CLIENT_ID = 'hv6q8btkyedopx5cir6xk0884d1067';
const STREAM_TEMPLATE = `
        <a href="https://www.twitch.tv/$name" target="_blank">
          <div class="games__preview"><img src="$preview"></div>
          <div class="games__content">
            <div class="games__logo"><img src="$logo"></div>
            <div class="games__channel">
              <div class="games__channel-status">$status</div>
              <div class="games__channel-name">$displayName</div>
            </div>
          </div>
        </a>`;
// 串 API
function sendRequest(qs, callback) {
  const req = new XMLHttpRequest();
  req.open('GET', `${baseUrl}/${qs}`, true);
  req.setRequestHeader('Client-ID', CLIENT_ID);
  req.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  req.onload = function() {
    if (req.status >= 200 && req.status < 400) {
      let data;
      try {
        data = JSON.parse(req.responseText);
      } catch (err) {
        console.log(err);
        return;
      }
      callback(data);
    } else {
      console.log(req.responseText);
    }
  };
  req.onerror = function() {
    console.log('error');
  };
  req.send();
}
// 列出實況 function
function getStreams(data) {
  for (const ele of data) {
    const div = document.createElement('div');
    div.classList.add('games__block');
    div.innerHTML = STREAM_TEMPLATE
      .replace('$name', ele.channel.name)
      .replace('$preview', ele.preview.large)
      .replace('$logo', ele.channel.logo)
      .replace('$status', ele.channel.status)
      .replace('$displayName', ele.channel.display_name);
    document.querySelector('.games').appendChild(div);
  }
  delEmptyStreams();
  emptyStreams();
  emptyStreams();
}
// 添加空的 div 美化排版
function emptyStreams() {
  const emptyDiv = document.createElement('div');
  emptyDiv.classList.add('empty__block');
  document.querySelector('.games').appendChild(emptyDiv);
}
// 刪除空的 div
function delEmptyStreams() {
  const delEmptyDiv = document.querySelectorAll('.empty__block');
  for (const ele of delEmptyDiv) {
    document.querySelector('.games').removeChild(ele);
  }
}
// 換遊戲
function changeGame(gameName) {
  // 更改 games title
  document.querySelector('.games__title').innerText = gameName;
  // 清空 games 區域
  document.querySelector('.games').innerHTML = ''; // 看講解影片才發現可這樣清
  // 以下程式碼為一開始自己的寫法：
  // let block = document.querySelectorAll('.games__block');
  // for (const ele of block) {
  //   games.removeChild(ele);
  // }
  const encodeURIGameName = encodeURIComponent(gameName);
  sendRequest(`streams/?game=${encodeURIGameName}&limit=20`, (data) => {
    getStreams(data.streams);
  });
}

sendRequest('games/top?limit=5', (data) => {
  // navbar 顯示前五熱門遊戲
  for (const ele of data.top) {
    const a = document.createElement('a');
    a.innerText = `${ele.game.name}`;
    document.querySelector('.nav__select').appendChild(a);
  }
  // 預設顯示第一個遊戲的名稱
  const defaultTopGame = data.top[0].game.name;
  changeGame(defaultTopGame);
});

// 點擊選單換內容
document.querySelector('.nav__select').addEventListener('click', (e) => {
  const tagName = e.target.innerText;
  changeGame(tagName);
});

// Show more 功能
let offset = 20;
document.querySelector('#showmore_btn button').addEventListener('click', (e) => {
  e.preventDefault();
  console.log(offset);
  // offset capped at 900
  if (offset >= 900) {
    e.target.parentNode.classList.add('hide'); // 超過後按鈕消失
  } else {
    const clickName = document.querySelector('.games__title').innerText;
    sendRequest(`streams/?game=${clickName}&limit=20&offset=${offset}`, (data) => {
      getStreams(data.streams);
    });
    offset += 20;
  }
});
