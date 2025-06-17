---
title: Rhino 1.7.11
parent: Releases
nav_order: 24
---

# Rhino 1.7.11


此版本包括实现了一些缺失的JavaScript语言功能，包括：
- 提升解析器及其关联的AST的准确性和可靠性。
- Map、Set、WeakMap 和 WeakSet 类。
- 更多数组功能，包括 from、of、fill、keys、values、entries 以及 copyWithin。
- 更多的数学方法。
- 更多的对象功能，包括 seal 和 freeze。
- 以下展示的许多其他错误修复。

总体来说，Rhino 的新功能和变更理念是遵循 ECMAScript 规范，但当向后兼容性可能被破坏时，会使用 Context 类上的“语言版本”。

例如，在旧版本的 Rhino 中，Array.prototype.concat 函数会将任何具有与 Array 相同构造函数的输入值视为“可展开”的。ECMAScript 现在明确规定，只有存在“isConcatSpreadable”符号时才会发生这种情况。在此版本中，当语言级别至少为“ES6”级别（Context.VERSION_ES6 或 200）时，旧行为会被禁用。

开发者如果将语言级别设置为 CONTEXT.VERSION_ES6，或者使用命令行工具的“-version 200”标志，会更适合开发新代码。

未来的版本将更改命令行工具的默认语言版本。

此版本包含了来自15位开发者的贡献，感谢你们的辛勤工作！

Attila Szegedi (7):
- 改善 MemberBox [#438](https://github.com/mozilla/rhino/issues/438)
- Labmdify 使用 ContextAction
- 使 ContextAction 泛型。
- 比较延续实现的 API。
- 对象图的结构相等性比较算法。
- 使用结构相等性作为 Interpreter.CallFrame 的相等算法，该算法作为 NativeContinuation 的实现。
- 添加针对 [#437](https://github.com/mozilla/rhino/issues/437) 和 [#449](https://github.com/mozilla/rhino/issues/449) 的解决方案。

Dimitar Nestorov (1):
- 更新 README.md

Dirk Hogan (1):
- 431 如果文件系统没有变化，则更新缓存的 commonjs 实体的过期时间。

Gregory Brail (18):
- 为下一次迭代做好准备。
- 支持替换原生对象的原型函数。
- 修复 \_\_defineGetter\_\_ 中的 NullPointerException。
- 修复标准对象在原型中带有 Symbols 的问题。
- 实现 ES6 的内置 Set 和 Map 类。
- 添加 WeakMap 和 WeakSet。
- 为 Gradle 测试升级最大堆大小至 1 GB。
- 原生数组的测试用例和小修复。
- 实现 @@isConcatSpreadable 并使 Java 数组可以展开。
- @@isConcatSpreadable 的代码审查评论。
- 使“排序”助手类成为适当的单例。
- 撤消最近对 Scriptable 接口的添加。
- 更新 Gradle 包装器版本。
- 修复假设 Context 可用的标志测试。
- 修复解析器中缺少分号警告的问题。
- 修复最近引入到 MemberBox 的回归问题。
- 更多 Array.prototype.concat 的兼容性修复。
- 处理 Array.of，from 和 copyWithin。
- 修复解析回归问题。

Igor Kuzmanenko (2):
- 修复 XmlMemberGet 的 toSource 实现 [#483](https://github.com/mozilla/rhino/issues/483)
- 修复 ParenthesizedExpression 节点的定位 [#129](https://github.com/mozilla/rhino/issues/129)

Markus Sunela (1):
- 添加手动 OSGi 清单

Mozilla-GitHub-Standards (1):
- 添加 Mozilla 行为准则文件

Nedelcho Delchev (1):
- 更新 README.md

RBRi (2):
- 针对类型化数组支持的修复/增强 [#436](https://github.com/mozilla/rhino/issues/436)
- 数组修复 [#467](https://github.com/mozilla/rhino/issues/467)
- 修复所有的 javadoc 错误和所有的 javadoc html 警告。
- 方法 Global#version(xxx) 是否更新版本时返回新的版本标识符。
- 增加错误信息的更多信息。
- 使用正确的函数名，如果可用。
- 两个来自 HtmlUnit 的代码的小改进：窗口列表已排序，添加“跳至行”的命令。
- 如果没有文件窗口可用则避免 npe。
- 改进灵活子类化的设计。
- 移除重复检查。
- 修复 isSymbol 检测，不再检测原型为 symbol。
- 我们已经通过了更多 262 测试 - 我认为我们必须使用尽可能多的测试来测试质量。
- 以及更多更新；现在我们有 51093。
- 使用尽可能多的 Test262 测试来验证我们的质量。
- 实现缺失的数学函数。
- 禁用一些慢速的测试。
- 支持 `arguments` 对象作为 TypedArray 构造函数参数，这与 [#297](https://github.com/mozilla/rhino/issues/297) 相同，但包括一个简单的测试。
- 修复问题 437。
- 使用系统行分隔符进行代码生成。
- 移除 437 的解决方案。
- 修复 [#449](https://github.com/mozilla/rhino/issues/449) 并移除 EqualObjectGraphs 中的解决方案。
- 添加 @Override 和一些清理。
- 修复日期参数调用的构造函数。
- valueOf 必须在没有任何参数的情况下调用。
- 修复剩余的 utc 构造函数案例。
- 小清理。
- 修复使用 null 调用的本地数组构造函数，以及 setter 使用 null 的情况。
- 根据 Eclipse Photon 建议进行代码清理。
- 添加更多委托方法到 MemberBox；使用被代理方法的名称为所有委托方法命名。
- 避免整个代码库中使用通配符导入。
- 如果字节码生成失败则回退到解释器。
- 修复 NativeMap、NativeSet、NativeWeakMap 和 NativeWeakSet 的序列化。
- 严格模式下 scope 只会是未定义；修复地图的特殊空条目。
- 更多的配置清理 - 使用文件排除；再次启用一堆已经运行的测试。
- 另一个 VMBridge 清理步骤（JDK 1.8 目前是最低要求）。
- 另一个地图修复。
- 更详细的测试黑客，转储已经通过的测试，排除更多类型化测试，更多测试已通过。
- 下一次尝试使 travis 构建通过。
- array.fill。
- array.keys, array.entries, array.values。
- 修复 DataView 的问题，包括启用更多测试案例。
- 修复 ES6 的 freeze/preventExtensions/seal/isFrozen/isExtensible/isSealed。
- 添加 padStart 和 padEnd。
- 使 serialVersionUID 为私有。
- 使测试在我的机器上通过（包括 Eclipse 内）。
- 修复 null/undefined 处理，添加第一个数组 includes 实现。
- 修复一些数组长度处理边界案例。
- NativeArray 清理，为 Test262SuiteTest 提供更多错误输出。
- 修复 [#531](https://github.com/mozilla/rhino/issues/531) - 使用 symbol 作为数组索引导致类强制转换异常。
- 更新 Jacoco 版本。
- 函数对 WeakMap/WeakSet 是有效键。
- 使用 valueOf。
- 清理 vm bridge；由于我们已使用 Java 8，检查迭代器可用性不再必要。
- 清理成员；我们使用 executable 类型代替 member。
- 修复未使用的导入。
- 另一个 JDK 检查不再必要。
- 修复构建问题。
- 添加（修改后）来自 [#135](https://github.com/mozilla/rhino/issues/135) 的测试案例。
- copyWithin 的第一个简单版本。
- 数组.of 实现的第一个版本。

Raphaël Jakse (1):
- 测试函数的 arity 和 length 属性。

Ravi Kishore (1):
- 在解析后保留注释及其在实际代码中的位置。[#465](https://github.com/mozilla/rhino/issues/465)

Stijn Kliemesch (1):
- 为 [#510](https://github.com/mozilla/rhino/issues/510) 添加测试案例。

Sébastien Doeraene (2):
- 修复 [#448](https://github.com/mozilla/rhino/issues/448)：正确封装 Math.imul 的结果为 Int32。
- 修复 TypedArray 的转换问题。

Travis Haagen (2):
- 修复导致已修改的 JavaScript 文件永远不会重新加载的错误。
- 创建了 UrlModuleSourceProviderTest。

nabice (2):
- 修复 [#533](https://github.com/mozilla/rhino/issues/533) AstNode.setParent 导致的位置错误。
- 为 [#533](https://github.com/mozilla/rhino/issues/533) 添加测试。

raphj (1):
- 重写 getArity。

stijnkliemesch (1):
- 修复 Parser.throwStatement()