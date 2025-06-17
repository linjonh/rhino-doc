---
title: Rhino 1.7.13
parent: Releases
nav_order: 26
---

# Rhino 1.7.13


---
## 脚本引擎支持

由于 Nashorn 已被弃用，不少人询问如何在标准 Java 'ScriptEngine' 接口中使用 Rhino。本次发布对此进行了支持。

然而，为了避免破坏现有代码，脚本引擎作为一个单独的 JAR 发布。使用 'rhino-engine' JAR 和标准的 'rhino' JAR 一起引入该功能。

## 生成器支持

本次发布支持基于 ES6 标准 `function *` 语法的生成器。

## 其他重要更改

本次发布还包括来自五位贡献者的大量质量和一致性修复。一如既往，可查看[兼容性表](../compat/engines.html) 了解 Rhino 当前状况。

Gregory Brail (18):
- 开始开发 1.7.13。
- 添加 CircleCi 的构建配置。
- 将 Gradle 版本升级到 6.5。
- 更新最大工作线程数量。
- 添加对 ES6 生成器的支持。
- 使 'GeneratorFunction' 模式在解释模式下工作。
- 完成 GeneratorFunction 的实现。
- 添加诊断功能以发现测试超时。
- 实现标准 Java ScriptEngine。
- 修改 MozillaSuiteBenchmark，不再创建线程。
- 尝试提高 MozillaSuiteTest 的性能。
- 禁用一些非常慢的测试。
- 开始使用 JMH 进行基准测试。
- 使用 FindBugs 和其他工具发现的小修复。
- 关闭所有使用 'BigO' 函数的 Mozilla 测试。
- 将 'BodyCodegen' 移动到一个适当命名的文件中。
- 为 Function.__proto__ 的更改添加特性标志。
- 使 __proto__ 更加符合规范。

Karl Tauber (2):
- Debugger 修复 [FlatLaf](https://github.com/JFormDesigner/FlatLaf)：
  - 使渲染器树行高与表格行高相同。
  - 如果 L&F 使用较大字体，则在脚本源和评估视图中增加等宽字体大小。
  - 如果 L&F 设置了边框，则移除渲染器树边框（内置的 L&F 不会设置）。
- Debugger：修复在扩展 'CallSite' 时变量视图中的 NPE。

Sylvain Jermini (7):
- 改进 `java.util.{List,Map}` 的互操作性。
- Travis：从 trusty 切换到 xenial，并在测试中显式设置 -Xss。
- 尝试修复 CircleCi，增加 Xss。
- 修复 Java 11 中字符串 .trim.doctest 的失败。
- NativeDate：DateFormat，使用显式模式，默认模式从 Java 8 到 9 已更改。参见：https://stackoverflow.com/q/53317365。
- 将 Java 11 添加到 Travis 测试矩阵。
- 各种 Javadoc 修复，以使其能够通过检查。

hjx胡继续 (2):
- 添加 String.fromCodePoint()
- 优化 fromCharCode

ian4hu (5):
- 添加 String.prototype.trimStart 和 String.prototype.trimEnd。
- 样式：代码风格调整。
- 测试：使用十六进制代码测试字符串而非文字。
- 移除未使用的 StringBuilder。
- 修复 test262/built-ins/String/fromCodePoint/* 中的测试。

leela52452 (1):
- 修复 OWASP Cheat Sheet 的 Markdown 格式。

RBRi (48):
- 切换 value 和 done。
- 将一些方法设为受保护以支持外部 Rhino 实现。
- NativeArrayBuffer 的 slice() 长度为 2。
- 修复 `String.indexOf` 和 `String.includes` 在搜索空字符串时的问题 [#747](https://github.com/mozilla/rhino/issues/747)。
- 修复 string.split 用 limit 0 的问题。
- 修复问题 [#665](https://github.com/mozilla/rhino/issues/665) （可能需要将版本切换调整为 1_6）。
- 修复将数组转换为字符串时的递归检测。
- 修复 [#670](https://github.com/mozilla/rhino/issues/670)。
- 为问题 [#656](https://github.com/mozilla/rhino/issues/656) 添加测试用例。
- 修复 Symbol.length 为 0 的问题 [#648](https://github.com/mozilla/rhino/issues/648)。
- 为问题 [#651](https://github.com/mozilla/rhino/issues/651) 添加测试用例。
- 修正期待值的类型错误。
- 改进 seal() 和 freeze() 处理；修复 [#174](https://github.com/mozilla/rhino/issues/174)。
- 在严格模式下为只读变量定义属性时应抛出错误，修复 573。
- 代码清理。
- 不要在静态变量中保存/共享 NativeArrayBuffer 实例。此更改引入了非常奇怪的副作用，因为该实例可从 JavaScript 代码中访问（并更改）。这些更改是持久性的，即使启动新的 Rhino 实例，也会使用已更改的对象。
- 针对使用 Array.prototype.foo.call(null, ....) 模式的数组调用进行各种修复。
- 修复问题 [#648](https://github.com/mozilla/rhino/issues/648)。
- 为本机字符串的索引属性修复 Object.getOwnPropertyDescriptor。
- Function.__proto__ 忽略写访问。
- 改进基于 anb 的提交 2164382abe078ea2024b9dff7fe416a78e3a668f 的正则表达式解析器。
- 在 String.normalize() 中处理未定义参数值。
- 无法更改不可扩展对象的 [[Prototype]]；代码清理。
- 添加版本保护。
- 修复所有 this-value-not-obj-coercible.js 文件中的字符串测试。
- Checkstyle 修复。
- 修复测试套件设置。
- 使用 RangeError 构造助手。
- 改进对负 ArrayBuffer 大小的处理，修复 [#708](https://github.com/mozilla/rhino/issues/708)。
- 在 ES6 中，TypedArray 构造函数只能通过 new 调用。
- 避免一些自动装箱，使用 Double.valueOf 而非创建新的 Double。代码清理并优化以避免不必要的转换和 Double 对象创建。
- 正则表达式不是 string.replace 上下文中的函数，修复 [#726](https://github.com/mozilla/rhino/issues/726)。
- 改进正则表达式范围处理。
- 在解析函数体时，不继承严格模式。
- 代码风格修复。
- 在 Object.assign 中修复错误的起始对象。
- 使用 Undefined.isUndefined()。
- String.prototype[Symbol.iterator].call(undefined) 应抛出错误，因为 undefined 不可强制转换。
- 启用更多测试用例。
- 减少自动装箱以便更好地控制并在可能的情况下避免装箱。
- 将一批方法设为静态。
- 代码清理。
- 使内部类静态化（这也使 SpotBugs 感到满意）。
- 对 Object.setPrototypeOf() 的 arg[0] 进行可强制性检查。
- 修复另一个案例。
- 匹配。
- 搜索。
- 如果正则表达式的 lastIndex 属性是只读的，则抛出异常。