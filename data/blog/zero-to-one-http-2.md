---
title: Zero to One on Networking with Real World Application - Part 2
date: '2024-03-03'
tags: ['HTTP', 'Internet', 'Tech', 'Networking']
draft: true
summary: 'In this article, we look at the computer networks from zero to one. Learn about TCP/IP, OSI model'
authors: ['default']
---

## Sockets

Sockets are one of the fundamental building blocks of networked systems. We can consider sockets as bridge of information between two connected devices. Once connected the information can flow in any direction between the two. In modern computer systems, socket implementation is often based on the TCP (Transmission Control Protocol) and is provided by the operating system's kernel. The kernel offers API (Application Programming Interface) that allow to interact with and utilize sockets in applications. These APIs serve as a bridge between the application and the low-level network functionality, simplifying the process of creating networked applications and abstracting much of the underlying complexity.

Let look with an example :-

**Step 1: Create a TCP Server in Node.js**

We can quickly whip up a TCP server using the node.js and use client 'nc' to connect to the server and create a socket and communicate. When on this server we recevi

```javascript
const net = require('net')

const server = net.createServer((socket) => {
  // This function is called whenever a client connects
  console.log('Client connected')

  // Handle data received from the client
  socket.on('data', (data) => {
    console.log(`Received data: ${data.toString()}`)
    console.log('The following is how the request looks like in the hex format:', '\n', data)
    socket.write('Hello World form the server!')
  })

  // Handle the client disconnecting
  socket.on('end', () => {
    console.log('Client disconnected')
  })
})

const PORT = 3000
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
```

**Step 2: Start the Node.js Server**

Save the code above in a file (e.g., tcp-server.js) and run it with Node.js:

```
node tcp-server.js
```

**Step 3: Use 'nc' to Connect to the Server**
s a versatile networking utility that allows users to read from and write to network connections using TCP or UDP. It serves as a Swiss Army knife for network communication, enabling tasks such as port scanning, banner grabbing, and creating simple network servers and clients. Open a new terminal window and use 'nc' to connect to your server:

```
nc 127.0.0.1 3000
Hello World from the client!
```

We can observe from the above example that a socket connection was created between the server and client(nc) and once that connection was made, we were able to send some data ("Hello World!") in this example from the client to the server. That is essentially how a typical TCP server works and other application-layer protocols(HTTP/HTTPS) are built on this to transmit data.
