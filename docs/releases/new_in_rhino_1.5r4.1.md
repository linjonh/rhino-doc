---
title: Rhino 1.5R4.1
parent: Releases
nav_order: 5
---

# Rhino 1.5R4.1


---
1.5R4.1 是一个修复版本，主要解决了 1.5R4 中发现的 1.5R3 的回归问题。与 1.5R4 相比，唯一的可见 API 变化是 [org.mozilla.javascript.Context](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html) 类中新增的两个方法：[getApplicationClassLoader()](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html#getApplicationClassLoader-) 和 [setApplicationClassLoader(ClasssLoader)](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html#setApplicationClassLoader-java.lang.ClassLoader-)。它们允许控制 Rhino 访问应用程序类时使用的类加载器。
有关 1.5R4 和 1.5R3 的差异，请参阅 [1.5R4 更新日志](new_in_rhino_1.5r4.md)。

## 已解决的 Bugzilla 报告
以下 Bugzilla 报告在 Rhino 1.5R4 中得到了解决。
- [96270](http://bugzilla.mozilla.org/show_bug.cgi?id=96270) 无法在 JavaScript 中创建 Java 对象。
- [193168](http://bugzilla.mozilla.org/show_bug.cgi?id=193168) 在 v1.5R4 中，Rhino 调试器无法在脚本重新加载时更新脚本源。
- [193555](http://bugzilla.mozilla.org/show_bug.cgi?id=193555) 1.5R4 回归：函数表达式无法访问其名称。
- [196017](http://bugzilla.mozilla.org/show_bug.cgi?id=196017) 1.5R4 回归：脚本在某些 JDK 版本中无法找到类。
- [200551](http://bugzilla.mozilla.org/show_bug.cgi?id=200551) 如果 js.jar 安装在 jre/lib/ext 目录中，JavaAdapter 无法加载类。