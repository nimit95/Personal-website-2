---
title: A Simple HTTP/HTTPS Proxy in Node Js
date: '2018-10-20'
tags: ['next js', 'guide']
draft: false
summary: 'In this article we introduce adding images in the tailwind starter blog and the benefits and limitations of the next/image component.'
authors: ['default']
---

# Overview

A proxy is a simple server between you and your intended host on the internet. There are mainly two types of proxy, **Forward proxy** and **Reverse proxy.**

**Forward Proxy**

Mostly, the simple term “proxy” refers to a Forward Proxy. It simply sits between a client and a server and acts as a relaying agent. They are usually placed by the clients or the internal network from the client side. There can be various use cases for using a forward proxy like keeping track of requests, responses, deny access to some domains, modifying the headers, changing the location etc.

Forward Proxy

**Reverse Proxy**

These type of proxies are employed by the servers, mostly for security and load balancing purposes. Clients hit these reverse proxy servers instead of the actual servers, then these proxy serves the request to the actual server. For a web server, there are several benefits associated with such architecture. It can keep malicious users out, load balance between the servers and can reduce the load on its origin servers by caching static content.

Reverse Proxy

# Getting started

Enough of the theory and let us get our hands dirty and make an HTTP/HTTPS **forward proxy** in Node.

We will be using the net module in the Node. I assume a basic knowledge of NodeJS and net module. For references, check out the official documentation [https://nodejs.org/api/net.html](https://nodejs.org/api/net.html)

We create a simple `net` server first which listens on Port `8124` , this server will act as a proxy server for the clients to connect.

```
const net = require('net');
const server = net.createServer();server.on('connection', (clientToProxySocket) => {
  console.log('Client Connected To Proxy');
});server.on('error', (err) => {
  console.log('SERVER ERROR');
  console.log(err);
});server.on('close', () => {
  console.log('Client Disconnected');
});server.listen(8124, () => {
  console.log('Server runnig at [http://localhost:'](http://localhost:') + 8124);
});
```

When a client is connected to our server, we get a socket in our callback which is the socket between the Client and the server.

# Parsing HTTP/HTTPS

Now both HTTP and HTTPS are different Protocols so we will be handling the cases separately. After the connection, we will only need the first packet data to get the host details. So we use `once` on the `data` callback to get the first data.

In the case of HTTP, the request contains a `Host` parameter and port for HTTP is 80. You can read more about it on [https://hpbn.co/brief-history-of-http/#http11-internet-standard](https://hpbn.co/brief-history-of-http/#http11-internet-standard)

In the case of HTTPS, we can’t read the packet due to the SSL encryption, so it impossible to read host from the packets. But before the actual request, there is a `CONNECT` request which contains the host and port will be 443. To read more check out RFC [https://tools.ietf.org/html/rfc7231#section-4.3.6](https://tools.ietf.org/html/rfc7231#section-4.3.6)

# Server Connection

After getting the hostname, we connect to the server using `net.createConnection()` . It takes two parameters, the host and port to connect and the second is the connected callback. After the connection, we simply pipe the clientToProxySocket to proxyToServerSocket. Sockets are derived from the streams so they can be piped. To read more about streams and piping refer [this](https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93). TL;DR piping is

```
**readableSrc**.pipe(**writableDest**)
```

The final code looks like in the after the connection to our proxy —

```
**server.on**('connection', (clientToProxySocket) => {
  console.log('Client Connected To Proxy');
  // We need only the data once, the starting packet
  **clientToProxySocket.once**('data', (data) => {
    let isTLSConnection = data.toString().indexOf('CONNECT') !== -1;

    //Considering Port as 80 by default
    let serverPort = 80;
    let serverAddress;
    if (isTLSConnection) {
      // Port changed to 443, parsing the host from CONNECT
      serverPort = 443;
      serverAddress = data.toString()
                          .split('**CONNECT** ')\[1\]
                          .split(' ')\[0\].split(':')\[0\];
    } else {
       // Parsing HOST from HTTP
       serverAddress = data.toString()
                           .split('Host: ')\[1\].split('\\r\\n')\[0\];
    } let proxyToServerSocket = **net.createConnection**({
      host: serverAddress,
      port: serverPort
    }, () => {
      console.log('PROXY TO SERVER SET UP');

      if (isTLSConnection) {
        //Send Back OK to HTTPS CONNECT Request
        clientToProxySocket.write('HTTP/1.1 200 OK\\r\\n\\n');
      } else {
        proxyToServerSocket.write(data);
      }
      // Piping the sockets
      **clientToProxySocket.pipe(proxyToServerSocket);
      proxyToServerSocket.pipe(clientToProxySocket);** proxyToServerSocket.on('error', (err) => {
        console.log('PROXY TO SERVER ERROR');
        console.log(err);
      });
    });
    clientToProxySocket.on('error', err => {
      console.log('CLIENT TO PROXY ERROR');
      console.log(err);
    });
  });
});
```

# **Testing Proxy**

The proxy is started as a normal node server - `node server.js`

Now you can set up your system or browser proxy to `127.0.0.1` (localhost) and port `8124` . On Firefox you can set proxy in the Network setting, in case of Chrome you will need to set up a system-wide Proxy. After the proxy set up if you try opening some site on your browser you would be able to see the host and other logging that you would have enabled in the logs. You can try playing around with the proxy.

The final repo of the code can be seen below —

[

## nimit95/Forward-Proxy

### Forward proxy in NodeJS to handle HTTP/HTTPS. Contribute to nimit95/Forward-Proxy development by creating an account on…

github.com

](https://github.com/nimit95/Forward-Proxy)

For any queries, you can connect with me on twitter @nimit95.
