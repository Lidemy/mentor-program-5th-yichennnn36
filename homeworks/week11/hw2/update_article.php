<?php 
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = $_SESSION['username'];
  // 管理權權限檢查
  if (!($username === 'admin123')) {
    header('Location: index.php');
    die();
  }
  $id = NULL;
  if (!empty($_GET['id'])) {
    $id = escape($_GET['id']);
  } else {
    header('Location: backstage.php');
    die();
  }
  $articles_data = get_data_from_articles('id', $id);
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="./style.css">
  <link rel="stylesheet" href="./reset.css">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet">
  <title>Blog 後台</title>
</head>

<body>
  <input type="checkbox" id="nav__control">
  <header class="site__header">
    <div class="site__icon"><a href="index.php">A</a></div>
    <label for="nav__control" class="nav__hamburger">
      <span></span>
    </label>
    <nav class="site__navbar">
      <li><a href="backstage.php">文章列表</a></li>
      <li><a href="#">文章分類</a></li>
      <li><a href="index.php">登出</a></li>
    </nav>
  </header>
  <main class="backstage__wrapper">
    <div class="backstage__title">新增文章</div>
    <form method="POST" action="handle_update_article.php" class="add__article-block">
      <?php
        if (!empty($_GET['errCode'])) {
          $code = escape($_GET['errCode']);
          echo '<h3 class="error__msg">' . set_msg($get_msg[0], $code) . '</h3>';
        }
      ?>
      <h3 class="add__article-title">發表文章：</h3>
      <input type="text" placeholder="請輸入文章標題" name="article__title" value="<?php echo escape($articles_data['title']); ?>">
      <select name="category">
        <option value="not-selected">請選擇文章分類</option>
        <option value="uncategorized">未分類</option>
        <option value="life">生活紀錄</option>
        <option value="note">筆記</option>
        <option value="share">分享</option>
        <option value="art">藝術</option>
        <!-- 用來存分類的值 -->
        <option value="hidden" data-value="<?php echo escape($articles_data['category']); ?>" hidden></option>
      </select>
      <div class="add__article-input">
        <textarea name="content" row="6"><?php echo escape($articles_data['content']); ?></textarea>
        <input type="hidden" name="id" value="<?php echo escape($articles_data['id']); ?>">
      </div>
      <div class="submit__btn">
        <button>送出</button>
      </div>
    </form>
  </main>
  <script>
    // 讓下拉選單存好原本的分類
    const category = document.querySelectorAll('select option');
    const selectedCategory = category[category.length-1].dataset.value;
    document.querySelector(`option[value=${selectedCategory}]`).setAttribute('selected', '');
    
    // 游標挪最後
    function setFocus(obj) {
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
    const input = document.querySelector('input[name=article__title]');
    setFocus(input);
  </script>
</body>
</html>