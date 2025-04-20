---
title: Rhino 1.7R5
parent: Releases
nav_order: 18
---

# Rhino 1.7R5


---
本版本包含了一些长期处于主分支（master branch）中的修复，具体内容请参见下面的发布说明。

下一个版本将是1.8.0，它将包括许多现有的拉取请求。

André Bargull (24):
- 添加了缺失的许可证头到DefineClassMapInheritance.java
- 移除无效的UTF-8编码Unicode替换字符（EF BF BD）
- 添加缺失的条目
- [Bug 772011](https://bugzilla.mozilla.org/show_bug.cgi?id=772011) 解编译器不添加分隔符的问题
- [Bug 738388](https://bugzilla.mozilla.org/show_bug.cgi?id=738388)

Kyle Cronin (2):
- 添加了对重复属性检查的支持
- 改进了对严格模式下函数声明的处理

Evgeny Shepelyuk (1):
- 修复xmlbeans URL的问题

Gregory Brail (10):
- 添加了基于JUnit的基准测试以提高性能
- 改善了Jenkins自动化构建过程
- 其他一些内部优化和改进

Hannes Wallnoefer (5):
- 优化了内存使用，减少了并发类缓存哈希表的内存占用
- 修复了数组处理中的一些问题
- 改善了JavaAdapter与抽象基类和受保护构造函数的兼容性
