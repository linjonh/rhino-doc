---
title: 路线图
nav_order: 2
---
# 路线图


以下是一些人们可以为 Rhino 做出贡献的方法。如果下面的某项引起了你的兴趣，请写信给 norrisboyd (at) gmail (dot) com。

## 代码现代化

### 分析 Rhino 和 Java 之间的正则表达式差异，并在可能的情况下进行替换

Rhino 的正则表达式引擎是在 Java 支持正则表达式之前开发的。替换 Rhino 的实现为 Java 的实现可能会更快、更准确。

首先，我们需要查看 Java 和 ECMAScript 正则表达式语法之间的差异。如果它们是相同的，我们可以轻松替换。如果它们不同，我们需要了解这些差异并设计方案以检测和处理 ECMAScript 特定的情况。然后，我们需要用 Java 的实现替换 Rhino 的实现。详情请见 [Bug 390659](https://bugzilla.mozilla.org/show_bug.cgi?id=390659)

## 性能

### 分析并改进基准测试性能

分析基准测试，研究如何提高 Rhino 的性能。

可能的最佳起点是 [V8 benchmarks](https://v8.googlecode.com/svn/data/benchmarks/v5/run.html)。

## 功能
https://github.com/mozilla/rhino/issues?q=is%3Aopen+is%3Aissue+label%3Afeature+

## 错误和改进
https://github.com/mozilla/rhino/issues?q=is%3Aopen+is%3Aissue+label%3Abug