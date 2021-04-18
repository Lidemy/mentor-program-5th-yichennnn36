## 交作業流程

1. 檔案存至電腦 ：`git clone https://github.com/Lidemy/mentor-program-5th-yichennnn36`
2. 建立新的 branch，並切換至此：`git checkout -b week1HW`
3. 作業完成後，有新加入的檔案要加進 git：`git add .`
4. 再更新改動的版本：`git commit -am "finish_week1HW"`
5. 把此 branch 推至 GitHub 上：`git push origin week1HW`
6. 執行 **Compare & pull request**
7. 把 PR 連結貼至學習系統，繳交作業。

作業批改完成並 merge 後：

1. 切換版本：`git checkout master`
2. 將 merge 完的版本拉下來：`git pull origin master`
3. 刪除已被合併的 branch：`git branch -d week1HW`
