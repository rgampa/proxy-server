# Node Proxy Server
My first Node assignment

# Description
* This proxy server can be used to hit any downstream server and get the respective response back.

# Setup
```
git clone git@github.com:rgampa/proxy-server.git
cd proxy-server
npm install
```

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

2) Proxing to www.google.com by passing CLI argument `url`

`nodemon --exec babel-node -- index.js --url='http://www.google.com'`

Output:
```
curl -v http://127.0.0.1:8001 
* About to connect() to 127.0.0.1 port 8001 (#0)
*   Trying 127.0.0.1...
* Adding handle: conn: 0x7feccc004000
* Adding handle: send: 0
* Adding handle: recv: 0
* Curl_addHandleToPipeline: length: 1
* - Conn 0 (0x7feccc004000) send_pipe: 1, recv_pipe: 0
* Connected to 127.0.0.1 (127.0.0.1) port 8001 (#0)
> GET / HTTP/1.1
> User-Agent: curl/7.30.0
> Host: 127.0.0.1:8001
> Accept: */*
> 
< HTTP/1.1 200 OK
< date: Thu, 23 Apr 2015 03:04:16 GMT
< expires: -1
< cache-control: private, max-age=0
< content-type: text/html; charset=ISO-8859-1
< set-cookie: NID=67=nlv_QHsHR2Xg9728T2OpnFHjRjN8FHydOWSz8wy-8uV_3ZdLtJmI0jiPm0MiUxmNtJrhk65e8vmczwO32xINMU4XU5DbvPeqpuKiak3ZB3hn2FGtkPMVXRMECuoQqxkT; expires=Fri, 23-Oct-2015 03:04:16 GMT; path=/; domain=.; HttpOnly
< p3p: CP="This is not a P3P policy! See http://www.google.com/support/accounts/bin/answer.py?hl=en&answer=151657 for more info."
* Server gws is not blacklisted
< server: gws
< x-xss-protection: 1; mode=block
< x-frame-options: SAMEORIGIN
< alternate-protocol: 80:quic,p=1
< accept-ranges: none
< vary: Accept-Encoding
< transfer-encoding: chunked
< Connection: keep-alive
```

3) Passing logfile argument via CLI argument
`nodemon --exec babel-node -- index.js --logfile='/tmp/proxy.log'`

Logfile Output:
```
tail -f /tmp/proxy.log 
 Proxing to URL: http://127.0.0.1:8000

Proxy request headers: 
{"user-agent":"curl/7.30.0","host":"127.0.0.1:8001","accept":"*/*","x-asdf":"yodawg","content-length":"10","content-type":"application/x-www-form-urlencoded"}

Destination Response headers: 
{"user-agent":"curl/7.30.0","host":"127.0.0.1:8001","accept":"*/*","x-asdf":"yodawg","content-length":"10","content-type":"application/x-www-form-urlencoded"}

Echo request headers: 
{"user-agent":"curl/7.30.0","host":"127.0.0.1:8001","accept":"*/*","x-asdf":"yodawg","content-length":"10","content-type":"application/x-www-form-urlencoded","connection":"keep-alive"}

```
