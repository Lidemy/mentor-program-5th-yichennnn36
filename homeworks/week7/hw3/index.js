window.onload = function() {
  document.querySelector('.todo__input-text').focus();
};

const inputText = document.querySelector('.todo__input-text');
const addButton = document.querySelector('.btn__add');
const todoList = document.querySelector('.todo__list');

// 跳脫格式
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function createItem(value) {
  if (!value) return;

  const li = document.createElement('li');
  const escValue = escapeHtml(inputText.value);
  li.classList.add('todo__list-item');
  li.innerHTML = `
    <input class="list__checkbox" type="checkbox">
    <p class="list__text" type="text">${escValue}</p>
    <input class="list__edit-text hide" type="text" value="${escValue}">
    <div class="list__btn">
      <button class="btn__edit">Edit</button>
      <button class="btn__finish hide">OK</button>
      <button class="btn__del"></button>
    </div>`;
  // 完全沒想到 value 可能被套用 html 格式，需要跳脫格式
  document.querySelector('.todo__list').appendChild(li);
  document.querySelector('.todo__input-text').value = '';// value 要這樣寫才取的到值
}
// 點擊加號，新增內容
addButton.addEventListener('click', () => {
  createItem(inputText.value);
});
// enter，新增內容
inputText.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) createItem(inputText.value);
});

// 游標挪至最後
function moveEnd(obj) {
  obj.focus();
  const len = obj.value.length;
  if (document.selection) {
    const sel = obj.createTextRange();
    sel.moveStart('character', len); // 設定開頭的位置
    sel.collapse();
    sel.select();
  } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
    obj.selectionStart = obj.selectionEnd = len;
  }
}

// event delegation
// 事件代理人，處理 刪除/編輯/點擊完成
todoList.addEventListener('click', (e) => {
  const listItem = e.target.closest('.todo__list-item');
  const listText = listItem.querySelector('.list__text');
  const listTextEdit = listItem.querySelector('.list__edit-text');
  const btnEdit = listItem.querySelector('.btn__edit');
  const btnFinish = listItem.querySelector('.btn__finish');
  const checkBox = listItem.querySelector('.list__checkbox');

  // 刪除
  if (e.target.classList.contains('btn__del')) {
    e.target.closest('.todo__list-item').remove();
    return;
  }
  // 編輯（這裡真的是搞死我，一開始完全搞不清楚怎麼寫，研究好久）
  if (e.target.classList.contains('btn__edit') || e.target.classList.contains('btn__finish')) {
    for (const ele of [listText, listTextEdit, btnEdit, btnFinish]) {
      ele.classList.toggle('hide');
      moveEnd(listTextEdit);
    }
    if (e.target.classList.contains('btn__finish')) {
      listText.innerText = listTextEdit.value;
    }
    return;
  }
  // 勾選完成
  if (e.target.classList.contains('list__checkbox')) {
    if (e.target.checked) {
      e.target.parentNode.classList.toggle('done');
      listText.classList.toggle('active');
      checkBox.classList.toggle('active');
    } else {
      e.target.parentNode.classList.toggle('done');
      listText.classList.toggle('active');
      checkBox.classList.toggle('active');
    }
  }
});
