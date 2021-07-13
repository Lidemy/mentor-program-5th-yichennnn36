export function escape(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
export function appendStyle(cssTemplate) {
  const styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.appendChild(document.createTextNode(cssTemplate));
  document.head.appendChild(styleElement);
}
export function appendCommentToDOM(container, comment, isPrepend) {
  const html = `
    <div class="card mb-3">
      <div class="card-header d-flex justify-content-between align-items-center">
        <span class="card-header-name">@ ${escape(comment.nickname)}</span>
        <span class="card-header-time">・${escape(comment.created_at)}</span>
      </div>
      <div class="card-body">
        <p class="card-text">${escape(comment.content)}</p>
      </div>
    </div>
  `;
  isPrepend ? container.prepend(html) : container.append(html);
}
export function prefixClassName(siteKey) {
  return {
    formClassName: `${siteKey}-add-comments-form`,
    commentClassName: `${siteKey}-comments`,
    loadMoreClassName: `${siteKey}-load-btn`
  };
}
