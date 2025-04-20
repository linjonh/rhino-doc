---
title: Rhino 1.5R3
parent: Releases
nav_order: 3
---

# 犀牛 1.5R3

---
这是自 Rhino 1.5 第2版发布以来显著更改的日志。

## 序列化
请参阅[序列化文档](../docs/serialization.md)。

## 类编写器 API 更改
由Kemal Bayram提供。

> 我做出的最大的更改是用具有单一方法的ClassRepository替换了ClassOutput：
> ```java
>     public boolean storeClass(String className, byte[] classBytes, boolean isTopLevel) throws IOException;
> ```
> 该接口允许任何任意存储方法，例如Hashtable/Map。此外，它还允许你指定类是否应加载，通过返回true或false来实现。你仍然可以使用ClassOutput，因为我编写了一个内部包装器。

> 由于这个接口，我已经能够从Codegen和OptClassNameHelper中剥离出文件保存代码。文件保存代码现在是Context中名为FileClassRepository的内类。因此，我从ClassNameHelper中剥离了一些方法。结果代码比以前清晰得多，但一切仍按通常方式工作。

> 其他一些小的补充：
> - 匿名函数现在命名为class$1而不是class1
> - 添加了get/setClassName到ClassNameHelper，并在上下文中公开

>