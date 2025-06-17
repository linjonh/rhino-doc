---
title: "嵌入Rhino"
---

# 嵌入Rhino


嵌入Rhino可以通过简单的方式实现，并且能得到良好的结果。如果嵌入者付出更多努力，还可以进一步自定义暴露给脚本的对象。

本教程将带你从简单嵌入到更加自定义、复杂的嵌入步骤。对每一步提供了完整可编译的例子。

示例位于发布版中的`rhino/examples`目录以及CVS中的`mozilla/js/rhino/examples`中。本文档将使用[LXR](https://lxr.mozilla.org/)对它们进行链接。

## RunScript：一个简单的嵌入

关于可能的最简单的Rhino嵌入示例是[RunScript示例](https://github.com/mozilla/rhino/blob/master/examples/src/main/java/RunScript.java)。它所做的就是从命令行读取一个脚本，执行它并打印结果。

以下是从shell命令行使用RunScript的示例：

```sh
$ java RunScript "Math.cos(Math.PI)"
-1
$ java RunScript "function f(x){return x+1} f(7)"
8
```

注意，你必须将Rhino类和RunScript示例类文件都放在classpath中。让我们逐行分析`main`方法的主要代码。

### 进入上下文

代码如下：

```java
Context cx = Context.enter();
```

创建并进入一个`Context`。`Context`保存有关脚本执行环境的信息。

### 初始化标准对象

代码如下：

```java
Scriptable scope = cx.initStandardObjects();
```

初始化标准对象（`Object`，`Function`等）。在执行脚本之前必须完成此步骤。_null_参数告诉`initStandardObjects`创建并返回一个在后续调用中使用的范围对象。

### 收集参数

这是标准的Java代码，不是Rhino特有的。它仅收集所有参数并将它们连接在一起。

```java
String s = "";
for (int i=0; i < args.length; i++) {
    s += args[i];
}
```

### 评估脚本

代码如下：

```java
Object result = cx.evaluateString(scope, s, "<cmd>", 1, null);
```

使用`Context cx`评估字符串。脚本评估时会在_scope_中查找变量，错误将使用文件名`<cmd>`以及行号1报告。

### 打印结果

代码如下：

```java
System.out.println(cx.toString(result));
```

打印评估脚本的结果（存储在变量_result_中）。_result_可以是字符串、JavaScript对象或其他值。`toString`方法会将任意JavaScript值转换为字符串。

### 退出上下文

代码如下：

```java
} finally {
    Context.exit();
}
```

退出Context。这会移除上下文和当前线程之间的关联，是一个必要的清理操作。每个进入的调用必须有相应的退出调用。为了确保即使抛出异常也能调用，它被放入对应于`Context.enter()`之后的try块的finally块中。

## 暴露Java APIs

### 使用Java APIs

嵌入中不需要额外代码！名为_LiveConnect_的JavaScript功能允许JavaScript程序与Java对象交互：

```sh
$ java RunScript "java.lang.System.out.println(3)"
3.0
undefined
```

### 实现接口

使用Rhino，JavaScript对象可以实现任意Java接口。不需要编写Java代码——这是Rhino的LiveConnect实现的一部分。例如，我们可以看看如何在Rhino shell会话中实现`java.lang.Runnable`：

```js
js> obj = { run: function() { print("hi"); } }
[object Object]
js> obj.run()
hi
js> r = new java.lang.Runnable(obj);
[object Object]
js> t = new java.lang.Thread(r)
Thread[Thread-0,5,main]
js> t.start()
hi
```

### 添加Java对象

下一个示例是[RunScript2](https://github.com/mozilla/rhino/blob/master/examples/src/main/java/RunScript2.java)。它与RunScript相同，但增加了两行代码：

```java
Object wrappedOut = Context.javaToJS(System.out, scope);
ScriptableObject.putProperty(scope, "out", wrappedOut);
```

这两行代码添加了一个全局变量`out`，它是`System.out`变量的JavaScript反射：

```sh
$ java RunScript2 "out.println(42)"
42.0
undefined
```

## 从Java使用JavaScript对象

评估脚本后，可以查询scope中的变量和函数，提取值并调用JavaScript函数。这在[RunScript3](https://github.com/mozilla/rhino/blob/master/examples/src/main/java/RunScript3.java)示例中进行了说明。这个示例增加了打印变量_x_的值以及调用函数`f`并打印其结果的功能。_x_和_f_都需要由评估的脚本定义。例如：

```sh
$ java RunScript3 "x = 7"
x = 7
f未定义或不是函数。
$ java RunScript3 "function f(a) { return a; }"
x未定义。
f("my args") = my arg
```

### 使用JavaScript变量

要打印_x_的值，我们添加以下代码：

```java
Object x = scope.get("x", scope);
if (x == Scriptable.NOT_FOUND) {
    System.out.println("x未定义。");
} else {
    System.out.println("x = " + Context.toString(x));
}
```

### 调用JavaScript函数

要获取函数_f_，调用它，并打印结果，我们添加以下代码：

```java
Object fObj = scope.get("f", scope);
if (!(fObj instanceof Function)) {
    System.out.println("f未定义或不是函数。");
} else {
    Object functionArgs[] = { "my arg" };
    Function f = (Function)fObj;
    Object result = f.call(cx, scope, scope, functionArgs);
    String report = "f('my args') = " + Context.toString(result);
    System.out.println(report);
}
```

## JavaScript宿主对象

### 定义宿主对象

自定义宿主对象可以实现特有的JavaScript功能，比如动态属性。

### 计数器示例

[计数器示例](https://github.com/mozilla/rhino/blob/master/examples/src/main/java/Counter.java)是一个简单的宿主对象。我们下面将按方法逐步讲解。

在壳中使用内置的`defineClass`函数，可以轻松尝试新的宿主对象类。稍后我们将看到如何将其添加到RunScript中。（注意，因为`java -jar`选项会预先执行其余的类路径，我们无法使用它访问`Counter`类。

```sh
$ java -cp "js.jar;examples" org.mozilla.javascript.tools.shell.Main
js> defineClass("Counter")
js> c = new Counter(7)
[object Counter]
js> c.count
7
js> c.count
8
js> c.count
9
js> c.resetCount()
js> c.count
0
```

### Counter的构造器

无参的构造器由Rhino运行时用于创建实例。对于计数器示例，不需要初始化工作，所以实现是空的。

```java
public Counter () { }
```

`jsConstructor`方法定义了用上述JavaScript代码中的表达式`new Counter(7)`调用的JavaScript构造器。

```java
@JSConstructor
public void Counter(int a) {
    count = a;
}
```

### 类名

`getClassName`方法定义了类名。这用于确定构造器的名称。

```java
public String getClassName() {
    return "Counter";
}
```

### 动态属性

动态属性由带有**@JSGetter**或**@JSSetter**注解的方法定义。方法`getCount`定义了`count`属性。

```java
@JSGetter
public int getCount() {
    return count++;
}
```

上述JavaScript代码中表达式`c.count`会调用这个方法。

### 定义JavaScript“方法”

可以使用**@JSFunction**注解定义方法。这里我们为JavaScript定义了`resetCount`方法。

```java
@JSFunction
public void resetCount() {
    count = 0;
}
```

上述调用`c.resetCount()`会调用此方法。

### 添加Counter到RunScript

现在看看[RunScript4示例](https://github.com/mozilla/rhino/blob/master/examples/src/main/java/RunScript4.java)。它与RunScript相同，除了两处更改。方法`ScriptableObject.defineClass`使用一个Java类在顶级scope定义了Counter“类”：

```java
ScriptableObject.defineClass(scope, Counter.class);
```

现在我们可以在脚本中引用`Counter`对象：

```sh
$ java RunScript4 "c = new Counter(3); c.count;
c.count;"
```

它还从我们的Java代码中创建了一个`Counter`对象的实例，用值7进行构造并将其分配给顶级变量`myCounter`：

```java
Object[] arg = { new Integer(7) };
Scriptable myCounter = cx.newObject(scope, "Counter", arg);
scope.put("myCounter", scope, myCounter);
```

现在我们可以在脚本中引用`myCounter`对象：

```sh
$ java RunScript3 'RunScript4 'myCounter.count; myCounter.count'
8
```
