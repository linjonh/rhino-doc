---
title: Rhino 1.7R5
parent: Releases
nav_order: 18
---

# Rhino 1.7R5


---
此版本包含了一些在主分支中存在已久的修复——请参阅下面的发布说明。

下一个版本将是 1.8.0，并将包含许多现有的拉取请求。

André Bargull (24):
- 为 DefineClassMapInheritance.java 添加缺失的许可头文件
- 删除编码错误的 UTF-8 替代字符（EF BF BD）
- 添加缺失条目
- [Bug 772011](https://bugzilla.mozilla.org/show_bug.cgi?id=772011) 反编译器没有为带标签的语句添加大括号
- [Bug 772833](https://bugzilla.mozilla.org/show_bug.cgi?id=772833) 从 frontend/Parser.cpp 的 Parser::condExpr1 中复制的评论
- [Bug 686806](https://bugzilla.mozilla.org/show_bug.cgi?id=686806)：
  - 根据 JSON 规范，不允许在对象/数组文字中使用尾逗号
  - 避免使用 Integer.parseInt() 解析 Unicode 转义序列，因为 parseInt() 同样接受非 ASCII 数字
  - 同样在 readNumber() 中避免使用 Character.isDigit()，原因相同
  - readString() 总是创建一个 StringBuilder 实例来收集输入数据，实际上只有当输入内容包含转义字符时才是必要的。因此我将 readString() 更改为采用 jsonparser.cpp 中的相同方法
  - JSON 数字规范比 Double.parseDouble() 更严格，例如 Double.parseDouble() 接受输入字符串 '10.'。为了确保只有有效的 JSON 数字文字传递给 Double.parseDouble()，已对 readNumber() 进行了重构以执行必要的输入验证。
- [Bug 774083](https://bugzilla.mozilla.org/show_bug.cgi?id=774083)
- [Bug 688023](https://bugzilla.mozilla.org/show_bug.cgi?id=688023)
- 修复依赖于旧的（且错误的）toSource() 输出的测试用例
- [Bug 685403](https://bugzilla.mozilla.org/show_bug.cgi?id=685403)
- [Bug 637811](https://bugzilla.mozilla.org/show_bug.cgi?id=637811)
- [Bug 773573](https://bugzilla.mozilla.org/show_bug.cgi?id=773573) 在关闭括号后搜索第一个大括号，以考虑对象解构参数
- 简单的 [Bug 773573](https://bugzilla.mozilla.org/show_bug.cgi?id=773573) 的 doctest
- Array.prototype.sort 未经过检查将 long 转换为 int，没有任何溢出检查，这可能会导致负长度，然后在 Java 中抛出 NegativeArraySizeException，例如 js1_5/Array/regress-157652.js。一个类似的问题也在 NativeJSON 中发现，因此我也处理了它
- 添加显式转换为 int，以确保保持之前的行为
- 调用不能同时是特殊调用和引用调用，请参阅 js1_5/Regress/regress-319391.js 的测试用例
- 为 MozillaSuiteTest 启用 js1_5/Regress/regress-319391.js
- [Bug ](https://bugzilla.mozilla.org/show_bug.cgi?id=)针对 Bug 728286 的补丁
- 添加测试用例
- [Bug 778549](https://bugzilla.mozilla.org/show_bug.cgi?id=778549)
- 在处理 RegExp 字符类模式时添加缺失的溢出检测
- [Bug 780147](https://bugzilla.mozilla.org/show_bug.cgi?id=780147)
- [Bug 608235](https://bugzilla.mozilla.org/show_bug.cgi?id=608235) undefined[undefined] 的错误消息不正确
- [Bug 784358](https://bugzilla.mozilla.org/show_bug.cgi?id=784358) 在 eval() 中定义 const 变量会抛出重新声明错误

Evgeny Shepelyuk (1):
- 修复 xmlbeans URL

Gregory Brail (10):
- 添加基于 JUnit 的基准测试，我们可以在 Jenkins 中自动化这些测试。
- 将压缩的测试提取到一个目录并以这种方式检查。
- 提取以前位于 testsrc/tests.tar.gz 中的内容。
- 为 EMMA 覆盖率报告添加 XML 输出。
- 修复字符编码测试以便在 Mac 上工作。
- 为基准测试添加可以与 Jenkins “Measurement Plots” 插件配合使用的输出。这取代了以前的“SunSpider”和“V8”基准测试的输出。
- 为 Maven 部署添加文件。
- 更新 README。
- 更新 README 以包含其他测试。
- 修复 E4X 测试 13.4.4.24，由于 Java 8 中 HashMap 的迭代顺序不同导致测试失败。

Hannes Wallnoefer (8):
- 在 BaseFunction.toSource() 中解包 Synchronizer。
- 在 NativeArray 中重写 ScriptableObject.isEmpty。
- 减少并发类缓存 HashMap 的并发级别/内存占用。
- 对未处理的 JavaAdapter 方法返回 null。
- 使 JavaAdapter 能够与抽象基类和受保护构造函数配合使用。
- 将构建版本更改为 1_7R5pre。
- 将创建 Java 异常的 JS错误代码提取到单独的 ScriptRuntime 方法中。
- 减少 ShellConsole JLine 支持类中的调用魔术。

Kyle Cronin (2):
- [Bug 827538](https://bugzilla.mozilla.org/show_bug.cgi?id=827538)
- [Bug 738388](https://bugzilla.mozilla.org/show_bug.cgi?id=738388)
