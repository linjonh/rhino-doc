---
title: Rhino 1.5R1
parent: Releases
nav_order: 1
---

# Rhino 1.5R1

---
## ECMA 262 第3版规范符合性
Rhino 1.5 实现了 JavaScript 1.5，符合 ECMA 262 第3版（有时称为“ECMAScript”）的规范。第3版标准化了 JavaScript 1.4 中的一些功能，包括：
- 正则表达式
- `switch`语句
- `do...while`循环
- 带标签的语句和带标签的`break`和`continue`
- 对象字面量
- 嵌套函数
- 异常处理
- `instanceof`操作符
- `in`操作符

此外，第3版和JavaScript 1.5还引入了一些新功能，包括：
- Perl 5正则表达式（包括贪婪量词等运算符）
- 异常作为错误处理
- 数字格式化（`Number.prototype.toFixed`、`Number.prototype.toExponential`和`Number.prototype.toGeneral`）

#3 自 Rhino 1.4 Release 3 以来的更改
自从初始版本开源（1.4 Release 3）以来，Rhino 的其他显著更改列于下文。这里只会提到API更改或重大功能更改，而不会提及错误修复。

### 编译模式
Rhino 有两种执行模式：解释性模式和编译模式。解释性模式使用Java实现的解释器循环来执行代码。而编译模式则将JavaScript代码编译为Java字节码，形成类文件。这一编译过程可以在脚本评估时通过现有的API进行，也可以作为一个独立的编译步骤执行。解释器的代码位于 `org.mozilla.javascript` 包中。

### JavaScript 编译器
从命令行调用 `jsc` 工具，可以创建Java类文件。这使得将JavaScript代码嵌入到Java应用程序中变得更加简单和直接。

### LiveConnect 3
LiveConnect 3引入了对方法过载解析的支持，增强了与Java对象交互的能力，使得从JavaScript调用Java方法更加灵活和强大。

### JavaBeans 属性
Rhino 现在可以动态地访问和修改JavaBeans组件的属性，这简化了与GUI组件的交互，特别是在Swing和AWT中使用时更加便捷。

### 动态作用域支持
Rhino 1.5 增加了对动态作用域的支持，这对于在多线程环境中管理变量作用域非常有用。通过引入 `Context` 对象，开发者可以更好地控制和隔离不同的执行上下文。

### 脚本改进
Rhino 的脚本处理能力得到了增强，包括对更复杂的 JavaScript 语法结构的支持，如嵌套函数、闭包等。同时，对于常见的 JavaScript 模式和习惯用法，Rhino 提供了更多优化，使其运行速度更快。

### 上下文监听器
`Context` 对象现在支持属性更改监听器，这使得在上下文属性发生变化时能够及时捕获和处理这些事件，提高了应用程序的响应性和灵活性。

通过这些改进，Rhino 1.5 提供了一个更加强大、灵活和易于使用的 JavaScript 实现，适用于从简单脚本到复杂企业级应用的各种场景。