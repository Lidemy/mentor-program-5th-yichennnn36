## 前四週心得

經過四週的程式洗禮，我發現對於我這種初學者來說，真的花了蠻長一段時間熟悉不管是程式碼的使用、程式運作的方式、思考邏輯等等......，到第四週了，開始不免會有一點小挫折感是在於：怎麼自己都想不出來要這樣寫，理解能力是不是有點差之類的，但當然也是不會就此放棄！就像老師說的：「你必須非常努力，才能看起來毫不費力」，一邊努力一邊調整並找到適合自己的學習方式。

我覺得有複習週真的對於我來說是一件很好的事情，這幾天開始回頭去看看自己一個月來所學的部分，重新整理筆記、把當初沒有完成的挑戰題寫一寫，或是把作業再寫過一次，都會發現自己有一些部分忘記了，但在找資料、重新寫過後反而印象更深刻，對於當初比較不熟的也可以再花時間補上，像是位元運算、部分內建函式，或是這週串 API。部分題型當初有點疑惑的，現在也有更多的了解，像是第一週網路運作那題，一開始其實對於 DNS/DNS Cache 都超級不知道在幹嘛XD，看完解答也是一個似懂非懂，但經過第四週：熟悉網路概念與 API 後，我再回去寫一次那題，是可以直接把整個流程寫出來那種，覺得自己應該是有在進步的？！有些題目也發現可以再優化，或是調整當初亂排版的程式碼哈哈哈哈。

自己也在這週開始把當初解不開的題目、挑戰題拿回來做，有些其實還是不知道怎麼寫，但反過來想，有些當初解不開的現在卻寫得出來了，往好的一方去想，也比較增加我學習的動力，還是老話一句，Keep Fighting！


## 解題心得

* HTTP challenge
< 這次用 node.js 搭配 request library 使用 >

LV1: 按照敘述帶上 `name=yichen`。

LV2： 這時候還想說，會不會有什麼特殊寫法，想老半天還是一個一個試比較快 XD。

LV4：第四關找書，書名有：「世界」兩字，而且是村上春樹寫的，一開始想說直接輸入 `${base_URL}/books?q=世界` 感覺很不合理，但還是傳傳看，果然是失敗了，因為無法解讀，後來先換個方法去找作者名字長度是 4 個字的然後去找書名，果然成功被我找到哈哈，破關後有回憶起老師在補充影片說過的 `encodeURI()`，編碼的問題，回去試了一下成功破關！

LV6：這題一看就發現看不太懂，索性打開 hint 看一下 `Encode to Base64 format`，上網搜尋用法，成功破關！
```
// const username = 'admin';
// const password = 'admin123';
// const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
...
...
headers: {
  //   'Authorization': `Basic ${token}` //放入 req 的 header
  // }
```

LV9：在條件二卡關「伺服器會用 user agent 檢查是否是從 IE6 送出的 Request，不是的話會擋掉」，又去找了一下 user-agent 資料（這邊也補強自己一開始對這個不熟的概念，還有一直覺得那一串字串看起來很詭異），成功找到 IE6 需要輸入什麼，破關！

LV10：第十關居然是我超愛玩的猜數字，速速破關！

LV11：往 headers 放 origin，PASS！

LV12：這關也是卡了一下，偷看提示，發現原來是經過轉址！用開發人員工具看到 `deliver_token`、`stopover`、`deliver_token_result`，通過 res header 找到通關密碼！

LV13：這關卡最久！去查了 proxy 結果整個還是霧颯颯，還去 request library 找找看是不是自己有漏掉什麼，後來藉由學長姐分享的筆記找到怎麼通關，結果在設定代理伺服器的時候也試試了一下才拿到 token，也有試`X-Forwarded-For`，並看了老師分享的文章，居然也有這種偽照 IP 的方式！

LV14：後面這幾關發現自己都沒辦法很直覺想到要怎麼處理，還是藉由提示跟爬文找資料，原來也是利用像 LV9 一樣用 user-agent 去設定瀏覽器。

LV15：成功看到 The End，恭喜破關！


* LIOJ 1016 不合群的人
這題一開始在想怎麼解的時候，就蠻直覺的，所以寫一寫後丟到 OJ 上居然無法 AC，所以就開始 debug 看看是哪裡有問題，並且在多測試幾組資料後發現自己條件沒有寫好！

原本就想說 A 比較少，就回傳 A 的 index，B 比較少，就回傳 B 的 index 即可，兩個一樣就回傳平手，殊不知完全漏掉大家都選一樣的情況也是平手，趕快補上 
```
if (sumA === Number(lines[0]) || sumB === Number(lines[0])) console.log('PEACE');
```

* LIOJ 1017 貪婪的小偷
這次就很小心注意 edge case，如果可以拿的量是 0，總價值就是 0，可以拿的量大於總數量就全部拿，但全部拿也要小心總價值會不會爆炸，但題目有些範圍限制，這個數值太大的 edge case 就可以不用考慮進去，接下來就寫個程式：取價值最高的 c 像物品再相加，重新在寫過的時候又複習了一次 sort() 傳 a,b 參數的排序。


* LIOJ 1018 大平台
這題先寫了第一種寫解法：
```
function solve(lines) {
  let stages = lines[1].split(' ').map(Number);
  let res = 0;
  let currentStage = stages[0];
  let currentLength = 0;
  for (const stage of stages) {
    if (stage !== currentStage) {
      res = Math.max(res, currentLength);
      currentLength = 1;
      currentStage = stage;
    } else {
      currentLength += 1;
    }
  }
  res = Math.max(res, currentLength);
  console.log(res);
}
```
後來想說好像可以練習別種解法寫寫看，這題因為他給的數字範圍不大（1 <= A <= 1000），我是用老師之前講過的【Counting sort】，對於這題的理解，白話應該可以說是：拿到幾號球就投到幾號的籃子裡面，最後只需要看最多球的籃子裡面的數量就是這題的解答，寫完後丟進去跑也成功 AC，雖然不知道這種寫法效率好不好，但也是把之前學過的寫法在練習一次
```
function solve(lines) {
  let arr = [];
  for (let i = 1; i <= 1000; i++) {
    arr[i] = 0;
  }
  let stage = lines[1].split(' ').map(Number);
  for (let i = 0; i < stage.length; i++) {
    arr[stage[i]]++;
  }
  arr.sort((a, b) => b - a);
  console.log(arr[0]);
}
```
