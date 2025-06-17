---
title: "小巧体积"
---
# 小巧体积


---
可以进行一些更改以减少 Rhino 的占用空间，适用于空间有限的嵌入式应用。在最近的构建中，js.jar 的长度是 603,127 字节，对应包含调试信息的所有未压缩 Rhino 类的 1,171,708 字节。通过做出各种更改，js.jar 的大小可以减少到 204,689 字节，对应于 424,774 字节的未压缩类。

## 工具

大多数嵌入式应用不需要使用 `org.mozilla.javascript.tools` 或其子包中的任何类。

## 优化器

Rhino 可以仅在解释器模式下运行，这允许你移除用于生成类文件的代码，包括 `org.mozilla.javascript.optimizer` 包中的所有类。

## JavaAdapter

实现 JavaAdapter 功能需要支持动态生成类。移除 `org.mozilla.javascript.JavaAdapter` 会禁用此功能，但 Rhino 运行不会受影响。

## 类生成库

如果不包含优化器或 JavaAdapter，也不使用 PolicySecurityController，那么不需要 Rhino 的类文件生成库，你可以移除 `org.mozilla.classfile` 包中的所有类。

## 正则表达式

可以移除 `org.mozilla.javascript.regexp` 包。移除后 Rhino 仍然可以运行，但无法执行任何正则表达式匹配。这一更改可以节省 47,984 字节的类文件。

## 调试信息

Rhino 类中的调试信息占代码大小的约 25%，如果可以接受没有调试信息，你可以重新编译 Rhino 来移除它。

## smalljs.jar

Rhino 中的 Ant 构建脚本支持 `smalljar` 目标，可以生成不包含工具、优化器、JavaAdapter、类生成库、正则表达式、E4X 实现和废弃文件的 `smalljs.jar`。要构建不包含调试信息的精简版 jar，请在 Rhino 分发版的根目录运行以下命令：

```sh
ant clean
ant -Ddebug=off -Dno-regexp=true -Dno-e4x=true smalljar
```

如果省略 `-Dno-regexp=true`，生成的 `smalljs.jar` 将包括正则表达式支持。同样，省略 `-Dno-e4x=true` 会使 `smalljs.jar` 包含 E4X 的运行时支持。
