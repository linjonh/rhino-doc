---
title: 路线图
nav_order: 2
---

# 路线图

以下是一些关于如何为Rhino贡献的想法。如果下面的内容激发了你的兴趣，请写邮件至norrisboyd (at) gmail (dot) com。

## 代码现代化

### 分析Rhino和Java正则表达式的差异，并在可能的情况下进行替换

Rhino的正则表达式引擎是在Java支持正则表达式之前开发的。我们希望用更快、更正确的Java实现来替换Rhino的实现。

首先，我们需要分析Java和ECMAScript正则表达式语法之间的差异。如果两者完全相同，我们可以轻松地进行替换。如果存在差异，我们需要理解这些差异，并设计一种方法来检测和处理特定于ECMAScript的案例。然后我们需要将Rhino的实现替换为调用Java的实现。参见[Bug 390659](https://bugzilla.mozilla.org/show_bug.cgi?id=390659)。

## 性能

### 分析并改进基准测试性能

分析基准测试，看看Rhino可以如何提高性能。

最好的起点可能是[V8基准测试](https://v8.googlecode.com/svn/data/benchmarks/v5/run.html)。

## 功能
https://github.com/mozilla/rhino/issues?q=is%3Aopen+is%3Aissue+label%3Afeature+

## 错误和增强
https://github.com/mozilla/rhino/issues?q=is%3Aopen+is%3Aissue+label%3Abug