---
title: "序列化"
---

# 序列化

从Rhino 1.5版本3开始，可以对JavaScript对象（包括函数和脚本）进行序列化。然而，编译模式下代码的序列化有一些重要限制。序列化提供了一种保存对象状态并将其写入文件或通过网络连接发送的方法。

## 简单的序列化示例

Rhino shell有两个新的顶级函数：`serialize`和`deserialize`，它们主要作为序列化使用的示例：

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

这里我们看到一个简单的函数被序列化到文件中，然后读入Rhino的新实例并调用。

## Rhino序列化API

引入了两个新的类`ScriptableOutputStream`和`ScriptableInputStream`，分别扩展了`ObjectOutputStream`和`ObjectInputStream`，用于处理Rhino类的序列化。将对象写入文件可以用几行Java代码完成：

```java
FileOutputStream fos = new FileOutputStream(filename);
ScriptableOutputStream out = new ScriptableOutputStream(fos, scope);
out.writeObject(obj)
out.close();
```

这里的*filename*是要写入的文件，*obj*是要写入的对象或函数，而*scope*是包含*obj*的顶级作用域。

从序列化文件中读取对象回内存同样简单：

```java
FileInputStream fis = new FileInputStream(filename);
ObjectInputStream in = new ScriptableInputStream(fis, scope);
Object deserialized = in.readObject();
in.close();
```

同样，我们需要作用域来创建我们的序列化流类。

那么为什么我们需要这些专门的流类，而不是简单地使用`ObjectOutputStream`和`ObjectInputStream`呢？要理解答案，我们必须知道Rhino在序列化对象时背后发生了什么。

## Rhino序列化的工作原理

默认情况下，Java对对象的序列化也会序列化该对象引用的其他对象。在反序列化时，初始对象及其引用的对象都会被创建，并且对象之间的引用会被解析。

然而，对于JavaScript来说，这样会有问题。JavaScript对象包含对原型和父作用域的引用。默认序列化不仅会序列化我们所需的对象或函数，还可能序列化`Object.prototype`，甚至可能整个顶级作用域及其引用的所有内容！我们希望能够将一个JavaScript对象序列化，然后反序列化到新的作用域中，并且反序列化的对象对原型和父作用域的引用都能正确地解析为新作用域中的对象。

`ScriptableOutputStream`在构造函数中接受一个作用域参数。如果在序列化过程中遇到对该作用域的引用，它将序列化一个标记，该标记在反序列化时会被解析为新的作用域。也可以向`ScriptableOutputStream`对象添加对象名称列表，这些对象在序列化时也会保存为标记，并在新作用域中反序列化时进行解析。使用`ScriptableOutputStream`的`addExcludedName`方法来添加新的名称。默认情况下，`ScriptableOutputStream`排除了所有使用`Context.initStandardObjects`定义的名称。

如果你在一个环境中使用Rhino序列化，并且总是定义构造函数*Foo*，应该在调用`writeObject`之前添加以下代码：

```java
out.addExcludedName("Foo");
out.addExcludedName("Foo.prototype");
```

这样可以避免将*Foo*类进行序列化。

## 编译后的函数的序列化

对于编译后的函数，可以使用*jsc*工具进行编译：

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

现在函数*f*被编译成一个Java类，并且该类在类路径中可用，因此序列化可以正常工作。