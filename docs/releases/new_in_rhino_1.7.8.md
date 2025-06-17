---
title: Rhino 1.7.8
parent: Releases
nav_order: 21
---

# Rhino 1.7.8


本次发布的最重要变更：
- JavaScript 对象默认情况下不再具有（某种程度上）线程安全性
- Rhino 具有抵抗“哈希泛洪”攻击的能力
- Rhino 仅支持 Java 8 及更新版本
- Rhino 仅使用 Gradle 构建。

本次发布的主要变更是用于从 ScriptableObject 派生对象（几乎所有对象）的对象存储格式已发生变化。

首先，对象默认情况下不再是线程安全的。（之前是线程安全的，但我们无法证明在所有情况下都百分之百正确。）我们认为绝大多数 Rhino 代码不依赖于此功能。

如果需要，可以使用功能标记 `Context.FEATURE_THREAD_SAFE_OBJECTS` 来默认启用对所有对象的锁定。此外，内置的 "sync" 函数仍然受支持，可用于以类似于 Java 中 "synchronized" 关键字的方法来包装函数。

其次，当对象扩展到大量属性时，本机哈希表实现会替换为 java.util.HashMap。这种更复杂（但略慢）的哈希实现可抵抗哈希冲突。这使得 Rhino 在总体上可抵抗“哈希泛洪”攻击。

Rhino 现在依赖于 Java 8。同时，它也适用于 Java 9，尽管在日期解析和 UTF-8 编码方面有一些测试目前存在问题。

其他更改：
- [#290](https://github.com/mozilla/rhino/issues/290) 抵抗哈希泛洪攻击
- [#303](https://github.com/mozilla/rhino/issues/303) 箭头函数位置设置错误
- [#323](https://github.com/mozilla/rhino/issues/323) 解析时可能因无限循环导致内存溢出
- [#341](https://github.com/mozilla/rhino/issues/341) 对象仅在启用功能时线程安全
- [#351](https://github.com/mozilla/rhino/issues/351) 函数级的 "use-strict" 会破坏向后兼容性
- [#357](https://github.com/mozilla/rhino/issues/357) Array.sort() 可能抛出 ArrayIndexOutOfBoundsException 异常
- [#295](https://github.com/mozilla/rhino/issues/295) 更改 WrapFactory 仅包装 "真正的" 原始类型而不是其子类
- [#377](https://github.com/mozilla/rhino/issues/377) 在 "sealed" 模式下初始化 Context 时，ES6 语言级别失败
- [#102](https://github.com/mozilla/rhino/pull/102) 修复正则表达式解析问题，例如 "/0\{0/"
- [#108](https://github.com/mozilla/rhino/pull/108) 将 jsdoc 节点附加到函数参数上
- [#169](https://github.com/mozilla/rhino/pull/169) 启用在 Java 8 上调用默认方法
- [#322](https://github.com/mozilla/rhino/pull/322) 修复静态数组函数
- [#353](https://github.com/mozilla/rhino/pull/353) 成员框调用错误
- [#355](https://github.com/mozilla/rhino/pull/358) 支持类似数组的参数供 Function.prototype.apply() 使用。
- [#372](https://github.com/mozilla/rhino/pull/372) 改善对 test262 的集成并启用更多测试。