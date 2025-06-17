---
title: "序列化"
---

# 序列化


从 Rhino 1.5 第三版起，可以序列化包括函数和脚本在内的 JavaScript 对象。然而，在编译模式下序列化代码存在一些重要的限制。序列化提供了一种保存对象状态并将其写入文件或通过网络连接发送的方法。

## 简单的序列化示例

Rhino shell 增加了两个顶层新函数：serialize 和 deserialize。它们主要用作序列化使用示例：

```sh
$ java org.mozilla.javascript.tools.shell.Main
js> function f() { return 3; }
js> serialize(f, "f.ser")
js> quit()

$ java org.mozilla.javascript.tools.shell.Main
js> f = deserialize("f.ser")
function f() {
    return 3;
}
js> f()
3
```

这里我们看到将一个函数序列化到文件中，然后将其读取到新的 Rhino 实例中并调用的简单示例。

## Rhino 序列化 API

引入了两个新类，`ScriptableOutputStream` 和 `ScriptableInputStream`，用于处理 Rhino 类的序列化。这些类分别扩展了 `ObjectOutputStream` 和 `ObjectInputStream`。通过几行 Java 代码就可以将对象写入文件：

```java
FileOutputStream fos = new FileOutputStream(filename);
ScriptableOutputStream out = new ScriptableOutputStream(fos, scope);
out.writeObject(obj)
out.close();
```

这里 _filename_ 是要写入的文件，_obj_ 是要写入的对象或函数，_scope_ 是包含 _obj_ 的顶层作用域。

将序列化的对象读取回内存同样简单：

```java
FileInputStream fis = new FileInputStream(filename);
ObjectInputStream in = new ScriptableInputStream(fis, scope);
Object deserialized = in.readObject();
in.close();
```

同样，我们需要作用域来创建我们的序列化流类。

那么，为什么需要这些专门的流类，而不是简单地使用 `ObjectOutputStream` 和 `ObjectInputStream`？要理解这一点，我们必须了解当 Rhino 序列化对象时背后发生了什么。

## Rhino 序列化的工作原理

默认情况下，对象的 Java 序列化会同时序列化该对象引用的其他对象。在反序列化时，初始对象和它所引用的对象会被创建，并且对象之间的引用会被解析。

然而，对于 JavaScript，这会产生问题。JavaScript 对象包含对原型和父作用域的引用。默认序列化会序列化我们想要的对象或函数，但也可能会序列化 `Object.prototype` 甚至整个顶层作用域以及它引用的所有内容！我们希望能序列化一个 JavaScript 对象并将其反序列化到新的作用域中，并且确保反序列化的对象对原型和父作用域的引用能够正确地指向新作用域中的对象。

`ScriptableOutputStream` 在其构造函数中接受一个作用域参数。如果在序列化过程中遇到对该作用域的引用，它会序列化一个标记，该标记在反序列化时会解析到新的作用域中。同样，可以将对象的名称添加到 `ScriptableOutputStream` 对象的列表中。这些对象在序列化时会作为标记保存，并在反序列化时解析到新作用域中。使用 `ScriptableOutputStream` 的 addExcludedName 方法可以添加新的名称。默认情况下，`ScriptableOutputStream` 会排除所有使用 `Context.initStandardObjects` 定义的名称。

如果您在使用 Rhino 序列化的环境中总是定义，比如说一个构造函数 _Foo_，在调用 `writeObject` 之前应该添加如下代码：

```java
out.addExcludedName("Foo");
out.addExcludedName("Foo.prototype");
```

此代码将阻止 `Foo` 和 `Foo.prototype` 被序列化，并确保对 `Foo` 或 `Foo.prototype` 的引用在反序列化时解析为新作用域中的对象。如果在 `ScriptableOutputStream` 或 `ScriptableInputStream` 的作用域中找不到 `Foo` 或 `Foo.prototype`，将抛出异常。

## 编译模式下的 Rhino 序列化

序列化在解释模式下的对象、函数和脚本上表现良好。然而，在序列化编译模式下的函数和脚本时，可能会出现问题：

```sh
$ cat test.js
function f() { return 3; }
serialize(f, "f.ser");
g = deserialize("f.ser");
print(g());

$ java org.mozilla.javascript.tools.shell.Main -opt -1 test.js
3

$ java org.mozilla.javascript.tools.shell.Main test.js
js: uncaught JavaScript exception: java.lang.ClassNotFoundException: c1
```

问题在于 Java 序列化没有内置方法来序列化 Java 类本身。（可以将 Java 字节码保存到数组中并在反序列化时加载类，但这样功能的内存开销可能会非常大。）一种解决方案是使用 jsc 工具编译函数：

```sh
$ cat f.js
function f() { return 3; }

$ java -classpath js.jar org.mozilla.javascript.tools.jsc.Main f.js

$ cat test2.js
loadClass("f");
serialize(f, "f.ser");
g = deserialize("f.ser");
print(g());

$ java -classpath 'js.jar;.' org.mozilla.javascript.tools.shell.Main test2.js
3
```

现在函数 _f_ 被编译成一个 Java 类，但该类被放入类路径中，因此序列化可以正常工作。这并不是特别有趣的示例，因为将函数编译成类然后加载它，与序列化一个解释函数实现的效果相同，但如果您希望序列化引用编译函数的 JavaScript 对象，这就显得更为重要。
