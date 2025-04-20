---
title: Rhino 1.7.8
parent: Releases
nav_order: 21
---

# 犀牛 1.7.8

本版本中的最重要改动：
- 默认情况下，JavaScript 对象不再是线程安全的
- 增加了对“哈希洪水”攻击的抵抗力
- 只支持 Java 8 及更高版本
- 仅使用 Gradle 进行构建

本版本的主要改动是：继承自 `ScriptableObject`（几乎所有对象）的对象存储格式发生了变化。

首先，默认情况下，对象不再是线程安全的。（以前它们在某种程度上是线程安全的，但我们无法证明这种机制在所有情况下都是 100% 正确。）我们认为，大多数 Rhino 代码并不依赖这一功能。

如果需要，可以使用特性标志 `Context.FEATURE_THREAD_SAFE_OBJECTS` 来启用默认对象锁定。此外，内置的“sync”函数仍然受到支持，可以像 Java 中的“synchronized”关键字一样包装函数。

其次，当对象拥有大量属性时，本地哈希表实现被替换为 `java.util.HashMap`。这种更复杂（但稍慢）的哈希实现能够抵抗哈希碰撞，使得 Rhino 通常情况下对“哈希洪水”攻击具有抵抗力。

Rhino 现在仅依赖 Java 8，但它也可以在 Java 9 上运行，尽管当前围绕日期解析和 UTF-8 编码的一些测试存在问题。

其他改动：
- [#290](https://github.com/mozilla/rhino/issues/290) 增加对哈希洪水攻击的抵抗力
- [#303](https://github.com/mozilla/rhino/issues/303) 箭头函数位置设置错误
- [#323](https://github.com/mozilla/rhino/issues/323) 解析无限循环可能导致内存溢出
- [#341](https://github.com/mozilla/rhino/issues/341) 仅在启用特性时，对象才是线程安全的
- [#351](https://github.com/mozilla/rhino/issues/351) 函数级别的严格使用破坏了向后兼容性
- [#357](https://github.com/mozilla/rhino/issues/357) `Array.sort()` 可能抛出 `ArrayIndexOutOfBoundsException`
- [#295](https://github.com/mozilla/rhino/issues/295) 更改 `WrapFactory`，仅包装“true”基本类型，而不包括子类
- [#377](https://github.com/mozilla/rhino/issues/377) 在“sealed”模式下初始化上下文失败
- [#...](https://github.com/mozilla/rhino/issues/...) 其他问题和改进