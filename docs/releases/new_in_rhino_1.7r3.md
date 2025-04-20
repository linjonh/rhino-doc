---
title: Rhino 1.7R3
parent: Releases
nav_order: 16
---

# Rhino 1.7R3

---
### 对ECMAScript 5的支持

在Google Summer of Code项目中，Raphael Speyer在Norris Boyd的指导下为Rhino添加了对ECMAScript 5的支持。Rhino 1.7R3支持大部分ES5功能，但不包括严格模式。

### JavaScript 1.8支持

Rhino 1.7R3部分支持[JavaScript 1.8](https://web.archive.org/web/20210502042346mp_/https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/1.8)，由Hannes Wallnöfer和Andreas Bolka贡献。这包括表达式闭包和解构赋值缩写，但不包括生成器表达式。

注意，JavaScript 1.8功能需要在shell中显式启用，方法是选择语言版本`180`，或在嵌入模式下使用`Context.VERSION_1_8`。

### 新的AST API

Steve Yegge为Rhino贡献了一个新的AST API，这对于构建特定于JavaScript的工具的人来说非常有用。AST类位于`org.mozilla.javascript.ast`包中。

### CommonJS模块支持

Attila Szegedi贡献了一个完全符合[CommonJS模块规范](http://wiki.commonjs.org/wiki/Modules/1.1.1)的实现。CommonJS模块在Rhino shell中也可用，使用命令行选项`-modules`、`-main`和`-sandbox`。

### JS对象实现Java集合

JavaScript对象现在实现了`java.util.Map`接口，而数组实现了`java.util.List`接口。这意味着JavaScript对象可以无缝地传递给期望Map的Java方法，而数组可以传递给期望List或`java.util.Collection`的方法。

### JSDoc注释解析

Rhino解析器现在能够识别类似JSDoc的注释（以`/**`开头）。此功能默认禁用，需要在`CompilerEnviron`对象中设置相应标志来启用。

### 性能改进

自上一版本以来，Rhino在性能方面有了些改进，特别是在运行基准测试或测试套件时最为明显。

---

