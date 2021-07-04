const baseUrl = '.';
const siteKey = 'yichen';
const limit = 5;
let cursor = null;
const commentsDOM = $('.board-content');
const HTML_TEMPLATES = `
    <div class="card mb-3">
      <div class="card-header d-flex justify-content-between align-items-center">
        <span class="card-header-name">@ $nickname</span>
        <span class="card-header-time">・$created_at</span>
      </div>
      <div class="card-body">
        <p class="card-text">$content</p>
      </div>
    </div>
  `;

function escape(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function appendCommentToDOM(container, comment, isPrepend) {
  const html = HTML_TEMPLATES
    .replace('$nickname', escape(comment.nickname))
    .replace('$created_at', escape(comment.created_at))
    .replace('$content', escape(comment.content));
  isPrepend ? container.prepend(html) : container.append(html);
}

function sendRequest(siteKey, cursor, callback) {
  let url = `${baseUrl}/api_comments.php?site_key=${siteKey}`;
  if (cursor) {
    url += `&cursor=${cursor}`;
  }
  $.ajax({
    type: 'GET',
    url,
    success: (data) => {
      if (!data.ok) {
        alert('資料抓取失敗，請再試一次');
        console.log('Error: ', data.discussions);
        return;
      }
      const comments = data.discussions;
      callback(comments);
    },
    error: (error) => {
      alert('資料抓取失敗，請再試一次');
      console.log('Error: ', error);
    }
  });
}
// 增加留言 POST 到後端
function addComment(siteKey, callback) {
  const inputComment = {
    site_key: siteKey,
    nickname: $('input[name=nickname]').val(),
    content: $('textarea[name=content]').val()
  };
  $.ajax({
    type: 'POST',
    url: `${baseUrl}/api_add_comments.php`,
    data: inputComment,
    success: (data) => {
      if (!data.ok) {
        alert('請輸入留言');
        console.log('Error: ', data.message);
      }
      callback(data);
    }
  });
}
// 抓所有留言並 append
function getComments(comments) {
  // 代表後面還有未抓出的留言
  if (comments.length >= limit + 1) {
    for (let i = 0; i < limit; i++) {
      appendCommentToDOM(commentsDOM, comments[i]);
    }
    // 抓倒數第二則 comments 的 id
    cursor = comments[comments.length - 2].id;
    return cursor;
  } else {
    for (const comment of comments) {
      appendCommentToDOM(commentsDOM, comment);
    }
    $('#loading-btn').hide();
  }
}
// 畫面載入留言
sendRequest(siteKey, cursor, (comments) => {
  getComments(comments);
});
// 輸入事件監聽
$('.add-comments-form').submit((e) => {
  e.preventDefault();
  const button = $(e.target).find('button[type=submit]');
  // 讓按鈕在送出後禁用一秒，避免使用者連點
  button.attr('disabled', true);
  setTimeout(() => {
    button.removeAttr('disabled');
  }, 1000);

  addComment(siteKey, (data) => {
    // 清空輸入框
    $('input[name=nickname]').val('');
    $('textarea[name=content]').val('');
    // 抓取即刻輸入的留言並顯示
    if (!data.ok) {
      return;
    }
    sendRequest(siteKey, null, (comments) => {
      appendCommentToDOM(commentsDOM, comments[0], true);
    });
  });
});
// Read more 按鈕點擊事件
$('#loading-btn').click(() => {
  sendRequest(siteKey, cursor, (comments) => {
    getComments(comments);
  });
});
