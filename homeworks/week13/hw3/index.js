const baseUrl = 'https://api.twitch.tv/kraken';
const topGameLimit = 5;
const streamsLimit = 20;
const HEADERS = {
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-id': 'hv6q8btkyedopx5cir6xk0884d1067'
  }
};
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

let offset = 0;
// 拿到前 5 筆熱門遊戲的資料
async function getTopGames() {
  const response = await fetch(`${baseUrl}/games/top?limit=${topGameLimit}`, HEADERS);
  const data = await response.json();
  // 我測試了一下，在這邊先做一個錯誤判斷會幫助 debug，像是 Client-id 或是 url 有錯的話
  // `Error message` 會寫得比較清楚
  if (data.error) {
    console.log(`Error: ${data.error} & ${data.message}`);
    return;
  }
  return data;
}
// 拿到前 20 筆熱門實況的資料
async function getStreams(game, offset) {
  const response = await fetch(`${baseUrl}/streams?game=${encodeURIComponent(game)}&limit=${streamsLimit}&offset=${offset}`, HEADERS);
  const data = await response.json();

  if (data.error) {
    console.log(`Error: ${data.error} & ${data.message}`);
    return;
  }
  if (!data.streams.length) {
    console.log('Error: ', '找不到資料');
    return;
  }
  return data;
}
// 添加空的實況美觀排版
function addEmptyStreams() {
  const emptyStreams = document.createElement('div');
  emptyStreams.classList.add('empty__block');
  document.querySelector('.games').appendChild(emptyStreams);
}
// 刪掉空的 strems
function deleteAllEmptyStreams() {
  const allEmptyStreams = document.querySelectorAll('.empty__block');
  for (const emptyStream of allEmptyStreams) {
    document.querySelector('.games').removeChild(emptyStream);
  }
}
// navbar render 前五款熱門遊戲
function renderTopGames(data) {
  for (const topGame of data.top) {
    const topGameName = topGame.game.name;
    const gameNav = document.createElement('a');

    gameNav.innerText = topGameName;
    document.querySelector('.nav__select').appendChild(gameNav);
  }
}
// render streams
function renderStreams(gameData) {
  const { streams } = gameData;
  for (const stream of streams) {
    const gamesBlock = document.createElement('div');
    const html = STREAM_TEMPLATE
      .replace('$name', stream.channel.name)
      .replace('$preview', stream.preview.large)
      .replace('$logo', stream.channel.logo)
      .replace('$status', stream.channel.status)
      .replace('displayName', stream.channel.display_name);

    gamesBlock.classList.add('games__block');
    gamesBlock.innerHTML = html;
    document.querySelector('.games').appendChild(gamesBlock);
  }
  deleteAllEmptyStreams();
  addEmptyStreams();
  addEmptyStreams();
}
// 切換遊戲
async function changeGames(game) {
  document.querySelector('.games__title').innerText = game;
  document.querySelector('.games').innerHTML = '';

  const data = await getStreams(game, offset);
  renderStreams(data);
}
// 初始畫面
async function init() {
  try {
    const data = await getTopGames();
    renderTopGames(data);
    const defaultGame = data.top[0].game.name;
    changeGames(defaultGame);
  } catch (err) {
    console.log('init error: ', err);
  }
}
async function showMoreStreams(game, offset) {
  try {
    const data = await getStreams(game, offset);
    renderStreams(data);
  } catch (err) {
    console.log('showMoreStreams error: ', err);
  }
}
// render 初始畫面
init();
// eventListener
// 點選切換遊戲
document.querySelector('.nav__select').addEventListener('click', (e) => {
  const game = e.target.innerText;
  changeGames(game);
});

document.querySelector('#showmore_btn').addEventListener('click', (e) => {
  const showMoreBtn = e.target;
  if (offset >= 900) {
    showMoreBtn.classList.add('hide');
    return;
  }
  showMoreBtn.setAttribute('disabled', '');
  setTimeout(() => showMoreBtn.removeAttribute('disabled'), 1000);
  offset += 20;
  const game = document.querySelector('.games__title').innerText;
  showMoreStreams(game, offset);
  // const data = getStreams(game, offset);
  // console.log(game, data);
  // renderStreams(data);
});
