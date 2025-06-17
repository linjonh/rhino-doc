---
title: Rhino 1.6R1
parent: Releases
nav_order: 7
---

# Rhino 1.6R1


---
发布日期: 2004-11-29

Rhino 1.6R1 是 Rhino 的最新主要版本。它支持 ECMAScript for XML (E4X)，如 [ECMA 357 标准](https://www.ecma-international.org/wp-content/uploads/ECMA-357_2nd_edition_december_2005.pdf) 所规定。E4X 是一组语言扩展，为 JavaScript 添加了原生 XML 支持，而不会影响现有代码库。可以参考 [E4X 示例](https://github.com/mozilla/rhino/blob/master/examples/src/main/resources/E4X/e4x_example.js)，了解各种 E4X 构造及其在 JavaScript 代码中的用法。

除非代码使用了下文中提及的已废弃类 [下文](#去除已废弃的类)，否则该版本的 Rhino 应与当前仅使用公共 [API](https://javadoc.io/doc/org.mozilla/rhino/latestindex.html) 的嵌入程序二进制兼容。请通过 Bugzilla 报告任何不兼容问题。

## E4X 实现
E4X 代码由 [BEA](http://www.bea.com/) 捐赠给 Rhino 项目，并由 [BEA](http://www.bea.com/) 和 [AgileDelta](http://www.agiledelta.com/) 的工作人员共同开发。

它使用 [XMLBeans](http://xmlbeans.apache.org/) 库来实现 E4X 运行时。该实现已在 XMLBeans 的 1.0.2 和 1.0.3 版本上进行了测试。请确保在使用 E4X 脚本时，`xbean.jar` 已经在类路径中可用。

详情请参见 [Bugzilla 242805](https://bugzilla.mozilla.org/show_bug.cgi?id=242805)。另请参见 [Bugzilla 270779](https://bugzilla.mozilla.org/show_bug.cgi?id=270779)，了解 Rhino 1.6R1 中 E4X 实现的已知问题。

## 其他更改
### Rhino 异常的公共根
现在所有 Rhino 异常类都继承自 [org.mozilla.javascript.RhinoException](https://github.com/mozilla/rhino/blob/master/rhino/src/main/java/org/mozilla/javascript/RhinoException.java)，它扩展了 `java.lang.RuntimeException`。此类提供了统一的方式来访问异常的脚本源信息，并简化了 Rhino 嵌入程序中的异常处理。

详情请参见 [Bugzilla 244492](https://bugzilla.mozilla.org/show_bug.cgi?id=244492)。

### 去除解释器中的代码复杂性限制
Rhino 的解释器模式中不再限制脚本大小或代码复杂性。只要 JVM 资源允许，现在应该可以执行任何脚本。

详情请参见 [Bugzilla 244014](https://bugzilla.mozilla.org/show_bug.cgi?id=244014) 和 [Bugzilla 256339](https://bugzilla.mozilla.org/show_bug.cgi?id=256339)。

### 解释器中的尾调用优化
Rhino 的解释器模式实现了尾调用优化，以避免当函数返回另一个函数的调用结果时，过多地占用堆栈空间。

详情请参见 [Bugzilla 257128](https://bugzilla.mozilla.org/show_bug.cgi?id=257128)。

### 解释器中的延续支持
Rhino 的解释器模式支持延续（continuations）。该代码基于 Christopher Oliver 的原始延续实现以及 [SISC](http://sisc.sourceforge.net/) 项目的理念。要使用延续，请通过 [设置](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html#setOptimizationLevel-int-) 将优化级别设为 -1，或者在 [Rhino shell](../tools/shell.md) 的命令行中添加 `-opt -1`。

请注意，未来实现的细节以及 Java 和 JavaScript 的延续 API 可能会以不兼容的方式发生更改。

详情请参见 [Bugzilla 258844](https://bugzilla.mozilla.org/show_bug.cgi?id=258844)。

### JavaImporter 构造函数
`JavaImporter` 是一个新的全局构造函数，允许在脚本中省略显式的包名：
```js
var SwingGui = JavaImporter(Packages.javax.swing,
                            Packages.javax.swing.event,
                            Packages.javax.swing.border,
                            java.awt.event,
                            java.awt.Point,
                            java.awt.Rectangle,
                            java.awt.Dimension);
...

with (SwingGui) {
    var mybutton = new JButton(test);
    var mypoint = new Point(10, 10);
    var myframe = new JFrame();
...
}
```
此前，这种功能仅对使用 [org.mozilla.javascript.ImporterTopLevel](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/ImporterTopLevel.html) 类作为顶级作用域的嵌入程序可用。该类为脚本提供了额外的 `importPackage()` 和 `importClass()` 全局函数，但它们的频繁使用倾向于污染全局命名空间，并阻止已加载类的垃圾回收。

详情请参见 [Bugzilla 245882](https://bugzilla.mozilla.org/show_bug.cgi?id=245882)。

### 上下文定制 API
[org.mozilla.javascript.ContextFactory](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/ContextFactory.html) 提供了用于定制 [org.mozilla.javascript.Context](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html) 的新 API，并确保当 Rhino 运行时需要创建 Context 实例时，始终使用特定于应用程序的 Context 子类。
详情请参见 [Bugzilla 245882](https://bugzilla.mozilla.org/show_bug.cgi?id=245882)。

### 支持 Date.now()
`Date.now()` 函数现在可以在 Rhino 中使用，这是对 ECMAScript 标准的 SpiderMonkey 扩展。该函数返回自 1970-01-01 00:00:00 UTC 起经过的毫秒数。

### 去除已废弃的类
以下在 Rhino 1.5R5 中已废弃的类在 Rhino 1.6R1 中不再可用：
- org.mozilla.javascript.ClassNameHelper
- org.mozilla.javascript.ClassRepository

请参阅 [org.mozilla.javascript.optimizer.ClassCompiler](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/optimizer/ClassCompiler.html) 文档，该文档提供了对 ClassNameHelper 和 ClassRepository 的替代。
