---
title: Rhino 1.7.9
parent: Releases
nav_order: 22
---

# Rhino 1.7.9


本次发布修复了在1.7.8版本中引入的一个[潜在的ArrayIndexOutOfBoundsException](https://github.com/mozilla/rhino/issues/390)。由于该问题可能较为严重，当前使用1.7.8版本的项目应切换到此新版本。


此外：

## [#398](https://github.com/mozilla/rhino/pull/398)
Context新增了一个名为“FEATURE_INTEGER_WITHOUT_DECIMAL_PLACE”的标志。如果启用，Rhino将更努力地以整数形式而非浮点形式显示数字。此功能目前默认关闭，但如果用户反馈积极，将考虑在未来启用它。

## [#383](https://github.com/mozilla/rhino/pull/383)
在“ES6”及更高级别的语言级别下，ToNumber转换现在更符合规范。（对于较低语言级别，此更改被禁用以防止向后兼容性问题。）

## 最后，还包括一些其他修复。

感谢所有通过提交问题和代码做出贡献的人！

Attila Szegedi:
- 修复了一个JavaDoc警告

Ivan Vyshnevskyi:
- 使ToNumber(String)转换更加符合规范
- 为解构赋值中的默认值报告解析错误

Michael[tm] Smith:
- 增加addError(String messageId, int c)方法
- 添加“非法字符”测试到ParserTest
- 在“标识符是保留词”错误中显示单词
- 添加“标识符是保留词”测试

Oleksandr Maksymenko:
- 修改以将整数对象作为整数处理，将长整型作为长整型处理，而非作为双精度

RBRi:
- 清理代码并尝试提高运行效率 [#373](https://github.com/mozilla/rhino/issues/373)

jhertel:
- 修正：Compatability → Compatibility