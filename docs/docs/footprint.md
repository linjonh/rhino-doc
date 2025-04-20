---
title: "资源占用小"
---

# 资源占用小

通过一些修改，可以缩减Rhino在嵌入式环境中占用的空间，尤其是在存储资源有限的场景下。近期的一个构建中，`js.jar`的大小为603,127字节，对应于包含调试信息的所有未压缩Rhino类文件，总计1,171,708字节。通过各种更改，`js.jar`的大小可以减少到204,689字节，对应于424,774字节的未压缩类文件。

## 工具

大多数嵌入式环境不需要`org.mozilla.javascript.tools`包或其子包中的任何类。

## 优化器

Rhino可以仅运行解释器模式，这样就可以删除包括所有来自`org.mozilla.javascript.optimizer`包的类文件生成代码。

## JavaAdapter

实现JavaAdapter功能需要能够动态生成类。移除`org.mozilla.javascript.JavaAdapter`将禁用此功能，但Rhino仍然可以正常运行。

## 类文件生成库

如果不包含优化器或JavaAdapter，也不使用PolicySecurityController，则不需要Rhino的类文件生成库，可以从`org.mozilla.classfile`包中移除所有类。

## 正则表达式

`org.mozilla.javascript.regexp`包可以被移除。Rhino仍然可以运行，但将无法执行任何正则表达式匹配。此更改节省了47,984字节的类文件。

## 调试信息

Rhino类中的调试信息占代码大小的约25%，如果不需要调试信息，可以重新编译Rhino以移除它。

## smalljs.jar

Rhino的Ant构建脚本支持`smalljar`目标，生成的`smalljs.jar`不包括工具、优化器、JavaAdapter和类文件生成库、正则表达式、E4X实现以及过时的文件。要在调试信息的情况下构建一个最小的jar包，请从Rhino发行版的顶级目录运行以下命令：

```sh
ant clean
ant -Ddebug=off -Dno-regexp=true -Dno-e4x=true smalljar
```

如果省略`-Dno-regexp=true`，生成的`smalljs.jar`将包含正则表达式支持。同样，省略`-Dno-e4x=true`将导致`smalljs.jar`包含E4X的运行时支持。