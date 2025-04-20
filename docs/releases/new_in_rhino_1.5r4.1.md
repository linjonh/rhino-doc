---

title: Rhino 1.5R4.1
parent: Releases
nav_order: 5
---

# Rhino 1.5R4.1

---
1.5R4.1 是一个错误修复版本，主要用于解决在 1.5R4 中发现的 1.5R3 的回归问题。与 1.5R4 相比，唯一显著的 API 更改是在 [org.mozilla.javascript.Context](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html) 中新增了两个方法：[getApplicationClassLoader()](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html#getApplicationClassLoader-) 和 [setApplicationClassLoader(ClassLoader)](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html#setApplicationClassLoader-java.lang.ClassLoader-)。这些方法允许控制 Rhino 在访问应用程序类时使用的类加载器。

有关 1.5R4 和 1.5R3 之间的差异，请参见 [1.5R4 更新日志](new_in_rhino_1.5r4.md)。

## 已解决的 Bugzilla 报告
以下是 Rhino 1.5 发布版本 4 中已解决的 Bugzilla 报告：
- [96270](http://bugzilla.mozilla.org/show_bug.cgi?id=96270) 无法从 JavaScript 内部创建 Java 对象。
- [193168](http://bugzilla.mozilla.org/show_bug.cgi?id=193168) Rhino 1.5R4 版本的调试器在脚本重新加载时无法更新脚本源代码。
- [193555](http://bugzilla.mozilla.org/show_bug.cgi?id=193555) 1.5R4 回归问题：函数表达式无法访问其名称。
- [196017](http://bugzilla.mozilla.org/show_bug.cgi?id=196017) 1.5R4 回归问题：在某些 JDK 版本上，脚本无法找到类。
- [200551](http://bugzilla.mozilla.org/show_bug.cgi?id=200551) 如果 js.jar 安装在 jre/lib/ext 目录中，JavaAdapter 无法加载类。