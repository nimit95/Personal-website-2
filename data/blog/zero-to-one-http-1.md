---
title: Zero to One on Networking with Real World Application - Part 1
date: '2023-09-13'
tags: ['HTTP', 'Internet', 'Tech', 'Networking']
draft: false
summary: 'In this article, we look at the computer networks from zero to one. Learn about TCP/IP, OSI model'
authors: ['default']
---

# Overview

In today's interconnected world, networking is at the heart of every application. Whether you're building a chat application, a real-time analytics dashboard, or a web server, the ability to communicate over the network is fundamental. The intricacies of the network layer, sockets and protocols are hidden by the frameworks and libraries, allowing developers to focus on higher-level application logic and functionality without needing to delve deeply into the underlying networking details. But it is also important to know these intricacies to make the application more efficient and optimized.

In college, I had a dislike for computer networks and didn't dedicate much time to studying the subject. However, when I began my first job at BrowserStack, the role required me to have a strong understanding of networks. As I delved into learning more and applying the knowledge practically, I came to appreciate the beauty and usefulness of networking concepts. Understanding the underlying principles of computer networks can greatly assist in designing systems more efficiently. Additionally, it enables you to delve deeper into web servers and customize them to suit your application's specific needs.

This guide will help demystify these networking components, providing you with a deeper understanding of how they work and how to harness their power when building complex and customized networked applications. If you are new to networking, then this guide will serve as an invaluable resource, breaking down complex concepts into manageable, comprehensible pieces and providing step-by-step explanations and practical examples to accelerate your learning journey.

We'll start by exploring the basics of networking and sockets, the building blocks of network communication, and demonstrate how to create a simple socket server. Then, we'll take a closer look at the server using the nc (netcat) utility to send data over sockets, providing you with practical insights. After mastering sockets, we'll shift our focus to HTTP and HTTPS in the next parts, two essential protocols for web communication. By the end of this series, you'll have a solid understanding of networking in Node.js and be well-equipped to tackle a wide range of network-related tasks in your applications. In this comprehensive guide, we will dive deep into networking by using Node.js, one of the most popular and versatile JavaScript runtimes.

## What the heck is OSI model and protocols

This was my initial reaction when I first encountered these terms at BrowserStack. I vaguely remembered studying the OSI model diagram for an exam, but I couldn't see its practical application at the time. Seeking clarity, I approached a fellow experienced engineer and posed the question to him. He helped me connect the OSI model to real-world Internet usage. Here is the diagram:

![TCP/IP OSI Model](/static/images/tcpip.png)

## TCP/IP model

Let's break down the model into three parts: the TCP/IP model, protocols, and services in the OSI model. The TCP/IP model is a conceptual framework used for understanding how network protocols work together. It consists of four layers: Network Interface, Internet, Transport, and Application.

In the TCP/IP model, you'll notice four layers stacked on top of each other, each representing a different aspect of network communication. These layers are organized from the one closest to human interaction to the one farthest away. The Network Interface layer, situated at the bottom of the stack, serves as the bridge between your device and the network it's connected to. It encompasses both physical components, like Ethernet cables, and virtual components, like Wi-Fi routers. Essentially, the Network Interface facilitates the exchange of data between your device and other devices on the network, serving as the gateway for incoming and outgoing data transmissions. Without it, your device wouldn't be able to communicate with other devices effectively

Moving up a layer, we encounter the network layer, which builds upon the physical layer below it. The network layer utilizes the physical link established by the network interface to connect two networking devices. Its primary responsibility is to transport messages over the physical layer. You might wonder, 'What does that mean?' Well, think of the network layer as hardware in your device that sends messages on the physical layer. Additionally, the network layer handles routing, ensuring that messages take the most efficient physical path to the connected device. This process involves various algorithms, such as ARP, ICMP, and LCP, which facilitate finding other devices, routing, and sending information. Delving deeper into these algorithms can provide a clearer understanding of the network layer's functionality.

In Linux, there is a useful utility called traceroute, which allows you to map the route that your request would take from its source to its destination. Traceroute provides valuable insights into the path that network packets traverse across routers and networks, helping to diagnose network connectivity issues and optimize network performance.

![TCP/IP OSI Model](/static/images/traceroute1.png)

The next two layers, the transport and application layers, are more accessible to developers. These layers consist of sets of rules(protocols) that enable communication between connected devices. They ensure that messages are reliably received. For instance, if the network layer attempts to send a message packet through the physical layer but encounters a broken link, the transport layer algorithm(such as TCP) steps in and initiates retries to ensure the message is successfully delivered.

Algorithms for network communication, such as TCP and UDP, are commonly implemented within the operating system kernel. This ensures that network communication is efficient and reliable. With the transport layer, applications have a dependable means of communication. The entire networking stack works together to ensure that each message is sent reliably and efficiently. As a result, applications can leverage this underlying architecture without worrying about the inherent unreliability of the physical world.

The transport layer ensures reliable communication for applications within the networking stack. It guarantees that each message is sent reliably and efficiently, mitigating the challenges posed by the inherent unreliability of the physical world. As a result, applications can leverage this dependable layer to communicate without concerns about network reliability.

The application layer operates with its own set of rules to facilitate structured and secure communication. Protocols such as HTTP and FTP are examples of protocols used at the application layer. These protocols define how information is exchanged between applications in a standardized and secure manner. Furthermore, these application layer protocols can be layered on top of suitable transport layer protocols. This flexibility allows for a plethora of protocols to be utilized, depending on the specific use case or application requirements. We will delve into the details of these protocols and their algorithms later in the discussion.

### Protocols and services

These protocols represent a set of rules that dictate communication at each layer of the networking stack. As backend developers, we typically don't need to delve into the intricacies of the network interface and network layers. Similarly, while we may not directly modify the transport layer, it's crucial to understand the advantages and drawbacks of specific protocols.

For instance, UDP (User Datagram Protocol) is often favored for its speed in establishing connections and sending messages. However, it doesn't guarantee message delivery, meaning there's no built-in mechanism for retrying undelivered messages. This contrasts with TCP (Transmission Control Protocol), which ensures reliable, ordered delivery of data but may incur higher latency due to its connection-oriented nature.

By understanding these nuances, backend developers can make informed decisions when selecting protocols that best suit the requirements of their applications.

### OSI Model

OSI model is more detailed then TCP/IP model. Conceptually they achieve the same results, it is just some of the functions are broken in more detail, compared to tcp/IP model. you can learn more about OSI model here.

This is a theory-heavy blog and I promise in the next part we will get our hands dirty with code and look at socket API eith node. Thanks for reading through.
