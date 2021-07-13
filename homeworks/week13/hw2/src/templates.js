export const cssTemplate = `
  * {
    font-family: 'Varela Round', sans-serif;
  }
  .board-title {
    font-size: 50px;
    color: #846d44;
  }
  .btn {
    background-color: #846d44;
    color: white;
  }
  .card-header-time {
    font-size: 12px;
    color: #846d44;
    min-width: 137px;
    margin-left: 5px;
  }
  .card-text {
    white-space: pre-line;
  }
  .hide {
    display: none;
  }
`;

export function getFormTemplate(formClassName, commentClassName, loadClassName) {
  return `
    <h1 class="board-title mb-5 fw-bolder">Write your Message Here!</h1>
    <div class="row">
      <div class="col-12 col-md-5">
        <form class="${formClassName}">
          <div class="input-group flex-nowrap">
            <span class="input-group-text">@</span>
            <input type="text" name="nickname" class="form-control" placeholder="請輸入暱稱" aria-label="nickname" aria-describedby="addon-wrapping">
          </div>
          <div class="input-group mt-3">
            <textarea type="text" name="content" class="form-control" rows="8" placeholder="請輸入留言：）" aria-label="input content" aria-describedby="button-addon2"></textarea>
          </div>
          <div class="submit-btn text-end"><button class="input-submit btn mt-3 mb-5" type="submit">送出</button></div>
        </form>
      </div>
      <div class="col col-md-7">
        <div class="${commentClassName}">
        <!-- js 動態產生內容 -->
        </div>
        <div class="submit-btn text-center mt-4">
          <button type="button" class="${loadClassName} hide btn btn-sm">Read more...</button>
        </div>
      </div>
    </div>
  `;
}
