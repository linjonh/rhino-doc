---
title: "JavaScript 编译器"
---

# JavaScript 编译器


---

## 概述

JavaScript 编译器将 JavaScript 源代码转换为 Java 类文件。生成的 Java 类文件可以稍后加载和执行，从而提供了一种便捷的方法来传输 JavaScript，并避免了翻译成本。

请注意，顶级函数（如 print）在脚本外部运行时不会对编译后的脚本生效。

## 编译器命令行

`java org.mozilla.javascript.tools.jsc.Main` [_options_] `file1.js [file2.js...]`

其中 _options_ 包括：

`-extends` _java-class-name_

指定生成的 Java 类应扩展 Java 类 _java-class-name_。每个源文件中的全局函数将成为生成类的方法，如果基类中有相同名称的方法，则会被覆盖。

`-implements` _java-intf-name_

指定生成的 Java 类应实现 Java 接口 _java-intf-name_。每个源文件中的全局函数将成为生成类的方法，如果接口中有相同名称的方法，则会被实现。

`-debug` 或 `-g`

指定生成调试信息。不可以与大于零的 optLevel 优化一起使用。

`-main-method-class` _className_

指定用于 main 方法实现的类名。该类必须包含匹配 `public static void main(Script sc, String[] args)` 的方法。

`-nosource`

不保存源代码到类文件中。此方式编译的函数和脚本无法反编译。可以使用此选项以避免分发源代码或节省生成的类文件空间。

`-o` _outputFile_

将类文件写入 _outputFile_，其扩展名应为 .class，并且必须是一个可写的文件名。

`-d` _outputDirectory_

将类文件写入 _outputDirectory_。

`-opt` _optLevel_

在级别 _optLevel_ 进行优化，其值必须是 -1 到 9 之间的整数。详细信息请参阅 [优化](./docs/optimization.md)。如果 _optLevel_ 大于零，则不能指定 `-debug`。

`-package` _packageName_

指定生成类所在的包。字符串 _packageName_ 必须由有效的标识符字符组成，可能用点分隔。

`-version` _versionNumber_

指定编译时使用的语言版本。字符串 _versionNumber_ 必须是 100、110、120、130、140、150、160 或 170 之一。有关语言版本的详细信息，请参阅 [JavaScript 语言版本](./docs/overview.md#javascript_language_versions)。

## 示例

```sh
$ cat test.js
java.lang.System.out.println("hi, mom!");

$ java org.mozilla.javascript.tools.jsc.Main test.js

$ ls *.class
test.class

$ java test
hi, mom!

$ java org.mozilla.javascript.tools.jsc.Main -extends java.applet.Applet
    -implements java.lang.Runnable NervousText.js
```