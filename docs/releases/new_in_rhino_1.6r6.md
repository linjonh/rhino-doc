---
title: Rhino 1.6R6
parent: Releases
nav_order: 12
---

# Rhino 1.6R6


Rhino 1.6R6 添加了多个新功能。

## JavaScript 1.5 功能

Rhino 现在支持之前版本未实现的 JavaScript 1.5 的剩余功能。

### JavaScript 1.5：带有新警告信息的“严格”模式

参见 [JavaScript 严格模式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) 了解 JavaScript 严格模式的描述。

简单来说，在严格模式下，Rhino 会对以下情况报告警告：

- 给未定义的变量赋值
- 引用未定义的属性
- 函数中的不一致返回语句
- 重复的参数名称
- 隐藏参数的变量
- 条件中的赋值操作（_注意：可以通过在赋值操作周围添加额外的一组括号来忽略此警告_）
- 对象初始化器中的尾随逗号（_注意：在 Rhino 中，这始终是完全错误_）
- 间接调用 eval
- 无用的表达式

要为 Rhino shell 启用严格模式，请在命令行中添加 `-strict`。如果直接使用 API，请设置 Context 特性 `FEATURE_STRICT_MODE`。

还可以将所有警告视为错误。可以在 shell 命令行中添加 `-fatal-warnings`，或者设置 Context 特性 `FEATURE_WARNING_AS_ERROR`。

详细信息参见 [bug 378790](https://bugzilla.mozilla.org/show_bug.cgi?id=378790)。

### JavaScript 1.5：Getters 和 Setters

参见 [定义 Getters 和 Setters](https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Working_with_Objects#Defining_getters_and_setters) 了解 JavaScript 1.5 的参考内容。

### JavaScript 1.5：`const` 关键字

参见 [const](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Statements/const) 了解 JavaScript 1.5 的参考内容。

## 使用 Java 1.5 DOM 的新 E4X 实现

自 Rhino 1.6R1 起，Rhino 使用 Apache XMLBeans 库来支持 E4X。在 Rhino 1.6R6 中，E4X 支持被重写为完全依赖 Java 1.5 原生支持的 DOM3 API。
使用早于 Java 1.5 的用户，如果拥有支持 DOM3 的 XML 解析器，可以使用 Java 的认可标准覆盖机制来使用 DOM3。
从此版本开始，如果类路径上存在 XMLBeans 类，则 XMLBeans 实现仍然是默认设置；否则，如果存在 DOM3，则使用原生 DOM 实现。
如果既不存在 XMLBeans，也不存在 DOM3，则无法使用 E4X。

## 与 Java 安全架构的集成

Rhino 1.6R6 添加了 org.mozilla.javascript.PolicySecurityController 作为 org.mozilla.javascript.SecurityController 的具体实现，这是与 Java 安全架构集成的首选方式。
当没有使用安全控制器时，生成的类和脚本将在 Rhino 类的 ProtectionDomain 中运行。
将对系统属性的封装访问和类加载器的创建封装到 AccessController.doPrivileged() 中，以便能够在安全环境中正常运行。

## 测试驱动程序

Rhino 现在附带用 Java 编写的测试驱动程序。这些驱动程序可以用于测试 Rhino，如果您对核心引擎进行任何更改。它们设计用于与基于 C 的 SpiderMonkey 引擎在 mozilla/js/tests 的 CVS 中共享的测试。

详细了解如何使用 JsDriver 执行测试，参见 [运行 Rhino 测试](https://github.com/mozilla/rhino/blob/master/tests/testsrc/README.md)。

## 支持使用可变参数列表调用 Java 方法和构造函数

Java J2SE 5 添加了在构造函数和方法中使用可变参数列表的支持。Rhino 1.6R6 现在支持使用可变参数列表调用这些方法和构造函数。例如：

```
java.lang.System.out.format("%3.1f%s\n", 1.6, "R6");
```

将打印 `1.6R6`。

更多详细信息参见 [bug 382457](https://bugzilla.mozilla.org/show_bug.cgi?id=382457)。

## Bug 修复

此 [列表](https://bugzilla.mozilla.org/buglist.cgi?query_format=advanced&short_desc_type=allwordssubstr&short_desc=&product=Rhino%20graveyard&target_milestone=1.6R6&long_desc_type=substring&long_desc=&bug_file_loc_type=allwordssubstr&bug_file_loc=&status_whiteboard_type=allwordssubstr&status_whiteboard=&keywords_type=allwords&keywords=&bug_status=RESOLVED&bug_status=VERIFIED&bug_status=CLOSED&resolution=FIXED&emailassigned_to1=1&emailtype1=exact&email1=&emailassigned_to2=1&emailreporter2=1&emailqa_contact2=1&emailtype2=exact&email2=&bugidtype=include&bug_id=&votes=&chfieldfrom=&chfieldto=Now&chfieldvalue=&cmdtype=doit) 显示了 Rhino 1.6R6 中修复的所有 bug（以及增强功能）。
