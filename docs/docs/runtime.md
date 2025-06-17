---
title: "JavaScript运行时"
---

# JavaScript运行时


---

## 解释

从Rhino 1.4 Release 2开始，支持解释模式。当脚本以解释模式编译时，会创建并存储编译形式的内部表示，而不是生成一个Java类。执行是通过使用Rhino中的支持例程来评价这种编译形式进行的。

## 编译为Java字节码

为了提高性能，Rhino可能将JavaScript脚本编译成Java字节码。生成的字节码依赖于运行时支持例程。每个JavaScript脚本或函数会编译成一个单独的类。

JavaScript源码编译为类文件是支持的。可以指定生成的类文件以及包。

## 类型和值

JavaScript中有六种基本类型。这些类型通过以下Java类型和值实现：

|  JavaScript基本类型  |  Java类型  |
|  ---  |  ---  |
|  `undefined`  |  一个由 `[Context.getUndefinedType()](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html#getUndefinedValue--)` 定义的单例对象  |
|  `null`  |  `null`  |
|  `boolean`  |  `java.lang.Boolean`  |
|  `number`  |  `java.lang.Number`，即 `java.lang.Byte`、`java.lang.Short`、`java.lang.Integer`、`java.lang.Float`或`java.lang.Double`中的任何一种。但不是`java.lang.Long`，因为长整型的双精度表示可能会丢失精度。  |
|  `string`  |  `java.lang.CharSequence` (`java.lang.String` 或 `org.mozilla.javascript.ConsString`)  |
|  `object`  |  `org.mozilla.javascript.Scriptable`  |

此外，ECMAScript将实现[[Call]]的对象称为函数。这些对象类型通过实现Function接口表示。

由于JavaScript是动态类型语言，JavaScript值的静态Java类型为 `java.lang.Object`。

如果在JavaScript中引入上述类型之外的任何其他类型，JavaScript引擎的行为是未定义的。（此警告不适用于使用 [LiveConnect](https://web.archive.org/web/20160805175917/https://developer.mozilla.org/en-US/docs/Archive/Web/LiveConnect) 的脚本：Java值会根据上述类型约束进行适当的包装和解包。）

## 属性访问

JavaScript对象中的属性可以通过字符串或数字标识符访问。从概念上讲，所有访问器都转换为字符串以在对象中执行属性查找。然而，这不是实际使用的实现，因为每次数组访问都进行数字到字符串的转换代价太高。

相反， [Scriptable](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Scriptable.html) 中的每个属性访问器方法（`has`、`get`、`set`、`remove`、`getAttributes` 和 `setAttributes`）都有重载形式，可以接受 `String` 或 `int` 参数。调用者有责任调用适当的重载形式。例如，评估表达式 `obj["3"]` 将调用 `get(int, Scriptable)` 方法，即使属性名称在脚本中以字符串表示。同样，不适合整数的数字值（如1.1和0x100000000）必须转换为字符串。

## 定义宿主对象

宿主对象是提供对宿主环境特殊访问的JavaScript对象。例如，在浏览器环境中，Window对象和Document对象是宿主对象。

定义新的宿主对象最简单的方法是使用 [ScriptableObject.defineClass()](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/ScriptableObject.html#defineClass-org.mozilla.javascript.Scriptable-java.lang.Class-boolean-)。此方法使用Java类定义一组JavaScript对象。多个 [示例](examples.md) 都通过这种方式定义宿主对象。

如果 `defineClass` 提供的服务不足，可尝试 [ScriptableObject](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/ScriptableObject.html) 和 [FunctionObject](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/FunctionObject.html) 的其他方法，例如 `defineProperty` 和 `defineFunctionProperties`。

## 上下文与线程

每个执行JavaScript的线程都必须有一个关联的上下文。多个线程（具有多个关联上下文）可以操作同一组对象。任何定义的宿主对象都负责处理来自多个线程安全运行所需的同步。
