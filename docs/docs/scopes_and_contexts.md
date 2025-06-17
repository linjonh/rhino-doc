---
title: "作用域和上下文"
---

# 作用域和上下文


在并发环境中使用 Rhino 之前，理解上下文和作用域之间的区别很重要。这两者都用于执行脚本，但它们的作用不同。简单的 Rhino 嵌入可能不需要这里的任何信息，但较复杂的嵌入可以从以下描述的技术中获得性能和灵活性上的提升。

## 上下文

Rhino 的 Context 对象用于存储与线程相关的执行环境信息。每个执行 JavaScript 的线程应该且只应该关联一个 Context。

要将当前线程与 Context 关联起来，只需调用 Context 的 `enter` 方法：

```java
Context cx = Context.enter();
```

执行完成后，只需退出 Context：

```java
Context.exit();
```

即使当前线程已经有一个 Context，这些调用也会正常工作。现有 Context 会被返回，并且内部计数器会递增。只有当计数器降到零时，Context 才会与线程解除关联。

如果正在执行可能会抛出异常的代码，请记住在 `finally` 块中放置 `exit()` 调用。

## 作用域

作用域是一组 JavaScript 对象。执行脚本需要一个顶级的脚本变量存储作用域，以及一个查找标准对象（如 `Function` 和 `Object`）的地方。

需要理解的是，作用域独立于创建它的 Context。您可以使用一个 Context 创建作用域，然后使用另一个 Context（通过退出当前 Context 并进入另一个 Context，或者在不同线程上执行）来评估脚本。甚至可以在多个线程中同时在同一作用域内执行脚本。Rhino 保证对 JavaScript 对象属性的访问在跨线程时具有原子性，但对于同时在同一作用域执行的脚本没有额外的保证。如果两个脚本同时使用同一个作用域，这些脚本需负责协调对共享变量的访问。

通过调用 `Context.initStandardObjects` 创建所有标准对象以生成一个顶级作用域：

```java
ScriptableObject scope = cx.initStandardObjects();
```

嵌入 Rhino 的最简单方法是每次需要一个作用域时就这样创建一个新的作用域。然而，`initStandardObjects` 是一个昂贵的方法，它会分配相当多的内存。下面我们将看到如何在多个作用域和线程之间共享以这种方式创建的作用域。

## 名称查找

作用域是如何用于查找名称的呢？通常，通过从当前变量对象开始查找变量（该对象因程序中正在执行的代码不同而不同），然后遍历其原型链，然后遍历父链。在下图中，表示六个对象被调试的顺序。

![具有原型的两层作用域链中的查找顺序。](../assets/images/lookup.gif)
**具有原型的两层作用域链中的查找顺序。**

下面让我们通过一个具体的例子来进一步说明：

```js
var g = 7;

function f(a) {
  var v = 8;
  x = v + a;
}

f(6);
```

我们有一个顶级变量 `g`，调用 `f` 将创建一个新的顶级变量 `x`。所有顶级变量都是作用域对象的属性。当我们开始执行 `f` 时，作用域链将从函数的激活对象开始，最终到达顶级作用域（见下图）。激活对象有两个属性，分别是参数 `a` 和变量 `v`。顶级作用域则有变量 `g` 和函数 `f` 的属性。

![简单脚本的作用域链示例。](../assets/images/scopes.gif)
**简单脚本的作用域链示例。**

当执行 `x = v + a;` 语句时，将遍历作用域链查找属性 `x`。当未找到时，将在顶级作用域中创建一个新的属性 `x`。

## 共享作用域

JavaScript 是一种使用委托而不是传统基于类的继承的语言。这本身就是一个很大的话题，但对于我们的目的而言，它为我们提供了一种简单的方法，可以在多个作用域之间共享一组只读变量。

我们通过设置对象的原型来实现这一点。当在 JavaScript 中访问对象属性时，首先访问该对象以查找具有给定名称的属性。如果未找到，则访问该对象的原型。这种情况会一直持续到找到目标对象或到达原型链的末端。

因此，为了在多个作用域中共享信息，我们首先创建希望共享的对象。通常该对象是使用 `initStandardObjects` 创建的，并且可能还具有嵌入特定的其他对象。然后，只需创建一个新的对象，并调用它的 `setPrototype` 方法，将原型设置为共享对象，并将新作用域的父级设置为 null：

```java
Scriptable newScope = cx.newObject(sharedScope);
newScope.setPrototype(sharedScope);
newScope.setParentScope(null);
```

调用 `newObject` 只是创建了一个没有属性的新 JavaScript 对象。它利用传入的 `sharedScope` 初始化原型，设置为标准的 `Object.prototype` 值。

我们现在可以将 `newScope` 用作评估脚本调用的作用域。我们可以称这个作用域为 _实例作用域_。在脚本中定义的任何顶级函数或变量都会成为实例作用域的属性。使用像 `Function`、`String` 或 `RegExp` 这样的标准对象时，会在共享作用域中找到定义。可以定义多个实例作用域，并为各自的脚本拥有自己的变量，同时共享共享作用域中的定义。这些多个实例作用域可以同时使用。

## 密封的共享作用域

ECMAScript 标准定义了脚本可以向所有标准库对象添加属性，并且在许多情况下也可以更改或删除它们的属性。这种行为可能不适用于共享作用域，因为如果脚本错误地向共享作用域的库对象添加了一个属性，该对象将无法被垃圾回收，直到共享作用域的活动引用不存在为止，从而可能导致内存泄漏。此外，如果脚本更改了某些标准对象，库可能无法正确地为其他脚本工作。这类错误很难进行调试，为了消除发生它们的可能性，可以对共享作用域及其所有对象进行密封。

密封对象的概念是 Rhino 支持的一种 JavaScript 扩展，这意味着无法向对象添加/删除属性，并且无法更改现有的对象属性。任何试图修改密封对象的操作都会抛出异常。要对标准库中所有对象进行密封，在调用 `Context.initStandardObjects(ScriptableObject, boolean)` 时对 `sealed` 参数传递 `true`：

```java
ScriptableObject sealedSharedScope = cx.initStandardObjects(null, true);
```

这仅对所有标准库对象进行密封，而不对共享作用域本身进行密封，因此调用 `initStandardObjects` 后，仍可以通过应用特定的对象和函数对 `sealedSharedScope` 进行进一步的填充。自定义初始化完成后，可以通过调用 `ScriptableObject.sealObject()` 将共享作用域进行密封：

```java
sealedSharedScope.sealObject();
```

请注意，目前需要显式密封添加到密封共享作用域中的任何额外属性，因为尽管调用 `sealedSharedScope.sealObject();` 后无法将额外属性设置为不同的值，但仍然可能修改对象本身。

请注意，为了从密封的共享作用域中使用 Java 类（LiveConnect），需要在作用域被密封之前预加载作用域中需要的多个用于 LiveConnect 的对象。这些对象通常是懒加载的，但在作用域被密封后，懒加载会失败。

```java
ScriptableObject sealedSharedScope  = cx.initStandardObjects(null, true);

// 强制加载 LiveConnect 所需的内容。
String loadMe = "RegExp; getClass; java; Packages; JavaAdapter;";
cx.evaluateString(sealedSharedScope , loadMe, "lazyLoad", 0, null);
sealedSharedScope .sealObject();
```

## 动态作用域

上述设置存在一个问题。对 JavaScript 函数的调用使用 _静态作用域_，这意味着首先在函数中查找变量，之后如果未找到，再在词法上包含的作用域中查找。如果您在共享作用域中定义的函数需要访问您在实例作用域中定义的变量，则会出现问题。

在 Rhino 1.6 中，可以使用 _动态作用域_。使用动态作用域时，函数查看当前执行脚本的顶级作用域，而不是词法作用域。因此我们可以将跨作用域变化的信息存储在实例作用域中，同时仍然共享在共享作用域中操作该信息的函数。

[DynamicScopes 示例](https://github.com/mozilla/rhino/blob/master/examples/src/main/java/DynamicScopes.java) 展示了上述所有讨论的要点。

## 关于作用域的更多内容

为您的应用程序设置作用域时需要确定的关键问题是：

1. 当您的脚本执行对未定义变量的赋值时，全局变量应该在哪个作用域中创建，以及
2. 当您的脚本引用变量时，它应该有权限访问哪些变量？
