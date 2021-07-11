const siteKey = 'yichen';
const commentsDOM = $('.comments');
let cursor = null;
let isLastPage = false;

function escape(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
// ajax
// 跟後端拿留言內容
function getComments(siteKey, cursor, callback) {
  let url = `api_comments.php?site_key=${siteKey}`;
  if (cursor) {
    url += `&cursor=${cursor}`;
  }
  $.ajax({
    type: 'GET',
    url,
    success: (response) => {
      if (!response.ok) {
        alert(response.error_message);
        return;
      }
      callback(response);
    }
  });
}
// ajax
// post 留言
function addComments(callback) {
  const newCommentDOM = {
    site_key: siteKey,
    nickname: $('input[name=nickname]').val(),
    content: $('textarea[name=content]').val()
  };
  $.ajax({
    type: 'POST',
    url: 'api_add_comments.php',
    data: newCommentDOM,
    success: (response) => {
      if (!response.ok) {
        alert(response.error_message);
        return;
      }
      callback(response);
    }
  });
}
function appendCommentToDOM(container, comment, isPrepend) {
  const html = `
    <div class="card mb-3">
      <div class="card-header d-flex justify-content-between align-items-center">
        <span class="card-header-name">#${comment.id} - @ ${escape(comment.nickname)}</span>
        <span class="card-header-time">・${escape(comment.created_at)}</span>
      </div>
      <div class="card-body">
        <p class="card-text">${escape(comment.content)}</p>
      </div>
    </div>
  `;
  isPrepend ? container.prepend(html) : container.append(html);
}
function renderComments() {
  getComments(siteKey, cursor, (data) => {
    const comments = data.discussions;
    isLastPage = data.is_last_page;
    // 最後一頁的話，就把所有資料 append 出來
    if (isLastPage) {
      for (const comment of comments) {
        appendCommentToDOM(commentsDOM, comment);
      }
      return $('#load-btn').hide();
    }
    // isLastPage = false，從六筆資料中抓前五筆
    for (let i = 0; i < 5; i++) {
      appendCommentToDOM(commentsDOM, comments[i]);
    }
    $('#load-btn').show();
    cursor = comments[comments.length - 2].id;
  });
}
// 初始畫面
renderComments();
// 表單送出
$('.add-comments-form').submit((e) => {
  // 不讓表單送出
  e.preventDefault();
  // 讓按鈕在送出後禁用一秒，避免使用者連點
  $('#input-submit').attr('disabled', true);
  setTimeout(() => {
    $('#input-submit').removeAttr('disabled');
  }, 1000);

  addComments(() => {
    // 因為要抓寫入的時間，所以再發 request 拿最新的資料並 append 出來
    getComments(siteKey, null, (data) => {
      const comments = data.discussions;
      appendCommentToDOM(commentsDOM, comments[0], true);
    });
    $('input[name=nickname]').val('');
    $('textarea[name=content]').val('');
  });
});
// 按鈕點擊，載入更多
$('#load-btn').click(() => {
  renderComments();
});
