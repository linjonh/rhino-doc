---
title: "Shell"
---

# Shell


---
JavaScript Shell提供了一种简单的方法，可以以批处理模式运行脚本，或者在交互式环境中进行探索式编程。

## 调用Shell

`java org.mozilla.javascript.tools.shell.Main [options] script-filename-or-url [script-arguments]`

其中`options`包括：

`-e script-source`

将_script-source_执行为JavaScript脚本。

`-f script-filename-or-url`

读取_script-filename-or-url_的内容并将其作为JavaScript脚本执行。

### `-opt optLevel` / `-O optLevel`

优化到_optLevel_指定的级别，该级别必须为`-1`或介于`0`到`9`之间的整数。详情参见[Rhino优化](./docs/optimization.md)。

`-version versionNumber`

指定编译时的语言版本。字符串_versionNumber_必须是`100`、`110`、`120`、`130`、`140`、`150`、`160`或`170`之一。有关语言版本的更多信息，请参见[JavaScript语言版本](./docs/overview.md#javascript_language_versions)。

`-strict`

启用严格模式。

`-continuations`

启用对continuations的实验性支持，并将优化级别设置为-1以强制为解释模式。从Rhino 1.7开始，此选项不再可用。

### 注意

如果在安装了安全管理器并将系统属性`rhino.use_java_policy_security`设置为`true`的情况下调用Shell，Shell将根据Java策略设置限制脚本的权限（基于脚本的URL），此功能仅在JVM实现了Java2安全模型时可用。

## 预定义属性

在Shell中执行的脚本可以访问顶级对象的一些额外属性。

`arguments`

`arguments`对象是一个数组，包含调用Shell时命令行中提供的所有参数的字符串。

`environment`

返回当前环境对象。

`history`

显示Shell命令的历史记录。

`help()`

执行`help`函数将打印使用帮助信息。

`defineClass(className)`

使用字符串参数_className_表示的Java类定义一个扩展。使用`ScriptableObject.defineClass()`来定义扩展。

`deserialize(filename)`

从指定文件中恢复以前通过调用`serialize`写入的对象。

`gc()`

运行垃圾回收。

`load([filename, ...])`

加载由字符串参数指定的JavaScript源文件。如果提供多个参数，则每个文件依次读取并执行。

`loadClass(className)`

加载并执行由字符串参数_className_表示的类。此类必须是实现Script接口的类，与任何通过[Rhino JavaScript编译器](javascript_compiler.md)编译的脚本一致。

`print([expr ...])`

计算表达式并打印结果。计算每个表达式，将结果转换为字符串并打印。

`readFile(path [, characterCoding])`

读取指定文件，并使用指定的字符编码或默认字符编码将其字节转换为字符串。

`readUrl(url [, characterCoding])`

打开到字符串url的输入连接，读取其所有字节并将其转换成字符串，使用指定的字符编码或默认字符编码。

`runCommand(commandName, [arg, ...] [options])`

执行指定命令，并带有给定的参数和选项作为独立进程运行，返回进程的退出状态。

用法：

```sh
runCommand(command)
runCommand(command, arg1, ..., argN)
runCommand(command, arg1, ..., argN, options)
```

传递给`runCommand`的最后一个参数是JavaScript对象，它是选项对象。否则，它将被转换为字符串并表示最后的参数，假定选项对象为空。

选项对象的以下属性被处理：

- `args` - 提供额外命令参数的数组。
- `env` - 显式环境对象。它的所有可枚举属性定义对应的环境变量名称。
- `input` - 进程输入。如果不是`java.io.InputStream`，则将其转换为字符串并作为进程输入发送。如果未指定，则不向进程提供输入。
- `output` - 进程输出替代`java.lang.System.out`。如果不是`java.io.OutputStream`实例，则读取进程输出，将其转换为字符串，与输出属性值（已转换为字符串）附加在一起，并作为新值赋予输出属性。
- `err` - 进程错误输出替代`java.lang.System.err`。如果不是`java.io.OutputStream`实例，则读取进程错误输出，将其转换为字符串，与错误属性值（已转换为字符串）附加在一起，并作为新值赋予错误属性。

`seal(object)`

封闭指定对象，使得任何试图添加、删除或修改其属性的操作都会抛出异常。

`serialize(object, filename)`

将给定对象序列化到指定文件。

`spawn(functionOrScript)`

在不同线程中运行指定函数或脚本。

`sync(function)`

从现有功能创建同步功能（类似于Java中的`同步`方法）。新功能在其调用的`this`对象上同步。

`quit()`

退出Shell。如果在交互模式下在提示符处输入文件结束符字符，Shell也将退出。

`version([number])`

获取或设置JavaScript版本号。如果未提供参数，则返回当前版本号。如果提供参数，参数应为`100`、`110`、`120`、`130`、`140`、`150`、`160`或`170`中的一个，以表示JavaScript 1.0、1.1、1.2、1.3、1.4、1.5、1.6或1.7版本。

## 示例

### 调用

下面是在命令行中调用Shell的三次示例（系统命令提示符显示为`$`）。第一次调用在命令行中直接执行脚本。第二次调用没有参数，因此Shell进入交互模式，逐行读取和评估输入。最后一次调用执行文件中的脚本并访问脚本本身的参数。

```sh
$ java org.mozilla.javascript.tools.shell.Main -e "print('hi')"
hi

$ java org.mozilla.javascript.tools.shell.Main
js> print('hi')
hi
js> 6*7
42
js> function f() {
  return a;
}
js> var a = 34;
js> f()
34
js> quit()

$ cat echo.js
for (i in arguments) {
  print(arguments[i])
}

$ java org.mozilla.javascript.tools.shell.Main echo.js foo bar
foo
bar
```

### `spawn`和`sync`

以下示例通过`spawn`创建两个线程，并使用`sync`创建了函数`test`的同步版本。

```js
js> function test(x) {
  print("进入");
  java.lang.Thread.sleep(x*1000);
  print("退出");
}
js> var o = { f : sync(test) };
js> spawn(function() {o.f(5);});
Thread[Thread-0,5,main]
进入
js> spawn(function() {o.f(5);});
Thread[Thread-1,5,main]
js>
退出
进入
退出
```

`runCommand`

下面是一些在Linux下调用`runCommand`的示例。

```js
js> runCommand('date')
Thu Jan 23 16:49:36 CET 2003
0
// 使用input选项提供进程输入
js> runCommand("sort", {input: "c\na\nb"})
a
b
c
0
js> // 输出与err选项演示
js> var opt={input: "c\na\nb", output: '排序输出:\n'}
js> runCommand("sort", opt)
0
js> print(opt.output)
排序输出:
a
b
c
js> var opt={input: "c\na\nb", output: '排序输出:\n', err: ''}
js> runCommand("sort", "--bad-arg", opt)
2
js> print(opt.err)
/bin/sort: 无法识别的选项 `--bad-arg`
使用 `/bin/sort --help` 获取更多信息。

js> runCommand("bad_command", "--bad-arg", opt)
js: "<stdin>", line 18: 未捕获的JavaScript异常: java.io.IOException: bad_command: 未找到
js> // 向系统Shell传递显式环境
js> runCommand("sh", "-c", "echo $env1 $env2", { env: {env1: 100, env2: 200}})
100 200
0
js> // 使用args选项提供额外命令参数
js> var arg_array = [1, 2, 3, 4];
js> runCommand("echo", { args: arg_array})
1 2 3 4
0
```

Windows示例类似：

```js
js> // 调用Shell命令
js> runCommand("cmd", "/C", "date /T")
27.08.2005
0
js> // 运行sort并收集输出
js> var opt={input: "c\na\nb", output: '排序输出:\n'}
js> runCommand("sort", opt)
0
js> print(opt.output)
排序输出:
a
b
c
js> // 启动记事本并等待其退出
js> runCommand("notepad")
0
```
