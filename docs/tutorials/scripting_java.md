---
title: "编写Java脚本"
---

# 编写Java脚本


---
本文展示了如何通过Rhino超越JavaScript进入Java的世界。编写Java脚本有许多用途。它允许我们通过利用多种可用的Java库快速编写强大的脚本。我们还可以通过编写脚本来测试Java类。此外，我们可以通过使用脚本进行**探索性编程**来辅助Java开发。探索性编程是通过编写快速程序以使用某个库或API来了解其功能的过程。正如我们将看到的，脚本使这一过程变得更加容易。

请注意，ECMA标准并未涵盖与Java（或任何外部对象系统）的通信。因此，本章涵盖的所有功能都应该被视为一种扩展。

## 访问Java包和类

每段Java代码都是类的一部分，每个Java类都属于一个包。然而，在JavaScript中，脚本存在于任何包层次结构之外。那么，我们如何访问Java包中的类？

Rhino定义了一个名为`Packages`的顶级变量。`Packages`变量的属性是所有顶级Java包，例如`java`和`com`。例如，我们可以访问`java`包的值：

```js
js> Packages.java
[JavaPackage java]
```

作为一个方便的快捷方式，Rhino定义了一个顶级变量`java`，它等同于`Packages.java`。因此，前面的示例还可以更短：

```js
js> java
[JavaPackage java]
```

我们可以通过按包层次结构一步步访问Java类：

```js
js> java.io.File
[JavaClass java.io.File]
```

如果脚本要访问许多不同的Java类，每次都使用完整类包名可能会很不方便。Rhino提供了一个顶级函数`importPackage`，它的功能类似于Java的`import`声明。例如，我们可以导入`java.io`包中的所有类，并仅用名称`File`访问类`java.io.File`：

```js
js> importPackage(java.io)
js> File
[JavaClass java.io.File]
```

这里，`importPackage(java.io)`使`java.io`包中的所有类（如`File`）在顶级可用。它在效果上等同于Java声明`import java.io.*;`。

重要的是要注意，Java会隐式导入`java.lang.*`，而Rhino不会。原因是JavaScript有自己顶级的对象`Boolean`、`Math`、`Number`、`Object`和`String`，这些对象不同于`java.lang`包中定义的同名类。由于这种冲突，不建议对`java.lang`包使用`importPackage`。

需要注意的是，Rhino在指定Java包或类名时的错误处理方式。如果访问`java.MyClass`，Rhino会尝试加载名为`java.MyClass`的类。如果加载失败，Rhino会假设`java.MyClass`是一个包名，并且不会报错：

```js
js> java.MyClass
[JavaPackage java.MyClass]
```

只有当尝试将此对象作为类使用时，才会报错。

### 外部包和类

外部包和类也可以像在Rhino中一样使用。确保你的`.jar`或`.class`文件在类路径中，然后你就可以将它们导入到你的JavaScript应用程序中。这些包可能不在`java`包中，因此你需要在包名之前加上"`Packages.`"。例如，要导入`org.mozilla.javascript`包，你可以如下使用`importPackage()`：

```sh
$ java org.mozilla.javascript.tools.shell.Main
js> importPackage(Packages.org.mozilla.javascript);
js> Context.currentContext;
org.mozilla.javascript.Context@bb6ab6
```

有时，你会看到使用包的完全限定名称代替`importPackage()`方法的例子。这也是可以接受的，只是需要更多的输入。使用完全限定名称，上述示例将如下所示：

```sh
$ java org.mozilla.javascript.tools.shell.Main
js> jsPackage = Packages.org.mozilla.javascript;
[JavaPackage org.mozilla.javascript]
js> jsPackage.Context.currentContext;
org.mozilla.javascript.Context@bb6ab6
```

或者，如果你只想从包中导入一个类，可以使用`importClass()`方法。上述示例可以表示如下：

```sh
$ java org.mozilla.javascript.tools.shell.Main
js> importClass(Packages.org.mozilla.javascript.Context);
js>  Context.currentContext;
org.mozilla.javascript.Context@bb6ab6
```

## 使用Java

现在我们可以访问Java类，下一步就是创建一个对象。这与Java中使用`new`操作符的方式相同：

```js
js> new java.util.Date()
Thu Jan 24 16:18:17 EST 2002
```

如果我们将新对象存储在一个JavaScript变量中，我们可以调用它的方法：

```js
js> f = new java.io.File("test.txt")
test.txt
js> f.exists()
true
js> f.getName()
test.txt
```

静态方法和字段可以从类对象本身访问：

```js
js> java.lang.Math.PI
3.141592653589793
js> java.lang.Math.cos(0)
1
```

在JavaScript中，与Java不同，方法本身是对象，可以被评估也可以被调用。如果我们仅查看方法对象本身，就可以看到方法的各种重载形式：

```js
js> f.listFiles
function listFiles() {/*
java.io.File[] listFiles()
java.io.File[] listFiles(java.io.FilenameFilter)
java.io.File[] listFiles(java.io.FileFilter)
*/}
```

此输出显示了`File`类定义的三个重载方法`listFiles`：一个不接受参数，一个接受`FilenameFilter`参数，另一个接受`FileFilter`参数。所有方法返回一个`File`对象数组。在探索性编程中，了解Java方法的参数和返回类型特别有用，我们可以调查某个方法而不确定其参数或返回类型。

另一个对探索性编程有用的功能是能够查看对象定义的所有方法和字段。使用JavaScript的`for..in`结构，我们可以打印出所有这些值：

```js
js> for (i in f) { print(i) }
exists
parentFile
mkdir
toString
wait
_[其他44个]_
```

请注意，不仅`File`类的方法被列出，其基类`java.lang.Object`继承的方法（如`wait`）也被列出。这使得在处理深层嵌套的继承层次结构中的对象时更加容易，因为你可以看到该对象可用的所有方法。

Rhino提供了另一个便利，允许通过其属性名称直接访问JavaBeans的属性。JavaBean属性`foo`由方法`getFoo`和`setFoo`定义。此外，可以通过`isFoo`方法定义同名的布尔属性。例如，以下代码实际上调用了`File`对象的`getName`和`isDirectory`方法。

```js
js> f.name
test.txt
js> f.directory
false
```

## 调用重载方法

根据参数类型选择要调用的方法的过程称为**重载解析**。在Java中，重载解析在编译时进行，而在Rhino中，它在运行时进行。由于JavaScript的动态类型使用这一特性，这种差异是不可避免的（在第2章讨论过）：由于变量的类型直到运行时才知道，因此只有在运行时才能进行重载解析。

例如，考虑以下定义多个重载方法并调用它们的Java类。

```java
public class Overload {
    public String f(Object o) { return "f(Object)"; }
    public String f(String s) { return "f(String)"; }
    public String f(int i)    { return "f(int)"; }

    public String g(String s, int i) { return "g(String,int)"; }
    public String g(int i, String s) { return "g(int,String)"; }

    public static void main(String[] args) {
        Overload o = new Overload();
        Object[] a = new Object[] { new Integer(3), "hi", Overload.class };
        for (int i = 0; i != a.length; ++i)
            System.out.println(o.f(a[i]));
    }
}
```

当我们编译并运行程序时，它会输出

```text
f(Object)
f(Object)
f(Object)
```

但是，如果我们编写类似的脚本

```js
var o = new Packages.Overload();
var a = [ 3, "hi", Packages.Overload ];
for (var i = 0; i != a.length; ++i)
    print(o.f(a[i]));
```

并执行它，则得到输出

```text
f(int)
f(String)
f(Object)
```

因为Rhino在运行时选择重载方法，所以它会调用与参数更加匹配的更具体的类型。而在Java中，仅根据编译时的参数类型选择重载方法。

虽然这种方式可以更好地为每次调用选择可能更匹配的方法，但也对性能产生了影响，因为每次调用需要更多的工作。然而，在实际应用中，这种性能损耗尚未被显著注意到。

由于重载解析在运行时进行，因此它可能会在运行时失败。例如，如果用两个整数调用`Overload`的`g`方法，则会报错，因为没有一种方法形式比另一种更适合参数类型：

```js
js> o.g(3,4)
js:"<stdin>", line 2: 对应JavaScript参数类型（number,number）的Java方法Overload.g选择存在歧义；
候选方法为：
class java.lang.String g(java.lang.String,int)
class java.lang.String g(int,java.lang.String)
```

有关重载语义的更精确定义，请参阅[Java方法重载和LiveConnect 3](https://web.archive.org/web/20110623074154/http://www.mozilla.org/js/liveconnect/lc3_method_overloading.html)。

## 实现Java接口

现在我们可以访问Java类、创建Java对象以及访问这些对象的字段、方法和属性，我们手中已经掌握了许多功能。然而，有一些实例仅使用这些功能是不够的：Java中的许多API通过提供客户必须实现的接口来工作。一个例子是`Thread`类：其构造函数接受一个包含单个方法`run`的`Runnable`，此方法将在新线程启动时调用。

为了满足这一需求，Rhino提供了创建实现接口的新Java对象的能力。首先，我们必须定义一个JavaScript对象，该对象具有函数属性，属性名称与Java接口要求的方法名称匹配。为了实现一个 `Runnable`，我们只需定义一个不带参数的单一方法 `run`。如果你还记得第三章的内容，就会知道可以使用 `{propertyName: value}` 的表示法定义一个JavaScript对象。我们可以在这里结合函数表达式使用这种语法来定义一个带有 `run` 方法的JavaScript对象：

```js
js> obj = { run: function () { print("\n正在运行"); } }
[object Object]
js> obj.run()

正在运行
```

现在我们可以通过构造一个 `Runnable` 来创建一个实现 `Runnable` 接口的对象：

```js
js> r = new java.lang.Runnable(obj);
[object JavaObject]
```

在Java中，无法对一个接口使用 `new` 操作符，因为没有可用的实现。在这里，Rhino从JavaScript对象 `obj` 中获取实现。既然我们已经有了一个实现 `Runnable` 的对象，我们可以创建一个 `Thread` 并运行它。我们为 `run` 定义的函数将在一个新线程上被调用。

```js
js> t = new java.lang.Thread(r)
Thread[Thread-2,5,main]
js> t.start()
js>

正在运行
```

最后一个 `js` 提示和新线程的输出可能会根据线程调度的情况出现不同的顺序。

在幕后，Rhino生成了一个新Java类的字节码，该类实现了 `Runnable` 并将对其 `run` 方法的所有调用转发到相关的JavaScript对象。实现此类的对象称为 _Java适配器_。由于到JavaScript的转发发生在运行时，所以可以延迟定义实现接口的方法直到它被调用。虽然省略必需的方法对于大型编程来说是一种糟糕的实践，但对于小脚本和探索性编程来说相当有用。

## JavaAdapter 构造函数

在上一节中，我们使用 `new` 操作符和Java接口创建了Java适配器。这种方法有其局限性：无法实现多个接口，也不能扩展非抽象类。出于这些原因，提供了 `JavaAdapter` 构造函数。

`JavaAdapter` 构造函数的语法是：

```java
new JavaAdapter(javaIntfOrClass, [javaIntf, ..., javaIntf,] javascriptObject)
```

这里的 `javaIntfOrClass` 是要实现的接口或扩展的类，`javaIntf` 是要实现的额外接口。`javascriptObject` 是包含将在Java适配器中调用的方法的JavaScript对象。

参见 [enum.js](https://github.com/mozilla/rhino/blob/master/examples/src/main/resources/enum.js) 示例了解更多信息

实际上几乎不需要直接调用 `JavaAdapter` 构造函数。大多数情况下，使用之前的 `new` 操作符的语法就足够了。

:::note
> 若要使用JavaAdapter功能或优化级别达到0或更高，Rhino必须在允许定义类加载器的安全管理器下运行。

## JavaScript函数作为Java接口

我们经常需要实现只有一个方法的接口，例如前面的 `Runnable` 示例或提供各种事件监听器实现。为了简化此操作，Rhino允许在需要此类接口的地方传递JavaScript函数。该函数将作为接口方法的实现被调用。

以下是简化版的 `Runnable` 示例：

```js
js> t = java.lang.Thread(function () { print("\n正在运行"); });
Thread[Thread-0,5,main]
js> t.start()
js>
正在运行
```

Rhino还允许在Java接口有多个方法且所有方法签名相同时使用JavaScript函数作为实现。当调用函数时，Rhino会将方法名称作为额外的参数传递。函数可以利用该参数区分它被调用所代表的具体方法：

```js
js> var frame = new Packages.javax.swing.JFrame();
js> frame.addWindowListener(function(event, methodName) {
        if (methodName == "windowClosing") {
            print("调用 System.exit()..."); java.lang.System.exit(0);
        }
    });
js> frame.setSize(100, 100);
js> frame.visible = true;
true
js> 调用 System.exit()...
```

## 创建Java数组

Rhino没有提供创建Java数组的特殊语法。需要使用类 `java.lang.reflect.Array` 来实现此目的。要创建一个包含五个Java字符串的数组，可进行以下调用：

```js
js> a = java.lang.reflect.Array.newInstance(java.lang.String, 5);
[Ljava.lang.String;@7ffe01
```

要创建一个原始类型的数组，我们必须使用 `java.lang` 包中相关对象类中定义的特殊 TYPE 字段。例如，要创建一个字节数组，我们必须使用特殊字段 `java.lang.Byte.TYPE`：

```js
js> a = java.lang.reflect.Array.newInstance(java.lang.Character.TYPE, 2);
[C@7a84e4
```

然后可以在任何允许使用此类型Java数组的地方使用生成的值。

```js
js> a[0] = 104
104
js> a[1] = 105
105
js> new java.lang.String(a)
hi
```

## Java字符串与JavaScript字符串

需要注意的是，Java字符串与JavaScript字符串并不相同。Java字符串是 `java.lang.String` 类型的实例，具有该类定义的所有方法。JavaScript字符串具有 `String.prototype` 定义的方法。最常见的陷阱是`length`，它是Java字符串的一个方法，而在JavaScript字符串中是一个动态属性：

```js
js> javaString = new java.lang.String("Java")
Java
js> jsString = "JavaScript"
JavaScript
js> javaString.length()
4
js> jsString.length
10
```

Rhino在减少这两种类型之间的差异方面提供了一些帮助。首先，可以将一个JavaScript字符串传递给需要Java字符串的Java方法，Rhino将完成转换。实际上，在前面的示例中调用 `java.lang.String` 构造函数时已经看到此功能。

如果 `java.lang.String` 类尚未定义JavaScript方法，Rhino还会将JavaScript方法应用于Java字符串。例如：

```js
js> javaString.match(/a.*/)
ava
```

## JavaImporter构造函数

`JavaImporter` 是一种新的全局构造函数，可以在编写Java脚本时省略明确的包名：

```js
var SwingGui = JavaImporter(Packages.javax.swing,
                            Packages.javax.swing.event,
                            Packages.javax.swing.border,
                            java.awt.event,
                            java.awt.Point,
                            java.awt.Rectangle,
                            java.awt.Dimension);
...

with (SwingGui) {
    var mybutton = new JButton(test);
    var mypoint = new Point(10, 10);
    var myframe = new JFrame();
...
}
```

以前，此功能仅嵌入使用 [`org.mozilla.javascript.ImporterTopLevel`](javadocs/org/mozilla/javascript/importertoplevel.html) 类作为顶级范围的脚本中可用。该类为脚本提供了额外的 `importPackage()` 和 `importClass()` 全局函数，但其广泛使用往往会污染全局命名空间并阻止加载的类进行垃圾回收。

请参阅 [Bugzilla 245882](https://bugzilla.mozilla.org/show_bug.cgi?id=245882) 了解详细信息。

## Java异常

Java方法抛出的异常可以通过JavaScript代码使用[try...catch语句](https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Exception_Handling_Statements/try...catch_Statement)捕获。Rhino将Java异常包装为具有以下属性的错误对象：

- `javaException`: Java方法抛出的原始异常
- `rhinoException`: 由Rhino运行时包装的异常

`instanceof` 操作符可以用来查询异常的类型：

```js
try {
    java.lang.Class.forName("NonExistingClass");
} catch (e) {
    if (e.javaException instanceof java.lang.ClassNotFoundException) {
       print("类未找到");
    }
}
```

Rhino还支持try...catch语句的扩展，允许定义有条件地捕获异常：

```js
function classForName(name) {
    try {
        return java.lang.Class.forName(name);
    } catch (e if e.javaException instanceof java.lang.ClassNotFoundException) {
        print("类 " + name + " 未找到");
    } catch (e if e.javaException instanceof java.lang.NullPointerException) {
        print("类名为空");
    }
}

classForName("NonExistingClass");
classForName(null);
```

## 限制

### LiveConnect

如果JavaObject的字段名称与方法名称冲突，则该字段的值是惰性检索的，并且可能会受后续分配的影响，这可能会发生一些令人困惑的情况：

```js
javaObj.fieldAndMethod = 5;
var field = javaObj.fieldAndMethod;
javaObj.fieldAndMethod = 7;
// 现在，field == 7
```

通过强制字段值在读取其值时转换为JavaScript类型，可以解决此问题：

```js
javaObj.fieldAndMethod = 5;
var field = javaObj.fieldAndMethod + 0; // 强制现在进行转换
javaObj.fieldAndMethod = 7;
// 现在，field == 5
```

### JSObject

Rhino **不支持** `netscape.javascript.JSObject` 类。
