---
title: Rhino 1.5R1
parent: Releases
nav_order: 1
---

# Rhino 1.5R1


---
## ECMA 262 第3版符合性
Rhino 1.5实现了JavaScript 1.5，符合ECMA 262 第3版（有时也称为“ECMAScript”）。第3版对JavaScript 1.4中已有的几个特性进行了标准化，包括：
- 正则表达式
- `switch`语句
- `do...while`循环
- 语句标签以及带标签的`break`和`continue`
- 对象字面量
- 嵌套函数
- 异常处理
- `instanceof`运算符
- `in`运算符

此外，第3版和JavaScript 1.5增加了新特性，包括：
- Perl 5正则表达式，包括贪婪量词等操作符
- 以异常形式处理错误
- 数字格式化（`Number.prototype.toFixed`、`Number.prototype.toExponential`和`Number.prototype.toGeneral`）

#3 自Rhino 1.4 Release 3以来的变化
下面列出了自初次开源发布（1.4 Release 3）以来Rhino的其他显著变化。这里不会提到Bug修复，只会提到API变化或重要功能变化。

### 编译模式
Rhino提供两种执行模式。解释模式由Java中的解释器循环实现。编译模式将JavaScript代码编译成类文件中的Java字节码。这种编译可以在使用现有的解释器接口进行脚本评估时执行，也可以作为一个单独的编译步骤来完成。解释器的代码位于`org.mozilla.javascript.optimizer`包中。

### JavaScript编译器
发行版现在包含一个可以从命令行调用的额外类。这就是jsc，JavaScript编译器。该工具可用于从JavaScript创建Java类，还可以选择创建实现任意接口或扩展任意基类的Java类，从而使JavaScript脚本能够实现例如小程序和Servlet等重要协议。详见[JavaScript编译器](../tools/javascript_compiler.md)。

### LiveConnect 3
Rhino现在支持LiveConnect 3规范（LC3）。最显著的变化是支持重载方法解析。详见[LiveConnect Release 3目标/特性](https://www-archive.mozilla.org/js/liveconnect/lc3_proposal.html)。

### JavaBeans属性反映为Java属性
具有getFoo/setFoo方法的Java类将在JavaScript反射中拥有一个“foo”属性。布尔方法也会被反映。

### 动态作用域支持
Rhino 1.5实现了对动态作用域的支持，这在像服务器嵌入这样的多线程环境中尤为有用。

### `ScriptableObject.defineClass`的新语义
使用Java类定义JavaScript对象的旧规则变得复杂化。这些规则仍然受到支持，但现在支持更简洁的定义。详见[javadoc](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/ScriptableObject.html#defineClass-org.mozilla.javascript.Scriptable-java.lang.Class-boolean-boolean-)。

### Java 2 `-jar`选项支持
现在可以使用Java 2中的`-jar`选项启动Shell。

### Shell变更
这里有两个变化：添加了“environment”和“history”顶级变量。

### 脚本可见的Java类
在JavaOne大会上有人提到许多嵌入可能不希望脚本能够访问所有的Java类。这是一个很好的问题，我已对SecuritySupport接口进行了改动，使嵌入用户能够选择哪些类暴露给脚本。

### SecuritySupport和JavaAdapter
Andrew Wason提出了一个关于新的JavaAdapter功能（允许JavaScript对象通过生成类文件实现任意Java接口）的问题。它没有支持SecuritySupport接口，而该接口允许Rhino将从字节数组创建类的任务委托给嵌入提供的例程。从安全性角度来看，这种能力很重要，因为类创建被认为是一种特权行为。
我已经检查入了修复此问题的改动。如果在创建Context时指定了SecuritySupport类，使用JavaAdapter时将会将类创建委托给SecuritySupport类。

### Context.exit()
Context.exit()从实例方法更改为静态方法。这使其与静态的Context.enter()方法相匹配。详见[javadoc](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html#exit--)了解更多信息。

### Context.enter(Context)
新增了Context.enter的一个重载形式。在没有此方法之前，不可能将现有上下文附加到线程上。详见[javadoc](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html#enter-org.mozilla.javascript.Context-)了解更多信息。

### Context监听器
Context现在支持其部分属性的属性更改监听器。
