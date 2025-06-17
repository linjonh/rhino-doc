---
title: "示例"
---

# 示例


提供了一些示例，展示如何控制 JavaScript 引擎以及如何实现可编程的宿主对象。所有示例都在 git 仓库中的 [examples/src/main](https://github.com/mozilla/rhino/tree/master/examples/src/main/)。

## 示例脚本

[unique.js](https://github.com/mozilla/rhino/blob/master/examples/src/main/resources/unique.js) 脚本可以打印文件中的唯一行。

[liveConnect.js](https://github.com/mozilla/rhino/blob/master/examples/src/main/resources/liveConnect.js) 脚本展示了 LiveConnect (Java 到 JavaScript 的连接) 的示例用法。

[jsdoc.js](https://github.com/mozilla/rhino/blob/master/examples/src/main/resources/jsdoc.js) 脚本是 Java 中 `javadoc` 的 JavaScript 类似工具。它大量使用了正则表达式。

[checkParam.js](https://github.com/mozilla/rhino/blob/master/examples/src/main/resources/checkParam.js) 脚本是一种有用的工具，用于检查 Java 文档注释中的 `@param` 标签是否与对应 Java 方法的参数相匹配。

[enum.js](https://github.com/mozilla/rhino/blob/master/examples/src/main/resources/enum.js) 脚本是使用 JavaAdapter 通过 JavaScript 对象实现 Java 接口的一个很好的示例。

[NervousText.js](https://github.com/mozilla/rhino/blob/master/examples/src/main/resources/NervousText.js) 脚本是著名 NervousText 小程序的 JavaScript 实现，它使用 [jsc](../tools/javascript_compiler.md) 将 JavaScript 编译为 Java 类。它可以在 HTML 页面 [NervousText.html](https://github.com/mozilla/rhino/blob/master/examples/src/main/resources/NervousText.html) 中运行。

## 控制 JavaScript 引擎

### RunScript 类

[RunScript.java](https://github.com/mozilla/rhino/blob/master/examples/src/main/java/RunScript.java) 是一个简单的程序，用于从命令行执行脚本。

### Control 类

[Control.java](https://github.com/mozilla/rhino/blob/master/examples/src/main/java/Control.java) 是一个程序，它执行一个简单的脚本并操作结果。

### JavaScript Shell

[Shell.java](https://github.com/mozilla/rhino/blob/master/examples/src/main/java/Shell.java) 是一个程序，用于执行 JavaScript 程序；它是工具包中 Shell 的简化版本。程序可以通过命令行指定文件或在 Shell 运行时交互式输入。

### PrimitiveWrapFactory

[PrimitiveWrapFactory.java](https://github.com/mozilla/rhino/blob/master/examples/src/main/java/PrimitiveWrapFactory.java) 是 WrapFactory 的一个示例，它可以用于控制 Rhino 引擎在调用 Java 方法时的包装行为。

### 多线程脚本执行

[DynamicScopes.java](https://github.com/mozilla/rhino/blob/master/examples/src/main/java/DynamicScopes.java) 是一个程序，它创建一个单一的全局作用域对象，然后在多个线程之间共享它。共享全局作用域不仅可以在线程之间共享信息，还可以通过只执行一次耗时的 Context.initStandardObjects 操作降低成本。

## 实现宿主对象

如果你还没有看过，请先查看 [教程](../tutorials/embedding_tutorial.md)。

### Foo 类 - 扩展 ScriptableObject

[Foo.java](https://github.com/mozilla/rhino/blob/master/examples/src/main/java/Foo.java) 是一个简单的 JavaScript 宿主对象，包括一个带有关联操作的属性和一个可变参数方法。

### Matrix 类 - 实现 Scriptable

[Matrix.java](https://github.com/mozilla/rhino/blob/master/examples/src/main/java/Matrix.java) 通过实现 Scriptable 接口提供了一个简单的多维数组。

### File 类 - 高级示例

[File.java](https://github.com/mozilla/rhino/blob/master/examples/src/main/java/File.java) 扩展 ScriptableObject，为 JavaScript 提供读写文件的功能。这是一个更复杂的宿主对象定义示例。
