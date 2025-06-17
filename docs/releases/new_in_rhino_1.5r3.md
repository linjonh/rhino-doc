---
title: Rhino 1.5R3
parent: Releases
nav_order: 3
---

# Rhino 1.5R3


这是自 Rhino 1.5 Release 2 版本发布以来的重要更改日志。

## 序列化
请参阅[序列化文档](../docs/serialization.md)。

## 类写入器 API 更改
感谢 Kemal Bayram 的贡献。

> 我做出的最大变化是用具有以下单一方法的 ClassRepository 替换了 ClassOutput：
> ```java
>     public boolean storeClass(String className, byte[] classBytes, boolean isTopLevel) throws IOException;
> ```
> 此接口允许任何任意的存储方法，例如 Hashtable/Map。此外，它还允许您通过返回 true 或 false 来指定类是否应加载。您仍然可以使用 ClassOutput，因为我编写了一个内部包装器。
> 
> 有了此接口，还可以从 Codegen 和 OptClassNameHelper 中剥离文件保存代码。文件保存代码现在是 Context 中的内部类 FileClassRepository。因此，我从 ClassNameHelper 中去除了一些方法。生成的代码比以前更加简洁，并且一切仍按正常一样工作。
> 
> 其他小的添加包括：
> - 匿名函数现在命名为 class$1 而不是 class1
> - 在 Context 中暴露的 ClassNameHelper 中添加了 get/setClassName 方法。