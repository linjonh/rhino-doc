---
title: Rhino 1.7R2
parent: Releases
nav_order: 15
---

# Rhino 1.7R2


## Java Continuations API

Rhino 已经支持 Continuations 一段时间，但之前在 Java 中与 continuations 交互并没有很好的方法。Continuations 在服务器端脚本中非常有用，因为它允许保存和重新启动 JavaScript 的执行，可能在停止时对执行状态进行序列化。在 Rhino 1.7R2 中，`org.mozilla.javascript.Context` 提供了一些方法，可以通过 Java 进行控制：

- [executeScriptWithContinuations](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/context.html#executescriptwithcontinuations(org.mozilla.javascript.script,%20org.mozilla.javascript.scriptable)) - 执行包含捕获 continuations 的脚本，该脚本可能中断。
- [callFunctionWithContinuations](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/Context.html#callFunctionWithContinuations-org.mozilla.javascript.Callable-org.mozilla.javascript.Scriptable-java.lang.Object:A-) - 调用包含捕获 continuations 的函数，该函数可能中断。
- [captureContinuation](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/context.html#capturecontinuation()) - 从当前执行中捕获 continuation。
- [resumeContinuation](https://javadoc.io/doc/org.mozilla/rhino/latest/org/mozilla/javascript/context.html#resumecontinuation(java.lang.object,%20org.mozilla.javascript.scriptable,%20java.lang.object)) - 重新启动在调用 captureContinuation 时暂停的 JavaScript 执行。

例如，如果您有一个 Java 类 MyClass，其中有一个方法 f()。假设您希望在调用 f() 时暂停脚本执行。您可以调用 captureContinuation，将当前执行的所有状态封装并返回为 ContinuationPending 对象。ContinuationPending 也是一个异常；您可以通过抛出该异常来向 Rhino 表明您希望暂停执行：

```
public static class MyClass {
    public int f(int a) {
        Context cx = Context.enter();
        try {
            ContinuationPending pending = cx.captureContinuation();
            pending.setApplicationState(a);
            throw pending;
        } finally {
            Context.exit();
        }
    }
}
```

Rhino 仅允许在通过新的 Context 方法（如 executeScriptWithContinuations 和 callFunctionWithContinuations）调用时捕获 continuations。如果使用这些方法执行期间调用的 Java 方法抛出 ContinuationPending，异常将向上传播，允许调用的 Java 代码执行一些操作，然后稍后重新启动执行：

```
Context cx = Context.enter();
try {
    cx.setOptimizationLevel(-1); // 必须使用解释器模式
    Script script = cx.compileString("myObject.f(3) + 1;",
        "测试源", 1, null);
    cx.executeScriptWithContinuations(script, globalScope);
    fail("应该抛出 ContinuationPending");
} catch (ContinuationPending pending) {
    Object applicationState = pending.getApplicationState();
    assertEquals(new Integer(3), applicationState);
    int saved = (Integer) applicationState;
    Object result = cx.resumeContinuation(pending.getContinuation(),
        globalScope, saved + 1);
    assertEquals(5, ((Number)result).intValue());
} finally {
    Context.exit();
}
```
另外，作为一种附加便利功能，ContinuationPending 支持保存应用程序定义的对象。Continuations API 仅支持解释器模式。

有关使用 API 的更多示例，请参阅单元测试 [ContinuationsAPITest.java](https://github.com/mozilla/rhino/blob/master/rhino/src/test/java/org/mozilla/javascript/tests/ContinuationsApiTest.java)。

## Rhino shell 的更优行编辑

Rhino 1.7R2 现在在 Rhino shell 中提供行编辑功能。主要实现来自 [JLine](https://github.com/jline/jline1)，这是一个很棒的 Java 库，用于处理控制台输入。我们免费获得了命令历史记录功能（通过上下箭头调用之前的命令行）。此外，通过 Rhino 中的一些代码，我们有限支持了自动补全功能。

我们没有将 JLine 和 Rhino 一起分发，因此您需要自行下载它。Rhino 会自动检测类路径是否包含 JLine，如果包含则启用，否则会维持之前简单的行为。所以要以 JLine 运行 shell，命令看起来像这样：

```
java -cp js.jar:lib/jline-0.9.93.jar org.mozilla.javascript.tools.shell.Main
```

自动补全通过检查全局作用域并尝试完成在其中定义的变量来运行。例如：

```
js> var obj = {prop1:{prop2:3}};
js> ob
```

输入 `ob` 并按下 tab 键后，Rhino 会自动补全为 `obj`。它还可以处理带有点号属性列表的情况，找到名称进行补全：

```
js> obj.prop1.pr
```

在 `obj.prop1.pr` 后按下 tab 键，会自动补全为 `obj.prop1.prop2`。

自动补全还适用于 Java 对象：

```
js> var s = new java.lang.String("hi");
js> s.
```

在 "s." 后按下 Tab，将使 Rhino 列出所有可能的补全项：

```
contentEquals(         bytes                  codePointBefore(
hashCode(              contains(              indexOf(
wait(                  isEmpty(               toUpperCase(
matches(               substring(             notify(
empty                  equalsIgnoreCase(      length(
getChars(              replaceFirst(          codePointAt(
codePointCount(        trim(                  charAt(
notifyAll(             subSequence(           getClass(
getBytes(              startsWith(            equals(
class                  lastIndexOf(           compareTo(
offsetByCodePoints(    concat(                replace(
compareToIgnoreCase(   toCharArray(           toLowerCase(
intern(                chars                  split(
toString(              replaceAll(            endsWith(
regionMatches(
```

一些限制：据我所知，目前不可能枚举 Java 运行时中的所有类或包，因此 Java 类名的自动补全的效果可能不尽人意。此外，我发现 JLine 在 Eclipse 控制台中无法使用，所以我在 Eclipse 中运行时会移除 JLine 的 jar。

详情请参考 [bug 418034](https://bugzilla.mozilla.org/show_bug.cgi?id=418034)。

## Debugger 随 Rhino 提供

感谢 Hannes Wallnoefer 的敏锐观察，他发现了我们依赖于 Rhino 调试器 GUI 的部分文件的更宽松许可版本，我们现在可以完全构建调试器，并随 Rhino 分发。

有关调试器中文件新许可证的详情，请查看 [Rhino 许可证](../license.md)。

## Doctest

Python 是各种好主意的温床，我们最近已经看到许多 Python 的想法出现在 JavaScript 中。JavaScript 1.7 的[生成器](https://web.archive.org/web/20210502042346mp_/https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/1.7#Generators)和[数组推导式](https://web.archive.org/web/20210502042346mp_/https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/1.7#Array_comprehensions)就是最近的两个例子。

Rhino 1.7R2 包含另一个 Python 的想法：[doctest](https://docs.python.org/lib/module-doctest.html)。这是一个测试 shell 会话片段的函数。从检测注释文档中出现的片段开始得名，但结果证明这是一个非常方便的编写测试的方式。

例如，假设您编写了一个新函数 `hello()`。我通常会在 shell 中实验，确保它能正确运行：

```
js> function hello(greetee) {
  >   return "hello, " + greetee;
  > }
js> hello("world");
hello, world
js> hello(3)
hello, 3
js> hello()
hello, undefined
```

之后，您可能会编写一个 [JUnit](https://www.junit.org/) 测试来验证。该测试需要执行一大堆设置代码，然后再调用 `hello()` 三次保存结果值，并调用比较函数来验证实际值和预期值。这样做需要编写相当多的代码。

但 doctest 为我解决了这一切。Rhino 1.7R2 中提供了新的 doctest shell 函数，以及一个 JUnit 测试 [DoctestsTest](https://github.com/mozilla/rhino/blob/master/tests/src/test/java/org/mozilla/javascript/tests/DoctestsTest.java)，该测试会找到具有 `.doctest` 扩展名的文件并运行它们。所以现在我需要做的就是将上面的 shell 会话复制并粘贴到 `hello.doctest` 文件，然后将其放入正确的目录，就可以获得一个 JUnit 测试！编写测试更方便，从而大大提高了实际编写测试的可能性。
