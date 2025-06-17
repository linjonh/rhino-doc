---
title: Rhino 1.7.7.2
parent: Releases
nav_order: 20.2
---

# Rhino 1.7.7.2


此版本修复了几个重要的错误，这些错误在实际使用中对 Rhino 用户造成了影响。

- 无论用户提供的比较器函数多么奇怪，都不会在 array.prototype.sort() 中抛出 Java 异常。这是 JavaScript 与 Java 之间的一个重大差异，我们因此避免在 JavaScript 数组上使用 "Arrays.sort"。
- 修复 "DataView" 类中的不正确偏移。

此外，还包括其他几个修复：

- 始终将列号附加到 V8 风格的堆栈跟踪中。（不幸的是，列号总是“0”。）
- 支持 Object.is 和 Object.assign。
- 符号实现与规范保持一致（仅适用于 VERSION_ES6 及以上版本）。
- 避免在 "toJSON" 中对某些本地对象抛出内部 Java 异常。
- 允许子类化 ContinuationPending。
- 对于 VERSION_ES6 及以上版本，以规范定义的顺序对属性进行排序（整数属性名称优先）。
- 修复字符串拼接中的堆栈溢出问题。
- 改进 ConsString.toString 的性能。

下一个版本可能是 1.7.8。