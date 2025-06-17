---
title: 历史
nav_order: 4
---
# 历史


---
Rhino 的名字来源于 [O'Reilly](https://www.ora.com/) 出版的一本关于 JavaScript 的书籍封面上的犀牛图案。

Rhino 项目于 1997 年秋天在 Netscape 启动。当时，Netscape 计划开发一个完全用 Java 编写的 Navigator 版本，因此需要一个用 Java 编写的 JavaScript 实现。当 Netscape 停止了“Javagator”（这一项目的名称）的开发时，Rhino 神奇地避开了被砍掉的命运（据传高管们“忘记”了它的存在）。一段时间内，几家主要公司（包括 Sun）许可使用 Rhino 用于其产品，并支付 Netscape 相应费用，从而使 Rhino 的开发得以继续。如今，Rhino 是 Mozilla 开源代码库的一部分。

最初，Rhino 将所有 JavaScript 代码编译为 Java 字节码，生成类文件。这种方式提供了最佳性能（通常在 JIT 环境中性能超过用 C 实现的 JavaScript），但有两个缺点。首先，编译时间较长，因为生成 Java 字节码和加载生成的类文件是一个重量级的过程。此外，由于大多数 JVM 不会真正回收未使用的类或加载类文件后内部化的字符串，这导致实现实际上会导致内存泄漏。

因此，在 1998 年秋天，Rhino 增加了解释模式。类文件生成代码被移到一个可选的动态加载包中。编译更快，并且当脚本不再使用时，它们可以像其他 Java 对象一样被回收。

Rhino 于 1998 年 4 月在 mozilla.org 发布。最初，Rhino 的类文件生成功能未被公开发布。然而，Rhino 的许可方现在已经同意将整个 Rhino 开源，包括类文件生成功能。自从其开源以来，Rhino 已被广泛地[使用](users.html)，并且越来越多的人为其代码做出了贡献。
