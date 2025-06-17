---
title: "常见问题"
---
# 常见问题



## 如何从 JavaScript 创建一个 Java 数组？

您必须使用 Java 的反射。例如，要创建一个长度为 5 的 java.lang.String 数组，可以执行以下代码：

```js
var stringArray = java.lang.reflect.Array.newInstance(java.lang.String, 5);
```

然后如果您想将字符串 "hi" 分配给第一个元素，只需执行 `stringArray[0] = "hi"`。创建基本类型的数组稍有不同：您必须使用 TYPE 字段。例如，可以通过以下代码创建一个长度为 7 的 int 数组：

```js
var intArray = java.lang.reflect.Array.newInstance(java.lang.Integer.TYPE, 7);
```

## 当我尝试执行脚本时出现异常 `Required security context missing`。发生了什么情况？

您可能遗漏了将 `Security.properties` 文件放置在类路径中的 `org.mozilla.javascript.resources` 位置。

## 我可以在网络浏览器中使用 Rhino 吗？

Rhino 是一个供 Java 使用的库，而不是为普通的网络浏览器设计的。然而，基于 Java 的浏览器可以像任何其他 Java 程序一样，在网页中使用 Rhino 运行脚本。
