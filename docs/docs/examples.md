---
title: "示例"
---

# 示例

已提供了一些示例，展示了如何控制 JavaScript 引擎以及如何实现可脚本化的宿主对象。所有示例都位于 Git 存储库中 [examples/src/main](https://github.com/mozilla/rhino/tree/master/examples/src/main/)。

## 样本脚本

[unique.js](https://github.com/mozilla/rhino/blob/master/examples/src/main/resources/unique.js) 脚本允许从文件中打印唯一行。

[liveConnect.js](https://github.com/mozilla/rhino/blob/master/examples/src/main/resources/liveConnect.js) 脚本展示了 LiveConnect（Java 到 JavaScript 连接）的示例使用。

[jsdoc.js](https://github.com/mozilla/rhino/blob/master/examples/src/main/resources/jsdoc.js) 脚本是 JavaScript 中类似于 Java 的 `javadoc`。它大量使用了正则表达式。

[checkParam.js](https://github.com/mozilla/rhino/blob/master/examples/src/main/resources/checkParam.js) 脚本是一个有用的工具，用于检查 Java 文档注释中的 `@param` 标签是否与对应的 Java 方法参数匹配。

[enum.js](https://github.com/mozilla/rhino/blob/master/examples/src/main/resources/enum.js) 脚本是一个良好的示例，展示了如何使用 JavaAdapter 来通过 JavaScript 对象实现 Java 接口。

[NervousText.js](https://github.com/mozilla/rhino/blob/master/examples/src/main/resources/NervousText.js) 脚本是著名的 NervousText 小程序在 JavaScript 中的实现，该脚本使用 [jsc](../tools/javascript_compiler.md) 将 JavaScript 编译为 Java 类。它可以在 HTML 页面 [NervousText.html](https://github.com/mozilla/rhino/blob/master/examples/src/main/resources/NervousText.html) 中运行。

## 控制 JavaScript 引擎

### RunScript 类

[RunScript.java](https://github.com/mozilla/rhino/blob/master/examples/src/main/java/RunScript.java) 是一个简单的程序，可以从命令行执行脚本。

### Control 类

[Control.java](https://github.com/mozilla/rhino/blob/master/examples/src/main/java/Control.java) 是一个程序，执行一个简单的脚本，然后操作结果。

### JavaScript Shell

[Shell.java](https://github.com/mozilla/rhino/blob/master/examples/src/main/java/Shell.java) 是一个程序，可以执行 JavaScript 程序；它是 `tools` 包中 shell 的简化版本。程序可以通过命令行指定文件，或者在 shell 运行时交互式输入。

### PrimitiveWrapFactory

[PrimitiveWrapFactory.java](https://github.com/mozilla/rhino/blob/master/examples/src/main/java/PrimitiveWrapFactory.java) 是一个示例 WrapFactory，可以用来控制 Rhino 引擎对 Java 方法调用的包装行为。

### 多线程脚本执行

[DynamicScopes.java](https://github.com/mozilla/rhino/blob/master/examples/src/main/java/DynamicScopes.java) 是一个程序，创建一个单一的全局作用域对象，然后在多个线程中共享该对象。这样可以实现线程安全的全局状态管理。

## 实现宿主对象

### Foo 类

[foo.java](https://github.com/mozilla/rhino/blob/master/examples/src/main/java/foo.java) 是一个简单的 Java 类，展示了如何创建一个可以从 JavaScript 中调用的类。它包括基本的字段和方法示例。

### Bar 类

[bar.js](https://github.com/mozilla/rhino/blob/master/examples/src/main/resources/bar.js) 是一个简单的 JavaScript 类，展示了如何在 JavaScript 中定义类和继承。

通过这些示例，您可以了解如何在 Rhino 中使用 Java 和 JavaScript 交互，并利用其强大的功能来构建复杂的应用程序。