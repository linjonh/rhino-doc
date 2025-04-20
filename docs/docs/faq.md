---
title: "常见问题解答"
---

# 常见问题解答

---

## 如何从JavaScript创建Java数组？

您必须使用Java反射。例如，要创建一个长度为五的`java.lang.String`类型数组，可以这样做：

```js
var stringArray = java.lang.reflect.Array.newInstance(java.lang.String, 5);
```

如果您想将字符串 "hi" 分配给第一个元素，只需执行 `stringArray[0] = "hi"`。创建原生类型数组的方法稍有不同：您必须使用TYPE字段。例如，创建一个长度为七的int数组，可以这样做：

```js
var intArray = java.lang.reflect.Array.newInstance(java.lang.Integer.TYPE, 7);
```

## 当我尝试执行脚本时出现异常`Required security context missing`，这是什么情况？

您可能遗漏了将`Security.properties`文件放置在类路径中的`org.mozilla.javascript.resources`位置。

## 我可以在网页浏览器中使用Rhino吗？

Rhino是一个为Java设计的库，而不是为普通网页浏览器设计。然而，基于Java的浏览器可能会像任何其他Java程序一样使用Rhino来执行页面上的脚本。