---
title: Rhino 1.5R2
parent: Releases
nav_order: 2
---

# Rhino 1.5R2

---
这是自 Rhino 1.5 Release 1 发布以来显著更改的日志。

## 图形化调试器
感谢 Christopher Oliver 的贡献，Rhino 现在拥有了图形化调试器。请参阅 [Rhino 调试器](../tools/debugger.md) 以获取更多详细信息。

## 减少内存占用
Igor Bukanov 提供了一系列改进，以减少 Rhino 所需的对象数量和大小。特别是，他引入了新的方法来表示内置对象（如 Date 和 RegExp），从而减少了所需的内存量，并加快了 `Context.initStandardObjects` 的执行速度。

## 解释模式性能改进
Igor Bukanov 还对解释器模式的性能进行了一系列改进。

## JS/CORBA 适配器
Matthias Radestock 编写了一个模块，使 JavaScript 代码能够与 CORBA 交互。请参阅 [jscorba](http://sourceforge.net/projects/jscorba) 以获取更多详细信息。

## 目录重组和 Ant 构建文件
我对 Rhino 的目录进行了重组，并编写了一个 [Ant](http://jakarta.apache.org/ant/index.html) 构建文件。这将使构建过程更加简单，并与其他开源 Java 项目更一致。

## FlattenedObject 弃用
我编写了 FlattenedObject 以提供一种处理 JavaScript 对象原型链的方法。虽然 Scriptable 定义了基本操作，但 FlattenedObject 定义了操作属性的聚合操作，这些属性可能定义在对象中或通过 getPrototype 调用序列可达到的对象中。然而，我现在认为 FlattenedObject 的设计不佳。也许它的名字就应该是一个线索：如果很难表达这个对象的名称，那么它所谓的功能可能并不明确。问题是，它效率低下，因为需要额外创建一个对象，并且因为多了一层包装而显得笨拙。

因此，我提交了修改，弃用了 FlattenedObject。我在 ScriptableObject 中引入了新的静态方法（感谢 beard@netscape.com 的想法）来替代其功能。这些方法对传入的 Scriptable 对象执行 get、put 和 delete 操作，而不需要创建新对象的额外开销。

## WrapHandler 接口
如果嵌入式环境希望为 Java 对象提供自定义包装，则可以实现此接口并调用 Context.setWrapHandler。请参阅 WrapHandler 的 Javadoc。

## ClassOutput 接口
这是一个嵌入者可以实现的接口，以控制生成的类字节码的位置。请参阅相应的 Javadoc。