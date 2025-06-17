---
title: Rhino 1.7.12  
parent: Releases  
nav_order: 25  
---

# Rhino 1.7.12


## XML 外部实体默认禁用

从此版本开始，Rhino 默认禁用了“XML外部实体注入”，以使其更难实现。这种设置会阻止外部DTD和样式表的获取，并遵循 [OWASP速查表](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.md) 的推荐。虽然这可能会破坏一些现有的项目，但由于这种漏洞在OWASP前十名中显得重要，因此改变默认设置显得至关重要。

仍需要此功能的开发者可以通过将 `Context` 特性标志 `FEATURE_ENABLE_XML_SECURE_PARSING` 设置为false来重新启用它。（默认值为true。）

## 用于嵌入场景的新JAR

此版本还包括了第二个JAR文件“rhino-runtime.jar”。它实际上是现有的Rhino JAR，但排除了“tools”源代码目录。该目录包括了Rhino shell以及默认的“Global”对象，该对象具有加载和处理外部源代码的能力。

由于某些自动化源代码扫描工具将这些功能标记为不安全，此新JAR提供了一种只包含嵌入者通常需要的Rhino部分的方式，而无需引入额外功能。

通常嵌入“rhino.jar”的开发者可以考虑嵌入“rhino-runtime.jar”，如果他们不需要所有这些功能。

感谢以下开发者提供的贡献！

Aditya Pal (1):
- 修复数组中注释的语法错误 [#607](https://github.com/mozilla/rhino/issues/607)

Chris Smith (1):
- 为XML解析器添加安全配置 [#600](https://github.com/mozilla/rhino/issues/600)

Gregory Brail (12):
- 更新1.7.12版本的版本号。
- 修复生成器的代码生成漏洞。
- 修复“贯穿”注释问题。
- 修复有关NaN值的静态分析问题。
- 更多的isNaN修复和一个舍入错误修复。
- 使XML处理器配置更加稳健。
- 启用SpotBugs插件。
- 修复次要静态分析发现问题。
- 增加Travis超时时间。
- 禁用更多不稳定的“BigO”测试。
- 修复迭代器中的“return”处理问题。
- 撤销将某些成员设置为“final”。

Ivan Di Francesco (1):
- 修复警告 [#596](https://github.com/mozilla/rhino/issues/596)

Roland Praml (2):
- 修复: NativeJavaObject.getDefaultValue正确识别数字
- [#511](https://github.com/mozilla/rhino/issues/511) 修复InterfaceAdapter抽象名称查找。

Stijn Kliemesch (7):
- Private static 方法 ScriptRuntime.enumInitOrder(Context,IdEnumeration) 不再期望传递的IdEnumeration的属性对象必须为ScriptableObject类型，仅须为SymbolScriptable类型即可。
- 添加测试类 IterableTest 来测试迭代器实现，目前包含一个针对主机对象的测试案例，特别是一个使用数组迭代器的对象。
- 为IterableTest添加了更多测试。
- 修复 [#616](https://github.com/mozilla/rhino/issues/616) [#617](https://github.com/mozilla/rhino/issues/617) 的问题。
- 修复调用多个Object.prototype成员的问题。
- 修复Object.create和Object.defineProperties实现的动态作用域问题。
- 针对动态作用域和Object.create的测试案例。

nename0 (2):
- 修复Array.include返回封装后的Boolean
- 实现Array.includes以符合规范

RBRi (20):
- 修复Map/Set使用ConsString作为键时的问题；关闭 [#583](https://github.com/mozilla/rhino/issues/583)
- 修复使用索引访问字符串时的propertyIsEnumerable问题；关闭 [#582](https://github.com/mozilla/rhino/issues/582)
- 忽略多余的search/match/replace参数；关闭 [#581](https://github.com/mozilla/rhino/issues/581)
- 添加对setPrototypeOf的支持
- 修复导入问题
- 如果Number.prototype.toFixed的参数小于0，应该抛出RangeError；修复 [#587](https://github.com/mozilla/rhino/issues/587)
- 修复使用流时的解释器回退问题（修复 [#592](https://github.com/mozilla/rhino/issues/592)）
- 解析器已始终将reader读入字符串。将此reader处理移至Context，以便在所有情况下回退到解释器。
- 修复导入问题
- 在函数内部声明为 `var f = function f() {…}` 的函数不应该影响作用域更高的变量。
- 在函数内部声明为 `var f = function f() {…}` 的函数不应该影响作用域更高的变量。
- 修复Boolean(document.all)
- 更多测试已经通过，同时进行一些清理。
- 为内置/ThrowTypeError和内置/TypedArray添加测试。
- 为内置/TypedArrays添加测试。
- 修复BYTES_PER_ELEMENT属性。
- 修复BYTES_PER_ELEMENT原型属性。
- 修复TypedArray构造函数的参数数量问题。
- 修复parseInt处理前导零的问题。
- [#529](https://github.com/mozilla/rhino/issues/529) [#628](https://github.com/mozilla/rhino/issues/628)