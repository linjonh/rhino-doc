---
title: Rhino 1.7R1
parent: Releases
nav_order: 14
---

# Rhino 1.7R1


---
Rhino 1.7R1是一个主要功能版本。

## JavaScript 1.7 功能

从Rhino1.7R1开始，Rhino现在支持JavaScript 1.7的功能。请参阅[JavaScript 1.7的新功能](https://web.archive.org/web/20210502042346mp_/https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/1.7)。JavaScript 1.7支持以下功能：

- 生成器和迭代器
- 数组推导
- 使用let的块作用域
- 解构赋值

要启用JavaScript 1.7支持，必须使用`Context.setLanguageVersion()` API调用将版本设置为170。如果您使用Rhino shell，可以在命令行上指定`-version 170`，或者在shell执行的代码中调用`version(170)`。

## 从Java `Iterable`或`Iterator`创建JavaScript `Iterator`

作为对JavaScript 1.7的一个扩展，Rhino现在支持从[java.lang.Iterable](https://java.sun.com/javase/6/docs/api/java/lang/Iterable.html)和[java.util.Iterator](https://java.sun.com/javase/6/docs/api/java/util/Iterator.html)对象创建JavaScript `Iterators`。例如：

```
js> m = new java.util.LinkedHashMap()
{}
js> m.put("a",1); m.put("b",2); m
{a=1.0, b=2.0}
js> for (i in Iterator(m.values())) print(i)
1.0
2.0
js> for (i in Iterator(m.values().iterator())) print(i)
1.0
2.0
```

注意，`for (i in m.values())`仍然会遍历`m.values()`返回的对象的属性，即`java.util.HashMap$Values`的所有方法名称。这样做是为了不破坏向后兼容性。

## DOM3 E4X实现更受青睐

从Rhino 1.7R1开始，基于DOM3的E4X实现现在比XMLBeans实现更受青睐。以前，如果XMLBeans实现存在于类路径中，则会使用它；现在只有在运行Rhino的Java版本不支持DOM3（即JDK 1.5之前）时才会使用它，或者通过覆盖`ContextFactory.getE4xImplementationFactory()`显式指定。

## 支持通过独立JAR文件的JDK 1.4

我们现在需要至少JDK 1.5才能编译Rhino源代码。因此，二进制分发版中的`js.jar`无法在JDK 1.4上运行。为了支持那些在JDK 1.4上运行Rhino的人，我们使用[Retrotranslator](http://retrotranslator.sourceforge.net/)生成`js-14.jar`，它与JDK 1.4兼容。`js-14.jar`也包含在二进制分发版中，可以从源代码中使用ant构建。

## 编译模式下支持指令阈值回调

现在可以为编译后的脚本请求指令回调。有关详细信息，请参阅[Debugger documentation](https://developer.mozilla.org/en-US/docs/New_in_JavaScript_1.7#Debugger)。

## 调试器必须在下载后自行构建

这不是一个功能，但为了确保我们不发布从非开放源代码许可证下获得的源代码构建的二进制文件，您必须下载一些源文件并自己构建调试器。以下是操作方法：

- `unzip rhino1_7R1.zip`
- `cd rhino1_7R1`
- `ant compile-debugger`

现在`js.jar`包含运行调试器所需的源代码：

```
java -cp js.jar org.mozilla.javascript.tools.debuger.Main test.js
```

如果有人愿意贡献更改，以便我们可以在不依赖这些封闭源代码许可证的情况下构建调试器，我们将很乐意见到这些更改并将其合并到Rhino中。