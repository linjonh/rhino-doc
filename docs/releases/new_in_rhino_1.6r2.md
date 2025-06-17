---
title: Rhino 1.6R2
parent: Releases
nav_order: 8
---

# Rhino 1.6R2


发布日期: 2005-09-19

Rhino 1.6R2 是 Rhino 的新维护版本。Rhino 1.6Rx 新增了对 ECMAScript for XML (E4X) 的支持。请参阅 [Rhino 1.6R1 的更新日志](new_in_rhino_1.6r1.md) 了解更多细节。

Rhino 1.6R2 修复的标记问题 ([查询](https://bugzilla.mozilla.org/buglist.cgi?query_format=advanced&short_desc_type=allwordssubstr&short_desc=&product=Rhino%20Graveyard&long_desc_type=substring&long_desc=&bug_file_loc_type=allwordssubstr&bug_file_loc=&status_whiteboard_type=allwordssubstr&status_whiteboard=&keywords_type=allwords&keywords=&resolution=FIXED&emailassigned_to1=1&emailtype1=exact&email1=&emailassigned_to2=1&emailreporter2=1&emailqa_contact2=1&emailtype2=exact&email2=&bugidtype=include&bug_id=&votes=&chfieldfrom=2004-11-29&chfieldto=2005-08-21&chfield=resolution&chfieldvalue=FIXED&cmdtype=doit&order=Reuse+same+sort+as+last+time&field0-0-0=noop&type0-0-0=noop&value0-0-0=))
- [238649](https://bugzilla.mozilla.org/show_bug.cgi?id=238649) 移除 1.5R5 后的过时功能
- [243057](https://bugzilla.mozilla.org/show_bug.cgi?id=243057) 增强功能 - 能够向 Java 函数结果赋值...
- [252122](https://bugzilla.mozilla.org/show_bug.cgi?id=252122) 错误消息的双重扩展
- [255595](https://bugzilla.mozilla.org/show_bug.cgi?id=255595) 用于 Context 创建的工厂类
- [258844](https://bugzilla.mozilla.org/show_bug.cgi?id=258844) 在解释器中增加 Continuation 支持
- [264637](https://bugzilla.mozilla.org/show_bug.cgi?id=264637) InterpretedFunction 的内存占用可更轻
- [271401](https://bugzilla.mozilla.org/show_bug.cgi?id=271401) 使用 ScriptableObject.define 创建超类的 JS 原型
- [274467](https://bugzilla.mozilla.org/show_bug.cgi?id=274467) 在异常中添加 JavaScript 堆栈跟踪
- [274996](https://bugzilla.mozilla.org/show_bug.cgi?id=274996) 堆栈上多个解释器的异常可能导致...
- [277537](https://bugzilla.mozilla.org/show_bug.cgi?id=277537) isXMLName() 应正确实现
- [277935](https://bugzilla.mozilla.org/show_bug.cgi?id=277935) 子项赋值如 "msg..s = something" => ...
- [278701](https://bugzilla.mozilla.org/show_bug.cgi?id=278701) 最小化窗口未指示断点已设置...
- [280047](https://bugzilla.mozilla.org/show_bug.cgi?id=280047) Undefined 未实现 Scriptable
- [280629](https://bugzilla.mozilla.org/show_bug.cgi?id=280629) 在程序内使用调试器时的唯一方式...
- [281067](https://bugzilla.mozilla.org/show_bug.cgi?id=281067) Context 中的 ThreadLocal 防止类卸载
- [281247](https://bugzilla.mozilla.org/show_bug.cgi?id=281247) 通过特殊类实现 JDK 兼容性
- [281537](https://bugzilla.mozilla.org/show_bug.cgi?id=281537) ScriptRuntime.toNumber 对 Undefined 提醒
- [282447](https://bugzilla.mozilla.org/show_bug.cgi?id=282447) 尝试报告错误时尝试转换 null 的 NPE
- [282595](https://bugzilla.mozilla.org/show_bug.cgi?id=282595) BeanProperties 补丁，使其能处理多个 setter
- [286251](https://bugzilla.mozilla.org/show_bug.cgi?id=286251) initFunction 可被调用两次
- [289294](https://bugzilla.mozilla.org/show_bug.cgi?id=289294) 脚本编译时无限循环
- [289603](https://bugzilla.mozilla.org/show_bug.cgi?id=289603) 更新 rhino-n.tests 以消除仅适用于 spidermonkey 的测试
- [290034](https://bugzilla.mozilla.org/show_bug.cgi?id=290034) 无法在 JavaScript 中捕捉原始抛出的异常...
- [291591](https://bugzilla.mozilla.org/show_bug.cgi?id=291591) Rhino 与 spidermonkey 行为不同...
- [292324](https://bugzilla.mozilla.org/show_bug.cgi?id=292324) 编译脚本时出现 ArrayIndexOutOfBoundsException
- [298786](https://bugzilla.mozilla.org/show_bug.cgi?id=298786) 使用优化编译时循环无限
- [299539](https://bugzilla.mozilla.org/show_bug.cgi?id=299539) 函数赋值中的错误字节码
- [299613](https://bugzilla.mozilla.org/show_bug.cgi?id=299613) 运行时支持函数结果作为左值
- [302501](https://bugzilla.mozilla.org/show_bug.cgi?id=302501) constructor 属性不应为只读
- [303572](https://bugzilla.mozilla.org/show_bug.cgi?id=303572) 需要访问重新抛出的错误中的 RhinoException
- [305323](https://bugzilla.mozilla.org/show_bug.cgi?id=305323) Rhino 未能选择适当的重载方法
- [305753](https://bugzilla.mozilla.org/show_bug.cgi?id=305753) 使用 NativeJavaMethod 对象时其 parent 错误
- [306258](https://bugzilla.mozilla.org/show_bug.cgi?id=306258) 在 JDK 1.5 下无法使用 Ant 脚本编译
- [306268](https://bugzilla.mozilla.org/show_bug.cgi?id=306268) E4X 点查询的反编译功能有问题
- [306308](https://bugzilla.mozilla.org/show_bug.cgi?id=306308) JS 函数作为 Java 接口通过 reflect.Proxy
- [306419](https://bugzilla.mozilla.org/show_bug.cgi?id=306419) 为 Serializable 添加 serialVersionUID
- [306584](https://bugzilla.mozilla.org/show_bug.cgi?id=306584) 解析 .jsp 页面时使用 JavaScript 出现崩溃
- [303460](https://bugzilla.mozilla.org/show_bug.cgi?id=303460) 增强 Rhino 的 shell 以执行编译脚本 .class 文件...
- [306825](https://bugzilla.mozilla.org/show_bug.cgi?id=306825) 允许在 servlets 中使用 shell.Global
- [309029](https://bugzilla.mozilla.org/show_bug.cgi?id=309029) 评估递归函数时出现异常