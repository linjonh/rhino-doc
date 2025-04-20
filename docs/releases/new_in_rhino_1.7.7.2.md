---
title: Rhino 1.7.7.2
parent: Releases
nav_order: 20.2
---

# Rhino 1.7.7.2

本版本包含了几个重要错误的修复，这些错误在现实应用中曾让Rhino用户遇到困扰。

- 不管用户提供的比较函数有多么奇怪，都不要从array.prototype.sort()抛出Java异常。这是JavaScript和Java之间的一个主要区别，导致我们避免使用"Arrays.sort"对JavaScript数组进行排序。
- 修复了"DataView"类中的不正确偏移量。

此外，还包含了其他几个修复：

- 始终在V8风格的堆栈跟踪中添加列号。（遗憾的是，目前始终是“0”。）
- 支持Object.is和Object.assign。
- 使Symbol实现与规范相匹配（仅适用于VERSION_ES6及更高版本）。
- 避免在"toJSON"中抛出某些本机对象的内部Java异常。
- 允许对ContinuationPending进行子类化。
- 对于VERSION_ES6及更高版本，按照规范定义的顺序排序属性（首先是整数属性名）。
- 修复字符串连接中的堆栈溢出问题。
- 提升ConsString.toString的性能。

下一个版本可能是1.7.8。