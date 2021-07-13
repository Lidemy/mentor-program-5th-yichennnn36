import $ from 'jquery';
import { getComments, addComments } from './api';
import { appendCommentToDOM, appendStyle, prefixClassName } from './utils';
import { cssTemplate, getFormTemplate } from './templates';

export default function init(options) {
  const { siteKey, apiUrl, containerSelector } = options;
  const { formClassName, commentClassName, loadMoreClassName } = prefixClassName(siteKey);

  const formSelector = `.${formClassName}`;
  const commentSelector = `.${commentClassName}`;
  const loadMoreSelector = `.${loadMoreClassName}`;

  let cursor = null;
  let isLastPage = false;

  // 加入 HTML 樣式
  $(containerSelector).append(getFormTemplate(formClassName, commentClassName, loadMoreClassName));
  // 加入 CSS 樣式
  appendStyle(cssTemplate);

  // 初始畫面
  const commentsDOM = $(commentSelector);
  renderComments();

  // 送出留言
  $(formSelector).submit((e) => {
    // 不讓表單送出
    e.preventDefault();
    // 變數宣告&把重複出現的變數存起來
    const submitBtn = $(`${formSelector} .input-submit`);
    const nicknameDOM = $(`${formSelector} input[name=nickname]`);
    const contentDOM = $(`${formSelector} textarea[name=content]`);
    const newCommentDOM = {
      site_key: siteKey,
      nickname: nicknameDOM.val(),
      content: contentDOM.val()
    };

    // 讓按鈕在送出後禁用一秒，避免使用者連點
    submitBtn.attr('disabled', true);
    setTimeout(() => submitBtn.removeAttr('disabled'), 1000);

    addComments(apiUrl, newCommentDOM, () => {
      // 因為要抓寫入的時間，所以再發 request 拿最新的資料並 append 出來
      getComments(apiUrl, siteKey, null, (data) => {
        const comments = data.discussions;
        appendCommentToDOM(commentsDOM, comments[0], true);
      });
      nicknameDOM.val('');
      contentDOM.val('');
    });
  });

  // 按鈕點擊，載入更多
  $(loadMoreSelector).click(() => {
    renderComments();
  });

  function renderComments() {
    getComments(apiUrl, siteKey, cursor, (data) => {
      const comments = data.discussions;
      isLastPage = data.is_last_page;
      // 最後一頁的話，就把所有資料 append 出來
      if (isLastPage) {
        for (const comment of comments) {
          appendCommentToDOM(commentsDOM, comment);
        }
        return $(loadMoreSelector).hide();
      }
      // isLastPage = false，從六筆資料中抓前五筆
      for (let i = 0; i < 5; i++) {
        appendCommentToDOM(commentsDOM, comments[i]);
      }
      $(loadMoreSelector).show();
      cursor = comments[comments.length - 2].id;
    });
  }
}
