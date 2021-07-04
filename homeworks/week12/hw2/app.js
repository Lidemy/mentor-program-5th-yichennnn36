let userID = 1;
let unCompletedCount = 0;
const HTML_TEMPLATES = `
  <div class="todo-block list-group-item">
    <div class="todo-name">
      <input class="form-check-input check-todo" name="unchecked" style="margin-right:16px;" type="checkbox" id="todo-{id}"><label class="todo-content" for="todo-{id}">{content}</label>
      <input type="text" class="form-control edit-input hide" aria-label="Username" aria-describedby="basic-addon1">
    </div>
    <div class="todo-btn">
      <button type="button" class="btn btn-link btn-edit fs-4"> EDIT </button>
      <button type="button" class="btn btn-link btn-done fs-4 hide"> OK </button>
      <button type="button" class="btn btn-link btn-delete fs-4"> X </button>
    </div>
  </div>`;

function escape(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
// 新增 todo
function addTodo() {
  const value = $('.form-control').val();
  if (!value) {
    alert('請輸入內容！');
    return;
  }
  const html = HTML_TEMPLATES
    .replace('{content}', escape(value))
    .replaceAll('{id}', userID);
  $('.todos').append(html);
  userID++;
  unCompletedCount++;
  $('.form-control').val('');
  $('.function-bar').show();
  $('#btn-save').show();
  getNumOfLeft();
}

function getNumOfLeft() {
  $('.function-bar span').text(`${unCompletedCount} items left`);
}
// 改按鈕 border
function toggleClassActive(filter) {
  switch (filter) {
    case 'all':
      $('#btn-filter-all').addClass('active');
      $('#btn-filter-completed').removeClass('active');
      $('#btn-filter-active').removeClass('active');
      break;
    case 'active':
      $('#btn-filter-active').addClass('active');
      $('#btn-filter-all').removeClass('active');
      $('#btn-filter-completed').removeClass('active');
      break;
    case 'completed':
      $('#btn-filter-completed').addClass('active');
      $('#btn-filter-all').removeClass('active');
      $('#btn-filter-active').removeClass('active');
      break;
  }
}
// show All、Active、Completed 三種 type 的 todos
function showFilterTodos(filter) {
  const checkedComment = $('.todos input[name=checked]');
  const unCheckedComment = $('.todos input[name=unchecked]');

  switch (filter) {
    case 'all':
      $('.todos .todo-block').show();
      $('.calc-todos').removeClass('opacity');
      break;
    case 'active':
      checkedComment.closest('.todo-block').hide();
      unCheckedComment.closest('.todo-block').show();
      $('.calc-todos').removeClass('opacity');
      break;
    case 'completed':
      checkedComment.closest('.todo-block').show();
      unCheckedComment.closest('.todo-block').hide();
      $('.calc-todos').addClass('opacity');
      break;
  }
}
// 把從後端拿回來的資料 restore 到頁面
function restoreTodos(todos) {
  for (const todo of todos) {
    const html = HTML_TEMPLATES
      .replace('{content}', escape(todo.content))
      .replaceAll('{id}', todo.id)
      .replace('unchecked', todo.isChecked);
    $('.todos').append(html);
  }
  const checkedTodo = $('.todos input[name=checked]');
  unCompletedCount = todos.length - checkedTodo.length;
  if (checkedTodo.length) {
    checkedTodo.each((i, ele) => {
      $(ele).prop('checked', true);
    });
  }
  $('.function-bar').show();
  $('#btn-save').show();
  getNumOfLeft();
}
// 透過 URLSearchParams API，解析 URL，取得 Query String
// 拿到 id 後，把 todos 顯示在前端
const urlParams = new URLSearchParams(window.location.search);
const todoId = urlParams.get('id');
if (todoId) {
  $.getJSON(`http:./api_todo.php?id=${todoId}`, (data) => {
    const todos = JSON.parse(data.todos[0].todo);// 把 JSON 格式的內容轉成物件
    restoreTodos(todos);
  });
}
// 畫面載入設定
$('.function-bar').hide();
$('#btn-save').hide();
// 新增 todo 事件 by add button
$('#btn-add').click(() => {
  addTodo();
  getNumOfLeft();
});
// 新增 todo 事件 by enter
$('.input-group').keypress((e) => {
  if (e.which === 13) {
    addTodo();
    getNumOfLeft();
  }
});
// event delegation
// 刪除 todo 事件
$('.todos').on('click', '.btn-delete', (e) => {
  const btnDelete = $(e.target);
  btnDelete.closest('.todo-block').remove();
  unCompletedCount--;
  getNumOfLeft();
});
// event delegation
// 編輯 todo 事件
$('.todos').on('click', '.btn-edit', (e) => {
  const parent = $(e.target).closest('.todo-block');
  const editInput = parent.find('.edit-input');
  const todoContent = parent.find('.todo-content');
  const todoText = todoContent.text();

  editInput.val(todoText);
  editInput.show().focus();
  todoContent.addClass('opacity'); // 先把原始的 todo 內容隱藏避免內容過長露出來
  parent.find('.btn-done').show();
  parent.find('.btn-edit').hide();
});
// event delegation
// todo 編輯完成
$('.todos').on('click', '.btn-done', (e) => {
  const parent = $(e.target).closest('.todo-block');
  const editInput = parent.find('.edit-input');
  const todoContent = parent.find('.todo-content');
  const editTodo = parent.find('.edit-input').val();

  todoContent.text(editTodo);
  editInput.hide();
  todoContent.removeClass('opacity');
  parent.find('.btn-done').hide();
  parent.find('.btn-edit').show();
});
// event delegation
// todo 被 checked 的數目
$('.todos').on('click', '.check-todo', (e) => {
  if ($(e.target).prop('checked')) {
    unCompletedCount--;
    $(e.target).attr('name', 'checked');
  } else {
    unCompletedCount++;
    $(e.target).attr('name', 'unchecked');
  }
  getNumOfLeft();
});
// event delegation
// 點擊 filter -> All button/Active button/Completed button
$('.todo-filter-btn').on('click', (e) => {
  const filter = $(e.target).data('filter');
  toggleClassActive(filter);
  showFilterTodos(filter);
});
// 點擊 clear completed button
$('#btn-clear-completed').click(() => {
  const checkedTodo = $('.todos input[name=checked]');
  checkedTodo.closest('.todo-block').remove();
});
// 點擊 save button
// 把 todos 狀態存起來
$('#btn-save').click(() => {
  const todos = [];
  $('.todo-block').each((i, element) => {
    const input = $(element).find('.check-todo');
    const label = $(element).find('.todo-content');
    todos.push({
      id: input.attr('id').replace('todo-', ''),
      content: label.text(),
      isChecked: input.attr('name')
    });
  });
  const data = JSON.stringify(todos); // 把 todos 轉成 JSON 格式
  $.ajax({
    type: 'POST',
    url: './api_add_todo.php',
    data: {
      todo: data
    },
    success: (res) => {
      const responseId = res.id;
      window.location = `index.html?id=${responseId}`;
    },
    error: () => {
      alert('Error');
    }
  });
});
