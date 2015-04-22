# Node Proxy Server
My first Node assignment

# Description
* This proxy server can be used to hit any downstream server and get the respective response back.

# Features
* The proxy server has capability to accept CLI arguments `host`(default: 127.0.0.1), `port` and `url`. If the `url` passed then `host` and `port` are not considered. The default scheme without `url` will be `http`
* If we don't pass any CLI argument the downstream system URL will be `http://127.0.0.1:8000` which is nothing but a echo server
* The proxy server also takes CLI argument `logfile` to write logger output to a file
* Alternatively instead of `url` CLI argument consumer can pass header `x-destination-url` to pass downstream system's URL.

#Examples
1) Hitting echo server
`curl -X POST http://127.0.0.1:8001 -d "hello self" -H "test: abc" -v`
output: 
```
* About to connect() to 127.0.0.1 port 8001 (#0)
*   Trying 127.0.0.1...
* Adding handle: conn: 0x7ff6da00a600
* Adding handle: send: 0
* Adding handle: recv: 0
* Curl_addHandleToPipeline: length: 1
* - Conn 0 (0x7ff6da00a600) send_pipe: 1, recv_pipe: 0
* Connected to 127.0.0.1 (127.0.0.1) port 8001 (#0)
> POST / HTTP/1.1
> User-Agent: curl/7.30.0
> Host: 127.0.0.1:8001
> Accept: */*
> test: abc
> Content-Length: 10
> Content-Type: application/x-www-form-urlencoded
> 
* upload completely sent off: 10 out of 10 bytes
< HTTP/1.1 200 OK
< user-agent: curl/7.30.0
< host: 127.0.0.1:8001
< accept: */*
< test: abc
< content-length: 10
< content-type: application/x-www-form-urlencoded
< connection: keep-alive
< date: Wed, 22 Apr 2015 20:39:33 GMT
< 
* Connection #0 to host 127.0.0.1 left intact
```
The console log output:
```
 Proxing to URL: http://127.0.0.1:8000

Proxy request headers: 
{"user-agent":"curl/7.30.0","host":"127.0.0.1:8001","accept":"*/*","test":"abc","content-length":"10","content-type":"application/x-www-form-urlencoded"}

Destination Response headers: 
{"user-agent":"curl/7.30.0","host":"127.0.0.1:8001","accept":"*/*","test":"abc","content-length":"10","content-type":"application/x-www-form-urlencoded"}

Echo request headers: 
{"user-agent":"curl/7.30.0","host":"127.0.0.1:8001","accept":"*/*","test":"abc","content-length":"10","content-type":"application/x-www-form-urlencoded","connection":"keep-alive"}
```

