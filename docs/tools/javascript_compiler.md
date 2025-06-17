---
title: "JavaScript编译器"
---

# JavaScript编译器



## 概述

JavaScript编译器将JavaScript源代码转换为Java类文件。生成的Java类文件可以稍后加载和执行，提供了一种方便的方法来传输JavaScript，同时避免了翻译成本。

请注意，shell中可用的顶级函数（例如print）在编译的脚本在shell之外运行时不可用。

## 编译器命令行

`java org.mozilla.javascript.tools.jsc.Main` [_options_] `file1.js [file2.js...]`

其中 _options_ 是：

`-extends` _java-class-name_

指定从传入的JavaScript源文件生成的Java类应扩展Java类 _java-class-name_。源文件中的每个全局函数都会成为生成类的方法，并覆盖基类中具有相同名称的任意方法。

`-implements` _java-intf-name_

指定从传入的JavaScript源文件生成的Java类应实现Java接口 _java-intf-name_。源文件中的每个全局函数都会成为生成类的方法，并实现接口中具有相同名称的任意方法。

`-debug

 -g`

指定应生成调试信息。不能与优化级别大于零的optLevel同时使用。

`-main-method-class` _className_

指定用于主方法实现的类名称。该类必须具有与`public static void main(Script sc, String[] args)`匹配的方法。

`-nosource`

不将源代码保存在类文件中。以这种方式编译的函数和脚本无法被反编译。此选项可用于避免分发源代码或仅为节省生成类文件中的空间。

`-o` _outputFile_

将类文件写入 _outputFile_，其文件名应以.class结尾且必须是一个可写的文件名。

`-d` _outputDirectory_

将类文件写入 _outputDirectory_。

`-opt` _optLevel_

以级别 _optLevel_ 进行优化，该级别必须是介于-1到9之间的整数。有关更多详细信息，请参见[优化](./docs/optimization.md)。如果 _optLevel_ 大于零，则不得指定`-debug`。

`-package` _packageName_

指定将类生成到的包。字符串 _packageName_ 必须由有效的标识符字符组成，或者由点分隔。

`-version` _versionNumber_

指定编译时使用的语言版本。字符串_versionNumber_必须为100、110、120、130、140、150、160或170之一。有关语言版本的更多信息，请参见[JavaScript语言版本](./docs/overview.md#javascript_language_versions)。

## 示例

```sh
$ cat test.js
java.lang.System.out.println("你好，妈妈！");

$ java org.mozilla.javascript.tools.jsc.Main test.js

$ ls *.class
test.class

$ java test
你好，妈妈！

$ java org.mozilla.javascript.tools.jsc.Main -extends java.applet.Applet
    -implements java.lang.Runnable NervousText.js
```
