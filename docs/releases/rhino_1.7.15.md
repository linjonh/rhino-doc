---
title: Rhino 1.7.15
---

## Rhino 1.7.15 版本更新日志

### 新功能和改进
- 更新了对 ES6 方法 `Symbol.species` 的实现（部分实现）。（@andreabergia，PR #1448）
- 为 typed arrays 添加了 species 支持。（@rbri，PR #1454）
- 优化了上下文关闭操作 (`Context#close()`) 的性能。（@rbri，PR #1460）
- 修复了生成器的 `toString()` 方法实现问题。（@0xe，PR #1462）
- 修复了正则表达式执行循环中的中断问题（#1189）。（@blutorange，PR #1440）
- 初始实现了函数的剩余参数支持。（@rbri，PR #1451）

### 缩减和改进
- 改善了对 Unicode 字符在词法分析器中的处理。（@andreabergia，PR #1464）
- 修复了 `Math.atanh` 函数的问题。（@andreabergia，PR #1438）
- 优化了 Promise 的拒绝处理程序，在 `.then` 之后保留处理功能。（@andreabergia，PR #1469）

### 错误修复
- 修复了 `SpecialRef` 对 `Symbol.__proto__` 赋值返回未定义的问题。（@rbri，PR #1457）
- 修复了 `BigIntLiteral.toSource()` 中的后缀问题。（@JohnCokerC3，PR #1432）
- 修复了 `clz32` 的舍入错误。（@rbri，PR #1430）

### 内部改进
- 添加了一些 `@Override` 注解和尝试资源释放块（try-with-resources）。（@rbri，PR #1449）
- 优化了上下文关闭操作 (`Context#close()`) 的性能。（@rbri，PR #1460）

### 新贡献者
以下开发者首次为 Rhino 项目做出了贡献：
- @grob：在 PR #1090 中首次贡献
- @makusuko：在 PR #1163 中首次贡献
- @zloirock：在 PR #1214 中首次贡献
- @Schmidor：在 PR #1211 中首次贡献
- @shelches：在 PR #1210 中首次贡献
- @midgleyc：在 PR #1233 中首次贡献
- @naijun0403：在 PR #1252 中首次贡献
- @wimjongman：在 PR #1266 中首次贡献
- @diogoteles08：在 PR #1311 中首次贡献
- @andreabergia：在 PR #1448 中首次贡献
- @0xe：在 PR #1462 中首次贡献

---

以上是 Rhino 1.7.15 版本的主要更新内容。如需了解更详细的变更记录，可访问 [GitHub 上的完整变更日志](https://github.com/mozilla/rhino/compare/Rhino1_7_14_Release...Rhino1_7_15_Release)。