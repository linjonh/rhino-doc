---
title: Rhino 1.7R3
parent: Releases
nav_order: 16
---

# Rhino 1.7R3


### ECMAScript 5 支持

ECMAScript 5 支持已通过 Raphael Speyer 在 Google 夏季代码项目中的努力添加到 Rhino，项目由 Norris Boyd 进行指导。Rhino 1.7R3 支持大部分 ES5 功能，但不支持严格模式。

### JavaScript 1.8 支持

Rhino 1.7R3 提供了部分 [JavaScript 1.8](https://web.archive.org/web/20210502042346mp_/https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/1.8) 的支持，由 Hannes Wallnöfer 和 Andreas Bolka 实现。这包括表达式闭包和解构赋值简写，但不包括生成器表达式。

需要注意的是，JavaScript 1.8 的功能需要通过在命令行选择语言版本 `180` 或嵌入模式下选择 `Context.VERSION_1_8` 来显式启用。

### 新的 AST API

Steve Yegge 为 Rhino 提出了新的 AST API，它对构建 JavaScript 专用工具的人来说应该是有用的。AST 类位于 `org.mozilla.javascript.ast` 包中。

### CommonJS 模块支持

完全遵循 [CommonJS模块实现](http://wiki.commonjs.org/wiki/Modules/1.1.1) 的支持由 Attila Szegedi 提供。在 Rhino 的命令行中可通过 `-modules`、`-main` 和 `-sandbox` 选项启用 CommonJS 模块。

### JS 对象实现 Java 集合

JavaScript 对象现在实现了 `java.util.Map` 接口，而数组则实现了 `java.util.List` 接口。这意味着 JavaScript 对象可以无缝地传递给需要 Map 的 Java 方法，而数组可以传递给需要 List 或 java.util.Collection 的方法。

### JSDoc 注释解析

Rhino 解析器现在能够识别类似 JSDoc 的注释（以 `/**` 开头）。此功能默认禁用，需要通过在 `CompilerEnviron` 对象中设置相应标志来启用。

### 性能改进

自上次发布以来，Rhino 已进行了性能改进，尤其是在运行基准测试或测试套件时表现尤为明显。