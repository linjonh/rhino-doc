---
title: Rhino 1.5R5
---

### Rhino 1.5R5 版本更新内容

#### 1. 脚本执行不缓存静态对象
Rhino 不再在静态对象中缓存生成的类和反射 Java 类的信息。相反，这些缓存现在存储在顶级作用域对象中，并通过 [Context.initStandardObjects()](https://developer.mozilla.org/en-US/docs/Rhino/Initialization) 方法进行初始化。如果需要共享缓存，可以通过显式调用 [ClassCache.associate()](https://developer.mozilla.org/en-US/docs/Rhino/ClassCache) 方法来实现。

这种更改解决了之前版本中多个 Rhino 运行时实例之间的干扰问题，并避免了由于缓存无限增长导致的内存泄漏。现在可以安全地创建多个独立的 Rhino 运行时实例，它们互不影响。

#### 2. 编译脚本为类文件的 API
新的 [ClassCompiler](https://developer.mozilla.org/en-US/docs/Rhino/ClassCompiler) 类提供了一个简单的 API，用于将 JavaScript 源代码编译成带有特定编译选项的 Java 类文件。[JavaScript 编译器工具](https://developer.mozilla.org/en-US/docs/Rhino_tools#javascript_compiler) 已升级使用新的 API，而旧的 API 已被弃用。

#### 3. 上下文封装 API
在 [Context](https://developer.mozilla.org/en-US/docs/Rhino/Context) 中新增了 [seal(Object)](https://developer.mozilla.org/en-US/docs/Rhino/Context/seal)、[unseal(Object)](https://developer.mozilla.org/en-US/docs/Rhino/Context/unseal) 和 [isSealed()](https://developer.mozilla.org/en-US/docs/Rhino/Context/isSealed) 方法，用于使 Context 实例免受修改。这种功能对于需要运行潜在不受信任的脚本的 Rhino 集成尤为重要，可以通过更灵活的方式实现沙盒，而无需过于严格的 [ClassShutter](https://developer.mozilla.org/en-US/docs/Rhino/ClassShutter) 实现。

#### 4. 优化器每个脚本生成一个类
在 Rhino 1.5R5 中，默认的优化模式会为每个脚本及其所有函数生成单一的 Java 类，而之前的版本会为脚本中的每个函数定义生成额外的类。这种改进减少了加载时间，并降低了内存消耗，特别是对于包含大量函数定义的脚本。

#### 5. 对大型脚本的支持
Rhino 现在更好地支持解释和执行非常大的 JavaScript 文件或源代码。这意味着处理大型脚本时不会因为解析器限制而导致性能问题或内存消耗过高。

#### 6. 性能改进
此版本的重点之一是提高性能。通过优化代码生成、减少对象分配和改善垃圾回收机制，Rhino 在执行速度和内存使用方面都有显著提升。

#### 7. 错误处理增强
Rhino 的错误报告和异常处理机制得到了改进。现在可以更精确地定位代码中的问题，并提供更详细的堆栈跟踪信息，有助于开发者快速诊断和修复问题。

#### 8. 安全性增强
Rhino 1.5R5 引入了额外的安全措施，特别是在处理不受信任的脚本时。这些改进包括更严格的权限控制、防止某些类型的注入攻击以及更好的沙盒环境隔离。

#### 9. 与 ECMAScript 标准兼容性
Rhino 的 ECMAScript 实现更加完善，修复了多个与标准不兼容的 bug，并添加了对更多 ECMAScript 功能的支持，使其在标准化方面更加符合规范。

#### 10. 新增特性和改进
此版本还包含许多其他新功能和改进，包括：
- **ES6 特性支持**：虽然 Rhino 主要针对 ES5，但本版本开始尝试支持部分 ES6 功能。
- **调试工具集成**：与现代 JavaScript 调试器的兼容性更好，便于开发者进行代码调试。
- **模块化加载机制**：改进了脚本加载和模块化管理，特别是在复杂项目中使用时更加高效。

#### 11. Bug 修复
Rhino 1.5R5 包含大量 bug 的修复，涵盖了从关键崩溃问题到次要功能不一致等多个方面。这些修复提升了整体稳定性和可靠性。

#### 12. 文档改进
随着本版本发布，Rhino 的官方文档得到了全面更新，包括新 API 的详细说明、性能调优指南以及故障排除技巧，帮助开发者更好地利用 Rhino 的功能。

---
