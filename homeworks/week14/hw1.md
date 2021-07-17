![](https://ibb.co/xq83Txd)

為了避免 Single point of failure，Server、cache、Database 都會建立不只一個。
- load balancer：自動將傳入的流量(request)分散到多個 Server
- cache：緩存機制，e.g. Memcached、Redis
- hash：原始網址轉換短網址的方法

### 資料來源
[短网址(short URL)系统的原理及其实现](https://hufangyun.com/2017/short-url/)
[系統設計 - 設計縮網址服務](https://www.jyt0532.com/2019/12/05/design-tiny-url/)