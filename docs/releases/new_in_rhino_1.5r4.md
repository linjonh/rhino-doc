---
title: Rhino 1.5R4
parent: Releases
has_children: true
nav_order: 4
---

# Rhino 1.5R4


---
以下是 Rhino 1.5R3 发布后的变更日志。

## Rhino 调试 API 改变
一个新的、不兼容的 Rhino 调试 API 提供了监控脚本函数进入/退出的选项，同时减少了在 Rhino 核心中实现 API 的代码量。详细信息请参见[这里](1.5r4_debug_api_changes.md)。使用新 API，[Rhino 调试器](../tools/debugger.md) 提供了在函数进入/退出时中断的选项，可以调试通过 eval 和 Function 构造定义的脚本以及调试器启动前加载的脚本。

## 引入 WrapFactory，弃用 WrapHandler
由于 WrapHandler 接口的设计缺陷（从 JavaScript 调用 Java 构造函数将导致调用包装结果，然后将其强制转换为 Scriptable），此接口被弃用，并引入了一个新的类 WrapFactory，其中包含一个新的方法，可在调用构造函数结果时调用，必要时可由应用程序自定义。
此外，WrapFactory 具有新的 `setJavaPrimitiveWrap` 方法，该方法可以控制 Java `String` 和 `Number` 类的实例是否需要像其他 Java 对象一样被包装为特殊脚本对象，使脚本可以访问 `String` 和 `Number` 的任何方法，或者将其转换为 JavaScript 原始字符串和数字。

## 新的安全接口
Igor Bukanov 提供了一个新的安全实现，可以与 Java2 安全模型集成，并防止脚本通过 eval/Function 方案逃离安全沙箱。

由于这些变化，SecuritySupport 接口被 ClassShutter 和 SecurityController 替换，其中 ClassShutter 控制哪些类通过 LiveConnect 对脚本可见，而 SecurityController 提供权限管理。为了兼容，SecuritySupport 仍然可用作为弃用接口，但仅其 visibleToScripts 方法作为 ClassShutter.visibleToScripts 的别名被使用。有关新类的详细信息，请参阅 API 文档。

Rhino shell 提供了一个基于 java 策略设置实现的 SecurityController，用于根据脚本 URL 限制权限。详情请参阅 [JavaPolicySecurity](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/tools/shell/JavaPolicySecurity.html) 的源码。要激活它，在调用 Rhino shell 时，设置 `rhino.use_java_policy_security` 系统属性为 true，同时安装安全管理器。

## 序列化变更
由于 Rhino 实现的变化和在序列化支持中的错误修复，Rhino 1.5 Release 3 中序列化的运行时数据无法在 Release 4 中反序列化。

## 正则表达式改进
Roger Lawrence 提供了一个新的正则表达式实现，它完全符合 EcmaScript 262 标准，并且更加快捷。

## 脚本化任何类加载器中的类
Christopher Oliver 提供代码支持使用 `Packages` 对象作为构造函数并接受类加载器参数，使脚本可以访问由此类加载器定义的类。例如，要访问当前目录下的 foo.jar 文件中的类，可以使用以下代码：
```js
// 创建类加载器
var loader = new java.net.URLClassLoader([new java.net.URL("file:./foo.jar")]);
// 创建它的 LiveConnect 包装对象
var fooJar = new Packages(loader);
// 从 foo.jar 创建一个类 Foo 的实例
var obj = new fooJar.Foo(1, 2, 3);
obj.someMethod();
```

## Shell 函数运行外部进程
新增一个 `runCommand` 函数到 [Rhino Shell](../tools/shell.md)，用来运行外部进程。详情请参阅 [runCommand](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/tools/shell/Global.html#runCommand-org.mozilla.javascript.Context-org.mozilla.javascript.Scriptable-java.lang.Object:A-org.mozilla.javascript.Function-)。

## 解决的 Bugzilla 问题报告
以下是 Rhino 1.5 Release 4 中解决的 Bugzilla 问题报告。
- [61579](http://bugzilla.mozilla.org/show_bug.cgi?id=61579) context.decompileScript 无法工作。
- [72021](http://bugzilla.mozilla.org/show_bug.cgi?id=72021) ScriptRuntime 类试图将 String 值也转换为 JavaNativeObject。
- [83051](http://bugzilla.mozilla.org/show_bug.cgi?id=83051) 在 with 块中定义的函数不能在块外调用。
- [104089](http://bugzilla.mozilla.org/show_bug.cgi?id=104089) 由于 Context 类中的一个错误，无法将上下文重新附加到其线程。
- [105438](http://bugzilla.mozilla.org/show_bug.cgi?id=105438) JavaScript 文件中的语法错误未显示 SourceName 和行号。
- [106548](http://bugzilla.mozilla.org/show_bug.cgi?id=106548) /^.*?$/ 无法匹配任何内容。
- [114583](http://bugzilla.mozilla.org/show_bug.cgi?id=114583) 脚本编译/反编译错误。
- [114969](http://bugzilla.mozilla.org/show_bug.cgi?id=114969) [], [^] 是有效的正则表达式条件。
- [115717](http://bugzilla.mozilla.org/show_bug.cgi?id=115717) java.lang.ArrayIndexOutOfBoundsException 在 with/try/finally 中。
- [120194](http://bugzilla.mozilla.org/show_bug.cgi?id=120194) JS toInt32(x) 转换不符合 ECMAScript 定义。
- [122167](http://bugzilla.mozilla.org/show_bug.cgi?id=122167) string.replace() 的占位符 '$1' 无效。
- [123439](http://bugzilla.mozilla.org/show_bug.cgi?id=123439) 反向引用 /(a)? etc./ 未使用时必须保持 `undefined`。
- [124508](http://bugzilla.mozilla.org/show_bug.cgi?id=124508) regexp.lastIndex 应该为整数值的 double 类型，而不是 uint32。
- [124900](http://bugzilla.mozilla.org/show_bug.cgi?id=124900) 参数对象存储重复的参数值。
- [125562](http://bugzilla.mozilla.org/show_bug.cgi?id=125562) 正则表达式性能改进。
- [126317](http://bugzilla.mozilla.org/show_bug.cgi?id=126317) 在 re.exec(str) 中的 re.lastIndex 设置为某些值时崩溃。
- [126722](http://bugzilla.mozilla.org/show_bug.cgi?id=126722) (undefined === null) 在 Rhino 编译模式中评估为 true。
- [128468](http://bugzilla.mozilla.org/show_bug.cgi?id=128468) java.io.NotSerializableException: org.mozilla.javascript.NativeError。
- [129365](http://bugzilla.mozilla.org/show_bug.cgi?id=129365) dtoa.java 中的许可问题。
- [132217](http://bugzilla.mozilla.org/show_bug.cgi?id=132217) 应该删除全局函数的 delete 操作不起作用。
- [136893](http://bugzilla.mozilla.org/show_bug.cgi?id=136893) Rhino 对 `for(i in undefined)` 和 `for(i in null)` 的处理。
- [137181](http://bugzilla.mozilla.org/show_bug.cgi?id=137181) arguments[i] 上的 delete 操作不起作用。
- [145791](http://bugzilla.mozilla.org/show_bug.cgi?id=145791) ECMA 合规性：Function.prototype.apply() 和 Function.prototype.call()。
- [149285](http://bugzilla.mozilla.org/show_bug.cgi?id=149285) 编译器未报告语法错误所在的正确行号：无效的赋值左侧。
- [151337](http://bugzilla.mozilla.org/show_bug.cgi?id=151337) EcmaError.getLineSource() 返回 0x0 字符。
- [153223](http://bugzilla.mozilla.org/show_bug.cgi?id=153223) Rhino 中的新正则表达式引擎。
- [154693](http://bugzilla.mozilla.org/show_bug.cgi?id=154693) 解释模式不理解不同对象上的不同函数。
- [156510](http://bugzilla.mozilla.org/show_bug.cgi?id=156510) for (i in undefined) {} 不应该抛出 TypeError。
- [157196](http://bugzilla.mozilla.org/show_bug.cgi?id=157196) ScriptableObject 需要自定义序列化实现。
- [157509](http://bugzilla.mozilla.org/show_bug.cgi?id=157509) 在标识符中无效使用 \ 的情况下没有错误。
- [158159](http://bugzilla.mozilla.org/show_bug.cgi?id=158159) Rhino 是否应该支持正则表达式中的八进制转义序列？
- [159334](http://bugzilla.mozilla.org/show_bug.cgi?id=159334) 因为一个 bug 导致 JavaScript 函数限制了大小。
- [164947](http://bugzilla.mozilla.org/show_bug.cgi?id=164947) Debugging unique.js 产生栈跟踪和不稳定结果。
- [166530](http://bugzilla.mozilla.org/show_bug.cgi?id=166530) FunctionObject 静态初始化器中的 ClassCostException。
- [169830](http://bugzilla.mozilla.org/show_bug.cgi?id=169830) Array.concat(function) 不会将函数添加到数组中。
- [173180](http://bugzilla.mozilla.org/show_bug.cgi?id=173180) Rhino UTF-8 解码器接受过长的序列。
- [173906](http://bugzilla.mozilla.org/show_bug.cgi?id=173906) 动态作用域在优化级别 >= 1 时工作不正常。
- [175383](http://bugzilla.mozilla.org/show_bug.cgi?id=175383) string.replace() 中的 ArrayIndexOutOfBoundsException。
- [177314](http://bugzilla.mozilla.org/show_bug.cgi?id=177314) Rhino 应允许 '\400' 表示 ' 0'。
- [179068](http://bugzilla.mozilla.org/show_bug.cgi?id=179068) Rhino 中的字符串文字限制为 64K。
- [179366](http://bugzilla.mozilla.org/show_bug.cgi?id=179366) --> 应位于行开头的空格之后表示此行结束的注释。
- [181654](http://bugzilla.mozilla.org/show_bug.cgi?id=181654) 调用从 Error 类派生的对象的 toString 方法会抛出 TypeError。
- [181834](http://bugzilla.mozilla.org/show_bug.cgi?id=181834) 在用动态作用域编译函数时使用错误的作用域（仅解释模式）。
- [181909](http://bugzilla.mozilla.org/show_bug.cgi?id=181909) 一些 Error 回归测试无效。
- [182028](http://bugzilla.mozilla.org/show_bug.cgi?id=182028) 在 ScriptableObject 的 get() 中调用 has() 会导致 getter 方法未被调用。
- [184107](http://bugzilla.mozilla.org/show_bug.cgi?id=184107) `with(...) { function f ... }` 应该在全局作用域中设置 f。
- [184111](http://bugzilla.mozilla.org/show_bug.cgi?id=184111) 使用 Rhino JavaScript 调试器时抛出的 ArrayOutOfBoundsException。
- [185165](http://bugzilla.mozilla.org/show_bug.cgi?id=185165) 对 "\\" 的反编译结果为损坏的 "\"。
- [189183](http://bugzilla.mozilla.org/show_bug.cgi?id=189183) Debugger source frame window 分层修复。
- [189898](http://bugzilla.mozilla.org/show_bug.cgi?id=189898) 损坏的 String.replace: "XaXY".replace("XY", "--") 结果是 --aXY。