---
title: Rhino 1.7.10
parent: Releases
nav_order: 23
---

# Rhino 1.7.10


---
此版本修复了在1.7.7.2版本中引入的[回归问题](https://github.com/mozilla/rhino/issues/415)，该问题在使用String和类型数组对象时导致`propertyIsEnumerable`抛出异常，并可能影响到用户自定义的对象。

它包含了一些其他修复内容：

Attila Szegedi (2):
- 尽可能地将CallFrame字段设为final，并在构造函数中进行初始化。
- `frame.debuggerFrame != null || frame.idata.itsNeedActivation`与frame.useActivation是完全相同的。

Jeremy Whitlock (1):
- 在检查属性是否可枚举时，缺失的属性不会被枚举