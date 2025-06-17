---
title: Rhino 1.5R2
parent: Releases
nav_order: 2
---

# Rhino 1.5R2


这是自 Rhino 1.5 第1版发布以来的重要变化日志。

## 图形调试器
感谢 Christopher Oliver 的贡献，Rhino 现在拥有了图形调试器。详情请参阅 [Rhino 调试器](../tools/debugger.md)。

## 内存占用减少
Igor Bukanov 提供了大量更改，从而减少了 Rhino 所需对象的数量和大小。特别是，他引入了一种新的方法来表示内置对象（如 Date 和 RegExp），这减少了所需的内存量并加快了 `Context.initStandardObjects`。

## 解释模式性能提升
Igor Bukanov 还对解释模式性能进行了多项改进。

## JS/CORBA 适配器
Matthias Radestock 编写了一个模块，可以使 JavaScript 代码与 CORBA 交互。详情请参阅 [jscorba](http://sourceforge.net/projects/jscorba)。

## 目录重组与 Ant 构建文件
我重新整理了 Rhino 的目录并编写了一个 [Ant](http://jakarta.apache.org/ant/index.html) 构建文件。这应该会使构建更加简便，并与其他开源 Java 项目更加一致。

## 删除 FlattenedObject
我编写了 FlattenedObject 来提供一种处理原型链中的 JavaScript 对象的方法。Scriptable 定义了原始操作，而 FlattenedObject 定义了操作属性的聚合操作，这些属性可以定义在对象中或通过一系列 getPrototype 调用可达的对象中。但是，我现在认为我设计 FlattenedObject 是糟糕的。或许一个线索是我对这个名字从未满意过：如果对象的名字难以表达，这可能意味着对象的功能定义也不清晰。问题在于它效率低下，因为它需要额外创建一个对象，并由于额外的包装层而显得笨重。

因此，我已提交更改来废弃 FlattenedObject。我在 ScriptableObject 中引入了新的静态方法（感谢 beard@netscape.com 提供的建议），这些方法替代了相关功能。这些方法直接对传入的 Scriptable 对象执行获取、设置和删除操作，而无需创建新的对象。

## WrapHandler 接口
希望为 Java 对象提供自定义包装的嵌入环境可以实现此接口，并调用 Context.setWrapHandler。详情请参阅 WrapHandler 的 javadoc。

## ClassOutput 接口
嵌入者可以实现此接口，以控制生成的类字节码的放置位置。详情请参阅 javadoc。