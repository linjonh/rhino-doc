---
title: Rhino 1.5R5
parent: Releases
nav_order: 6
---

# Rhino 1.5R5


这是 Rhino 1.5 第五次发布中的重要变更记录。

## 将 JavaScript 函数封装为 Java 接口
Rhino 允许向期望接口的 Java 方法传递 JavaScript 函数，该接口要么只有一个方法，要么其所有方法具有相同数量的参数且每个相应参数具有相同类型。每当 Java 调用接口的方法时，都会调用 JavaScript 函数。此函数将接收所有 Java 参数，这些参数会正确转换为 JS 类型，并且 Rhino 将作为最后一个参数传递接口方法的名称。

此功能简化了以前必须显式创建 JavaAdapter 对象的代码。例如，现在可以编写如下代码：

```js
    var button = new javax.swing.JButton("我的按钮");
    button.addActionListener(function(e) {
        java.lang.System.out.println("按钮点击:" + e);
    });
    var frame = new javax.swing.JFrame("我的框架");
    frame.addWindowListener(function(e, 方法名称) {
        java.lang.System.out.println("窗口事件:" + e);
        if (方法名称 == "windowClosing") {
            java.lang.System.exit(0);
        }
    });
```
而不是如下写法：
```js
    var button = new javax.swing.JButton("我的按钮");
    button.addActionListener(new java.awt.event.WindowListener({
        windowClosing : function(e) {
            java.lang.System.out.println("窗口事件:" + e);
            java.lang.System.exit(0);
        },
        windowActivated : function(e) {
            java.lang.System.out.println("窗口事件:" + e);
        },
        // 为 WindowListener 的其他方法编写类似代码
    });
    var frame = new javax.swing.JFrame("我的框架");
    frame.addWindowListener(function(e, 方法名称) {
```
这是以前版本的 Rhino 中必须的做法。详见 [Bugzilla 223435](https://bugzilla.mozilla.org/show_bug.cgi?id=)。

## uneval() 和 toSource()
Rhino 完全支持 `uneval()` 函数和 `toSource()` 方法，这些是 SpiderMonkey 提供的 ECMAScript 扩展。它们返回一个字符串，可以通过 `eval()` 函数重构原始值（如果可能）。保证了 `uneval(eval(uneval(x))) == uneval(x)`，并且在很多情况下更有用的概念 `eval(uneval(x)) == deep_copy_of_x` 成立。

例如，以下是 [Rhino shell](../tools/shell.md) 会话中的示例：

```sh
js> var x = { a: 1, b: 2, c: [1,2,3,4,5], f: function test() { return 1; }, o: { property1: "测试", property2: new Date()}}
js> uneval(x)
({c:[1, 2, 3, 4, 5], o:{property1:"测试", property2:(new Date(1076585338601))}, f:(function test() {return 1;}), a:1, b:2})
js> x.toSource()
({c:[1, 2, 3, 4, 5], o:{property1:"测试", property2:(new Date(1076585338601))}, f:(function test() {return 1;}), a:1, b:2})
js> uneval(x.propertyThatDoesNotExist)
undefined
```
详见 [Bugzilla 225465](https://bugzilla.mozilla.org/show_bug.cgi?id=225465)。

## seal() 和密封对象语义的变更
Rhino 支持 `seal(object)` 函数，这是来自 [SpiderMonkey](https://spidermonkey.dev/) 的另一个 ECMAScript 扩展。该函数使对象不受更改，任何尝试添加、修改或删除这类对象的属性都会抛出异常。以前只有通过 Java 的 [org.mozilla.javascript.ScriptableObject](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/ScriptableObject.html) 中的 `sealObject()` 方法才能实现密封，并且在 Rhino 1.5R5 之前可以修改已密封对象的现有属性。

详见 [Bugzilla 203013](https://bugzilla.mozilla.org/show_bug.cgi?id=203013)。

## 异常变更
在 Rhino 1.5R5 中，所有在脚本执行期间生成的异常都会提供触发异常的脚本源名称和行号的信息。异常类 [org.mozilla.javascript.JavaScriptException](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/JavaScriptException.html) 现在仅用于表示通过 JavaScript **throw** 语句显式抛出的异常，它不再包装由脚本调用的 Java 方法中抛出的异常。这类异常始终包装为 [org.mozilla.javascript.WrappedException](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/WrappedException.html)。

详见 [Bugzilla 217584](https://bugzilla.mozilla.org/show_bug.cgi?id=217584)、[Bugzilla 219055](https://bugzilla.mozilla.org/show_bug.cgi?id=219055) 和 [Bugzilla 225817](https://bugzilla.mozilla.org/show_bug.cgi?id=225817)。

## 编译脚本与作用域独立
以前 Rhino 在 [org.mozilla.javascript.Context](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html) 的 [compileReader](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html#compileReader-org.mozilla.javascript.Scriptable-java.io.Reader-java.lang.String-int-java.lang.Object-) 方法中需要作用域对象来将脚本编译成 [org.mozilla.javascript.Script](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Script.html) 实例。在某些情况下，作用域对象可能会存储在脚本的编译形式中。这使得无法在这些情况下重用编译形式来针对不同作用域执行脚本，并可能导致潜在的内存泄漏。

Rhino 1.5R5 修复了这种误行为，[compileReader](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html#compileReader-java.io.Reader-java.lang.String-int-java.lang.Object-) 和新引入的 [compileString](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html#compileString-java.lang.String-java.lang.String-int-java.lang.Object-) 不再需要作用域参数。为了兼容性，旧形式的 [compileReader](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html#compileReader-org.mozilla.javascript.Scriptable-java.io.Reader-java.lang.String-int-java.lang.Object-) 被保留为弃用方法。
详见 [Bugzilla 218440](https://bugzilla.mozilla.org/show_bug.cgi?id=218440)。

## Callable 接口
Rhino 中的所有 [org.mozilla.javascript.Script](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Script.html) 和 [org.mozilla.javascript.Function](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Function.html) 实例如今实现了新的接口 [org.mozilla.javascript.Callable](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Callable.html)，结合 [org.mozilla.javascript.Context](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html) 中的新方法 [call](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Callable.html#call-org.mozilla.javascript.Context-org.mozilla.javascript.Scriptable-org.mozilla.javascript.Scriptable-java.lang.Object:A-) 提供了一种简单的方式来调用脚本和函数，而无需显式调用 [Context.enter()](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html#enter--) 和 [Context.exit()](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html#exit--)。

该 [Callable](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Callable.html) 接口允许在脚本执行期间将 JavaScript **this** 设置为任意 [org.mozilla.javascript.Scriptable](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Scriptable.html) 实例，覆盖默认使用作用域对象作为 **this** 值的行为。

Rhino 解释器利用 [Callable](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Callable.html) 将脚本和函数的引用直接传递给 [org.mozilla.javascript.SecurityController](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/SecurityController.html)，而无需通过额外的代理 [Script](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Script.html) 对象包装脚本代码。这优化了 [org.mozilla.javascript.SecurityController](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/SecurityController.html) 中 [callWithDomain](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/SecurityController.html#callWithDomain-java.lang.Object-org.mozilla.javascript.Context-org.mozilla.javascript.Callable-org.mozilla.javascript.Scriptable-org.mozilla.javascript.Scriptable-java.lang.Object:A-) 方法的实现。

为了兼容性，扩展以前版本 [SecurityController](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/SecurityController.html) 的应用程序完全支持，但新的应用程序应该覆盖 [callWithDomain](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/SecurityController.html#callWithDomain-java.lang.Object-org.mozilla.javascript.Context-org.mozilla.javascript.Callable-org.mozilla.javascript.Scriptable-org.mozilla.javascript.Scriptable-java.lang.Object:A-) 方法，而不是 [execWithDomain](https://javadoc.io/doc/org.mozilla/rhino/latest/org.mozilla/javascript/SecurityController.html#execWithDomain-org.mozilla.javascript.Context-org.mozilla.javascript.Scriptable-org.mozilla.javascript.Script-java.lang.Object-)。

## 无静态缓存
Rhino 不再在静态对象中缓存生成的类和关于 Java 类的反射信息。相反，这些缓存存储在顶层作用域对象中，并在调用 [org.mozilla.javascript.Context](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html) 的 [initStandardObjects](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html#initStandardObjects--) 方法时默认初始化。如果希望缓存共享，可以通过显式调用 [org.mozilla.javascript.ClassCache](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/ClassCache.html) 的 [associate](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/ClassCache.html#associate-org.mozilla.javascript.ScriptableObject-) 方法来覆盖。

缓存的对象不再保持对作用域对象的引用，因此即使一个应用程序多次调用 [Context.initStandardObjects](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html#initStandardObjects--) 并使用单个共享的 [ClassCache](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/ClassCache.html) 实例，也不会像之前的 Rhino 那样为所有应用程序泄漏运行时库实例的引用。

此更改允许实例化多个互不干扰的 Rhino 运行时实例，并防止通过不断增长的缓存导致的内存泄漏。

## 将脚本编译为类文件的 API
新的类 [org.mozilla.javascript.optimizer.ClassCompiler](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/optimizer/ClassCompiler.html) 提供了简单的 API，可以将 JavaScript 源代码编译为一组 Java 类文件，并具有一组指定的编译选项。[JavaScript 编译器](../tools/javascript_compiler.md) 已升级以使用新 API，旧的 API 已被弃用。

## Context 密封 API
[org.mozilla.javascript.Context](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html) 中的新方法 [seal(Object)](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html#seal-java.lang.Object-)、[unseal(Object)](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html#unseal-java.lang.Object-) 和 [isSealed()](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html#isSealed-) 允许使 [Context](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html) 实例免于更改。需要运行可能不受信任脚本的 Rhino 嵌入可以使用新功能，在无需过于严格的 [org.mozilla.javascript.ClassShutter](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/ClassShutter.html) 实现的情况下正确地实现此类脚本的沙盒。

参见 [Bugzilla 236117](https://bugzilla.mozilla.org/show_bug.cgi?id=236117)。

## 优化器每个脚本仅生成一个类
在 Rhino 1.5R5 中，默认优化模式为脚本及其所有函数仅生成一个 Java 类，而之前优化器会为脚本中的每个函数定义生成额外的类。这改善了脚本的加载时间，并减少了内存使用，尤其是对于具有许多函数定义的脚本。

参见 [Bugzilla 198086](https://bugzilla.mozilla.org/show_bug.cgi?id=198086)。

## 对大型脚本的改进支持
解释模式对脚本的大小和复杂性限制显著减少，如果未满足剩余的限制，Rhino 将报告异常，而不是生成损坏的内部字节码以进行解释。

参见 [Bugzilla 225831](https://bugzilla.mozilla.org/show_bug.cgi?id=225831)。

## 已解决的 Bugzilla 报告
可以通过以下 Bugzilla [查询](http://bugzilla.mozilla.org/buglist.cgi?product=Rhino%20graveyard&target_milestone=1.5R5&bug_status=RESOLVED&bug_status=VERIFIED) 获取 Rhino 1.5R5 中解决的所有 Bugzilla 报告的完整列表，该查询会在 bugzilla.mozilla.org 中搜索产品设置为 Rhino，目标里程碑设置为 1.5R5，并且状态为已解决或已验证的所有问题。