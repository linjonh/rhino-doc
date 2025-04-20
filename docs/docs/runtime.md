---
title: "JavaScript 运行时"
---

# JavaScript 运行时


---

## 解释执行

从 Rhino 1.4 第 2 版开始，支持解释模式。当脚本在解释模式下编译时，会创建并存储已编译形式的内部表示，而不是生成 Java 类。执行过程通过使用 Rhino 中的支持例程来评估此编译形式。

## 编译为 Java 字节码

为了提高性能，Rhino 可以将 JavaScript 脚本编译为 Java 字节码。生成的字节码反过来依赖于运行时支持例程。每个 JavaScript 脚本或函数都会被编译成一个单独的类。

支持将 JavaScript 源代码编译到类文件中。可以指定要生成的类文件以及包。

## 类型和值

JavaScript 中有六种基本类型。这些类型使用以下 Java 类型和值实现：

|  JavaScript 基本类型  |  Java 类型  |
|  ---  |  ---  |
|  `undefined`  |  由 `[Context.getUndefinedType()](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html#getUndefinedValue--)` 定义的单例对象  |
|  `null`  |  `null`  |
|  `boolean`  |  `java.lang.Boolean`  |
|  `number`  |  `java.lang.Number`，即任何 `java.lang.Byte`、`java.lang.Short`、`java.lang.Integer`、`java.lang.Float` 或 `java.lang.Double`。不是 java.lang.Long，因为 long 的双精度表示可能会丢失精度。  |
|  `string`  |  `java.lang.CharSequence`（`java.lang.String` 或 `org.mozilla.javascript.ConsString`）  |
|  `object`  |  `org.mozilla.javascript.Scriptable`  |

此外，ECMAScript 将实现 [[Call]] 的对象称为函数。这些对象类型通过实现 Function 接口来表示。

由于 JavaScript 是一种动态类型语言，因此 JavaScript 值的静态 Java 类型是 `java.lang.Object`。

如果引入任何与上述描述不符的类型值进入 JavaScript，JavaScript 引擎的行为是未定义的。（此注意事项不适用于使用 [LiveConnect](https://web.archive.org/web/20160805175917/https://developer.mozilla.org/en-US/docs/Archive/Web/LiveConnect) 的脚本：Java 值会被适当包装和解包以符合上述类型约束。）

## 属性访问

JavaScript 对象的属性可以使用字符串或数字标识符访问。概念上，所有访问器在执行属性查找时都会转换为字符串。但是，这并不是实际使用的实现，因为每次数组访问都进行数值到字符串的转换太昂贵。

相反，[Scriptable](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Scriptable.html) 中的每个属性访问器方法（`has`、`get`、`set`、`remove`、`getAttributes` 和 `setAttributes`）都有接受 `String` 或 `int` 参数的重载形式。调用适当的重载形式是调用者的责任。例如，评估表达式 `obj["3"]` 将调用 get(int, Scriptable) 方法，即使脚本中属性名称被表示为字符串。同样，不适合整数的数字值（如 1.1 和 0x100000000）必须转换为字符串。

## 定义宿主对象

宿主对象是提供对宿主环境特殊访问权限的 JavaScript 对象。例如，在浏览器环境中，Window 和 Document 对象是宿主对象。

定义新宿主对象的最简单方法是使用 [ScriptableObject.defineClass()](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/ScriptableObject.html#defineClass-org.mozilla.javascript.Scriptable-java.lang.Class-boolean-)。此方法使用 Java 类定义一组 JavaScript 对象。几个 [示例](examples.md) 使用这种方法定义宿主对象。

如果 `defineClass` 提供的服务不足以满足需求，请尝试使用 [ScriptableObject](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/ScriptableObject.html) 和 [FunctionObject](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/FunctionObject.html) 的其他方法，例如 `defineProperty` 和 `defineFunctionProperties`。

## 上下文和线程

每个执行 JavaScript 的线程都必须有一个关联的上下文。多个线程（具有多个关联的上下文）可以对同一组对象进行操作。任何定义的宿主对象都会被适当包装和解包以符合类型约束。

如果引入任何与上述描述不符的类型值进入 JavaScript，JavaScript 引擎的行为是未定义的。（此注意事项不适用于使用 [LiveConnect](https://web.archive.org/web/20160805175917/https://developer.mozilla.org/en-US/docs/Archive/Web/LiveConnect) 的脚本：Java 值会被适当包装和解包以符合上述类型约束。）