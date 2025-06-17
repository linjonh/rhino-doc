---
title: Rhino 1.7.7.1
parent: Releases
nav_order: 20.1
---

# Rhino 1.7.7.1


---
此版本修复了一些影响实际代码的关键问题：
- 改进 String.prototype.repeat，使其更高效并避免溢出
- 修复 CallSite.isNative() 和 isTopLevel()，使其不抛出致命错误
- 替换 Date 类的内部方法 "YearFromTime" 实现，以避免大规模 CPU 循环

具体变更内容：
- 从 SourceReader 修复格式问题。
- 修复 CallSite.isNative() 和 isTopLevel()，使其不抛出错误。
- 使 String.prototype.repeat 在处理大值时不溢出，并调整代码风格。
- 添加从 1.7.7 中的测试。
- 添加从 1.7.7 中的 Gradle 代码。
- 用 jsdate.cpp 中的代码替换 YearFromTime，以避免长时间的 CPU 循环。
