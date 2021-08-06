/* eslint-disable */
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var commentPlugin;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getComments\": () => (/* binding */ getComments),\n/* harmony export */   \"addComments\": () => (/* binding */ addComments)\n/* harmony export */ });\n// 跟後端拿留言內容\nasync function getComments(apiUrl, siteKey, cursor) {\n  let url = `${apiUrl}/api_comments.php?site_key=${siteKey}`;\n  if (cursor) {\n    url += `&cursor=${cursor}`;\n  }\n  try {\n    const response = await fetch(url);\n    const data = await response.json();\n    return data;\n  } catch(err) {\n    console.log(err);\n  }\n}\n// post 留言到後端\nasync function addComments(apiUrl, newCommentData) {\n  try {\n    const response = await fetch(`${apiUrl}/api_add_comments.php`, {\n      method: 'POST',\n      body: new URLSearchParams(newCommentData)\n    });\n    const data = await response.json();\n    return data;\n  } catch(err) {\n    console.log(err);\n  }\n}\n\n//# sourceURL=webpack://commentPlugin/./src/api.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"init\": () => (/* binding */ init)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/api.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./templates */ \"./src/templates.js\");\n\n\n\n\nfunction init(options) {\n  const { siteKey, apiUrl, containerSelector } = options;\n\n  const commentsClassName = `${siteKey}-comments`;\n  const formClassName = `${siteKey}-add-comments-form`;\n  \n  const commentsSelector = `.${commentsClassName}`;\n  const formSelector = `.${formClassName}`;\n  // 生成 css \n  (0,_utils__WEBPACK_IMPORTED_MODULE_1__.appendStyle)(_templates__WEBPACK_IMPORTED_MODULE_2__.cssTemplate);\n  // 生成 html\n  document.querySelector(containerSelector).innerHTML = (0,_templates__WEBPACK_IMPORTED_MODULE_2__.getForm)(formClassName, commentsClassName);\n\n  const commentsDOM = document.querySelector(commentsSelector);\n  const loadBtn = commentsDOM.parentNode.querySelector('.load-btn');\n  const submitBtn = document.querySelector(`${formSelector} .input-submit`);\n  const nicknameInput = document.querySelector(`${formSelector} input[name=nickname]`);\n  const contentInput = document.querySelector(`${formSelector} textarea[name=content]`);\n  \n  let cursor = null;\n  let isLastPage = false;\n  // 初始畫面\n  renderComments();\n  // 表單送出\n  document.querySelector(formSelector).addEventListener('submit', (e) => {\n    // 不讓表單送出\n    e.preventDefault();\n    const newCommentData = {\n      site_key: siteKey,\n      nickname: nicknameInput.value,\n      content: contentInput.value\n    };\n    // 讓按鈕在送出後禁用一秒，避免使用者連點\n    submitBtn.setAttribute('disabled', true);\n    setTimeout(() => submitBtn.removeAttribute('disabled'), 1000);\n    // 新增留言\n    (0,_api__WEBPACK_IMPORTED_MODULE_0__.addComments)(apiUrl, newCommentData).then(data => {\n      if (data.ok) renderNewComment();\n    });\n  });\n  // 按鈕點擊，載入更多\n  loadBtn.addEventListener('click', () => {\n    renderComments();\n  });\n  // render 留言\n  async function renderComments() {\n    const data = await (0,_api__WEBPACK_IMPORTED_MODULE_0__.getComments)(apiUrl, siteKey, cursor);\n    const comments = data.discussions;\n\n    isLastPage = data.is_last_page;\n    // 最後一頁的話，就把所有資料 append 出來\n    if (isLastPage) {\n      for (const comment of comments) {\n        (0,_utils__WEBPACK_IMPORTED_MODULE_1__.appendCommentToDOM)(commentsDOM, comment);\n      }\n      return loadBtn.classList.add('hide');\n    }\n    // isLastPage = false，從六筆資料中抓前五筆\n    for (let i = 0; i < 5; i++) {\n      (0,_utils__WEBPACK_IMPORTED_MODULE_1__.appendCommentToDOM)(commentsDOM, comments[i]);\n    }\n    loadBtn.classList.remove('hide');\n    cursor = comments[comments.length - 2].id;\n  }\n  // 抓到最新的一筆資料並 render 出來\n  async function renderNewComment() {\n    const data = await (0,_api__WEBPACK_IMPORTED_MODULE_0__.getComments)(apiUrl, siteKey, null);\n    const comments = data.discussions;\n    \n    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.appendCommentToDOM)(commentsDOM, comments[0], true);\n    nicknameInput.value = '';\n    contentInput.value = '';\n  }\n}\n\n//# sourceURL=webpack://commentPlugin/./src/index.js?");

/***/ }),

/***/ "./src/templates.js":
/*!**************************!*\
  !*** ./src/templates.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getForm\": () => (/* binding */ getForm),\n/* harmony export */   \"cssTemplate\": () => (/* binding */ cssTemplate)\n/* harmony export */ });\nfunction getForm(className, commentsClassName) {\n  return `\n    <div>\n      <div class=\"row\">\n        <div class=\"col-12 col-md-5\">\n          <form class=\"${className}\">\n            <div class=\"input-group flex-nowrap\">\n              <span class=\"input-group-text\" id=\"addon-wrapping\">@</span>\n              <input type=\"text\" name=\"nickname\" class=\"form-control\" placeholder=\"請輸入暱稱\" aria-label=\"nickname\" aria-describedby=\"addon-wrapping\">\n            </div>\n            <div class=\"input-group mt-3\">\n              <textarea type=\"text\" name=\"content\" class=\"form-control\" rows=\"8\" placeholder=\"請輸入留言：）\" aria-label=\"input content\" aria-describedby=\"button-addon2\"></textarea>\n            </div>\n            <div class=\"submit-btn text-end\"><button class=\"input-submit btn mt-3 mb-5\" type=\"submit\">送出</button></div>\n          </form>\n        </div>\n        <div class=\"col col-md-7\">\n          <div class=\"${commentsClassName}\">\n          <!-- js 動態產生內容 -->\n          </div>\n          <div class=\"submit-btn text-center mt-4\">\n            <button type=\"button\" class=\"load-btn hide btn btn-sm\">Read more...</button>\n          </div>\n        </div>\n      </div>\n    </div>\n  `;\n}\nconst cssTemplate = `\n  * {\n    font-family: 'Varela Round', sans-serif;\n  }\n  .board-title {\n    font-size: 50px;\n    color: #846d44;\n  }\n  .btn {\n    background-color: #846d44;\n    color: white;\n  }\n  .card-header-time {\n    font-size: 12px;\n    color: #846d44;\n    min-width: 137px;\n    margin-left: 5px;\n  }\n  .card-text {\n    white-space: pre-line;\n  }\n  .hide {\n    display: none;\n  }\n`;\n\n//# sourceURL=webpack://commentPlugin/./src/templates.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"escape\": () => (/* binding */ escape),\n/* harmony export */   \"appendStyle\": () => (/* binding */ appendStyle),\n/* harmony export */   \"appendCommentToDOM\": () => (/* binding */ appendCommentToDOM)\n/* harmony export */ });\nfunction escape(unsafe) {\n  return unsafe\n    .replace(/&/g, '&amp;')\n    .replace(/</g, '&lt;')\n    .replace(/>/g, '&gt;')\n    .replace(/\"/g, '&quot;')\n    .replace(/'/g, '&#039;');\n}\nfunction appendStyle(cssTemplate) {\n  const style = document.createElement('style');\n  style.type = 'text/css';\n  style.innerHTML = cssTemplate;\n  document.querySelector('head').appendChild(style);\n}\nfunction appendCommentToDOM(container, comment, isPrepend) {\n  const div = document.createElement('div');\n  div.innerHTML = `\n    <div class=\"card mb-3\">\n      <div class=\"card-header d-flex justify-content-between align-items-center\">\n        <span class=\"card-header-name\">@ ${escape(comment.nickname)}</span>\n        <span class=\"card-header-time\">・${escape(comment.created_at)}</span>\n      </div>\n      <div class=\"card-body\">\n        <p class=\"card-text\">${escape(comment.content)}</p>\n      </div>\n    </div>`;\n  isPrepend? container.prepend(div) : container.appendChild(div);\n}\n\n//# sourceURL=webpack://commentPlugin/./src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	commentPlugin = __webpack_exports__;
/******/ 	
/******/ })()
;