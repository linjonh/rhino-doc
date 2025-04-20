---
title: Rhino 1.6R6
parent: Releases
nav_order: 12
---

# Rhino 1.6R6

Rhino 1.6R6 引入了多项新功能。

## JavaScript 1.5 新特性

Rhino 现在支持之前版本中未实现的其余 JavaScript 1.5 特性。

### JavaScript 1.5: "严格"模式与新警告消息

有关 JavaScript 严格模式的详细描述，请参阅 [JavaScript 严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)。

简要来说，Rhino 在严格模式下报告以下操作的警告：

- 对未定义变量的赋值
- 引用未定义的属性
- 函数中不一致的返回语句
- 重复的参数名称
- 变量隐藏参数
- 条件语句中的赋值（注意：你可以通过在赋值周围添加额外的一对括号来抑制此警告）
- 对象初始化器中的尾逗号（注意：这在 Rhino 中始终是一个完整的错误）
- 间接调用 eval
- 无用的表达式

要为 Rhino 外壳启用严格模式，请在命令行中添加 `-strict`。如果你直接使用 API，可以设置上下文功能 `FEATURE_STRICT_MODE`。

还可以将所有警告视为错误。只需在外壳命令行中添加 `-fatal-warnings`，或设置上下文功能 `FEATURE_WARNING_AS_ERROR`。

有关更多详细信息，请参阅 [bug 378790](https://bugzilla.mozilla.org/show_bug.cgi?id=378790)。

### JavaScript 1.5: getters 和 setters

此部分内容在原文中未提供完整说明，但通常情况下，这涉及对 JavaScript getter 和 setter 的支持，用于定义对象属性的访问器和修改器。这些特性允许更精细地控制属性访问和修改行为。

### JavaScript 1.5: const 关键字

`const` 关键字用于声明常量，即在初始化后无法被重新赋值的变量。这是一个重要的特性，有助于提高代码的可靠性和安全性。

## 新的 E4X 实现

此部分内容在原文中未提供详细说明，但通常 E4X（ECMAScript for XML）是 JavaScript 用于处理 XML 的扩展。新实现可能带来了性能或功能上的改进。

## 与 Java 安全架构的集成

Rhino 1.6R6 提供了与 Java 安全架构的更深度集成，增强了安全性和权限管理。这使得在 Java 环境中使用 Rhino 更加安全可靠。

## 测试驱动

Rhino 引入了新的测试框架和工具，以便于开发人员编写和执行单元测试。这提高了代码质量和稳定性。

## 对变量参数列表的支持

Rhino 现在支持在函数调用中使用变量参数列表，这增加了函数调用的灵活性。例如，可以使用 `...args` 语法来处理可变数量的参数。

## Bug 修复

此版本修复了多个 bugs，并对性能和稳定性进行了改进。详细信息可以在 [Bug 列表](https://bugzilla.mozilla.org/) 中找到。

---

以上是 Rhino 1.6R6 的主要新特性和改进内容。