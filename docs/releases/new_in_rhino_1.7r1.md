---
title: Rhino 1.7R1
parent: Releases
nav_order: 14
---

# Rhino 1.7R1


---
Rhino 1.7R1 是一个主要的功能更新版本。

## JavaScript 1.7 功能

从 Rhino1.7R1 开始，Rhino 现在支持 JavaScript 1.7 的功能。请参见 [JavaScript 1.7 新特性](https://web.archive.org/web/20210502042346mp_/https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/1.7)。JavaScript 1.7 支持以下功能：

- 生成器和迭代器
- 数组推导
- 使用 let 声明的块作用域
- 解构赋值

要启用 JavaScript 1.7 支持，必须使用 `Context.setLanguageVersion()` API 调用将版本设置为 170。如果您使用 Rhino shell，可以在命令行中指定 `-version 170` 或在 shell 执行的代码中调用 `version(170)`。

## 从 Java `Iterable` 或 `Iterator` 创建 JavaScript `Iterator`

作为对 JavaScript 1.7 的扩展，Rhino 现在支持从 [java.lang.Iterable](https://java.sun.com/javase/6/docs/api/java/lang/Iterable.html) 和 [java.util.Iterator](https://java.sun.com/javase/6/docs/api/java/util/Iterator.html) 对象创建 JavaScript `Iterator`。例如：

```
js> m = new java.util.LinkedHashMap()
{}
js> m.put("a",1); m.put("b",2); m
{a=1.0, b=2.0}
js> for (i in Iterator(m.values())) print(i)
1.0
2.0
js> for (i in Iterator(m.values().iterator())) print(i)
1.0
2.0
```

注意，`for (i in m.values())` 仍将迭代由 `m.values()` 返回的对象的属性，即 `java.util.HashMap$Values` 的所有方法的名称。这样做是为了不破坏向后兼容性。

## 首选 DOM3 E4X 实现

从 Rhino 1.7R1 开始，基于 DOM3 的 E4X 实现现在优先于 XMLBeans 实现。之前，如果类路径中存在 XMLBeans 实现，它会被使用；现在只有在运行 Rhino 的 Java 版本不支持 DOM3（即 JDK 1.5 之前），或者通过重写 `ContextFactory.getE4xImplementationFactory()` 显式指定时才会使用它。

## 通过单独的 JAR 文件支持 JDK 1.4

我们现在至少需要 JDK 1.5 才能编译 Rhino 源代码。因此，二进制版中的 `js.jar` 无法在 JDK 1.4 环境中运行。为了支持使用 JDK 1.4 运行 Rhino 的用户，我们使用 [Retrotranslator](http://retrotranslator.sourceforge.net/) 生成 `js-14.jar`，它与 JDK 1.4 兼容。`js-14.jar` 也包含在二进制版中，可以通过 ant 从源代码编译生成。Rhino 的未来版本将完全取消对 JDK 1.4 的支持。

## 在编译模式下支持指令阈值回调

现在可以为编译脚本请求指令回调。这主要用于为不可信的脚本强制执行指令配额。请参见 [bug 397680](https://bugzilla.mozilla.org/show_bug.cgi?id=397680)。

## `debugger` 关键字

修复 [bug 386997](https://bugzilla.mozilla.org/show_bug.cgi?id=386997) - 需要支持 'debugger' 语句

添加 'debugger' 关键字时，运行于 Rhino 调试器会触发断点。如果调试器未运行或已编译为 Java 字节码，则该语句会被忽略。

## 预加载常用包名

在 1.7R1 之前，包名以 "java." 开头的 Java 类可以直接引用，而其他包中的类需要先使用 "Packages" 对象。现在，以下顶级包，如 "java"，可以在全局作用域中直接使用："javax"、"org"、"com"、"edu" 和 "net"。

## 数组和字符串泛型

请参见 [JavaScript 1.6 新特性](https://web.archive.org/web/20210502042346mp_/https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/1.6)。此功能现已在 Rhino 中实现。

## Shell 中的可配置提示符

如果全局变量 `prompts` 被定义为一个对象，并且定义了元素 0 和元素 1，那么 Shell 会使用元素 0 作为提示符，元素 1 作为持续提示符。如果数组元素是函数，则 Rhino 会调用它们：

```
js> function f() {
  >   return 3;
  > }
js> f();
3
js> var prompts = true;
js> var prompts = true; // 不会影响 Shell 提示符
js> var prompts = [">>> ", "... "];
>>> function g() {
...   return 3;
... }
>>> g()
3
>>> var prompts = {count:0, 0:function(){ return this.count++ + "> "; }, 1:">> "};
0> function h() {
>>   return 5;
>> }
1> h();
5
2>
```

## 调试器需下载后进行构建

虽然这不算一个功能，但为了确保我们不会发布基于非开源许可可用源代码构建的二进制文件，您必须下载一些源文件并自行构建调试器。下面是构建方法：

- `unzip rhino1_7R1.zip`
- `cd rhino1_7R1`
- `ant compile-debugger`

现在 `js.jar` 包含运行调试器所需的源代码：

```
java -cp js.jar org.mozilla.javascript.tools.debugger.Main test.js
```

如果有人愿意贡献更改，使我们无需依赖这些非开源许可就能构建调试器，我们将非常乐意将这些更改合并到 Rhino 中。
