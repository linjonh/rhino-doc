---
title: Rhino 1.7.10
parent: 发布版本
nav_order: 23
---

# 犀牛 1.7.10

此版本修复了在版本 1.7.7.2 中引入的一个[回归](https://github.com/mozilla/rhino/issues/415)，该问题导致 `propertyIsEnumerable` 在使用 String 和 typed array 对象时抛出异常，可能还会影响自定义用户编写的对象。

此外，还包含一些其他修复：

Attila Szegedi (2):
- 尽可能将 CallFrame 字段设置为 final，并在构造函数中初始化
- `frame.debuggerFrame != null || frame.idata.itsNeedActivation` 与 frame.useActivation 相同

Jeremy Whitlock (1):
- 检查枚举性时，缺失的属性不被视为可枚举