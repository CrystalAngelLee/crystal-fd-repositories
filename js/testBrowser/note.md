# 各大浏览器输出的 navigator.userAgent 的值

1. IE 8：Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 10.0; WOW64; Trident/8.0; .NET4.0C; .NET4.0E; InfoPath.3; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729)

2. IE 11：Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; InfoPath.3; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; rv:11.0) like Gecko

3. win EDGE：Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240

4. FireFox：Mozilla/5.0 (Windows NT 10.0; WOW64; rv:49.0) Gecko/20100101 Firefox/49.0

5. Chrome：Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36

6. Opera：Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.87 Safari/537.36 OPR/41.0.2353.56

7. Safari：mozilla/5.0 (windows; u; windows nt 5.1; zh-cn) applewebkit/533.16 (khtml, like gecko) version/5.0 safari/533.16

8. 360 安全浏览器：Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36

9. QQ 浏览器：Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.104 Safari/537.36 Core/1.53.1708.400 QQBrowser/9.5.9635.400

---

- IE 10 之前的版本，匹配关键字 MSIE 8.0；
- IE 11 要通过 rv:11.0) like Gecko 来匹配；
- EDGE 通过 Edge/12.10240；
- Firefox 通过 Firefox/49.0；
- Chrome 通过 Chrome/54.0.2840.71，但是会发现，后面的浏览器都是基于 Chrome 内核（safari 除外），但是 Chrome 又是基于 safari 内核的
- Opera 通过 OPR/41.0.2353.56，但是网上普遍是通过 opera 字段
- Safari 通过 safari/533.16 来匹配；
- 360 和 QQ 都是基于 Chrome 内核的，当然 QQ 还能通过 QQBrowser/9.5.9635.400
