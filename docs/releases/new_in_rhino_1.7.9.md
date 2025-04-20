---
title: Rhino 1.7.9
parent: 发布版本
nav_order: 22
---

# Rhino 1.7.9

---

此版本修复了一个在1.7.8中引入的潜在[ArrayIndexOutOfBoundsException](https://github.com/mozilla/rhino/issues/390)问题。由于这个问题可能非常严重，目前使用1.7.8的项目应该切换到此新版本。

除此之外：

## [#398](https://github.com/mozilla/rhino/pull/398)
Context上有一个新的标志叫做"FEATURE_INTEGER_WITHOUT_DECIMAL_PLACE"。如果设置了这个标志，Rhino将更努力地以整数形式而不是浮点形式显示数字。此功能目前默认处于禁用状态，但如果其受欢迎程度较高，我们可以考虑在未来启用它。

## [#383](https://github.com/mozilla/rhino/pull/383)
在"ES6"及以上语言级别下，ToNumber转换现在更符合规范。（此变更对旧的语言级别禁用，以防止向后兼容性问题。）

## 最后，还有一些其他修复。

感谢所有贡献者，无论是通过问题还是代码！

Attila Szegedi:
- 修复了一个JavaDoc警告

Ivan Vyshnevskyi:
- 使ToNumber(String)转换更符合规范
- 报告解构赋值中默认值的解析错误

Michael[tm] Smith:
- 添加addError(String messageId, int c)方法
- 在ParserTest中添加“非法字符”测试
- 在“标识符是保留字”错误中显示单词
- 添加“标识符是保留字”测试

Oleksandr Maksymenko:
- 更改为将整数对象处理为整数和长整型，而不是双精度型

RBRi:
- 清理代码并尝试使其更快 [#373](https://github.com/mozilla/rhino/issues/373)

jhertel:
- 更正：Compatability → Compatibility