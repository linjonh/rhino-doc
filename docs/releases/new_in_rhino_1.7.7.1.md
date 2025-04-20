---

title: Rhino 1.7.7.1  
parent: Releases  
nav_order: 20.1  

---

# Rhino 1.7.7.1  

本次发布修复了几个影响代码运行的关键问题：  
- 提升 `String.prototype.repeat` 的性能，并防止溢出。  
- 修复 `CallSite.isNative()` 和 `isTopLevel()`，确保它们不会抛出致命错误。  
- 更换 `Date` 类内部方法 "YearFromTime" 的实现，以避免大量 CPU 循环。

具体更改：  
- 修正了 `SourceReader` 的格式问题。  
- 修改 `CallSite.isNative()` 和 `isTopLevel()`，防止它们抛出错误。  
- 改进 `String.prototype.repeat`，在处理大数值时避免溢出，并稍微调整代码风格。  
- 增加来自 1.7.7 版本的测试用例。  
- 增加来自 1.7.7 版本的 Gradle 代码。  
- 用 `jsdate.cpp` 中的代码替换 "YearFromTime"，以避免长时间 CPU 循环。  

---

