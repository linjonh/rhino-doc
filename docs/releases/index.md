---
title: 发布版本
has_children: true
child_nav_order: reversed
has_toc: false
---
# 发布版本

从 Rhino 1.4R3 开始（即首次公开发布版），提供发行说明以及包含源码和二进制文件的 zip 文件。

从 Rhino 1.7R5 开始，开发和发布通过 GitHub 上的 [Rhino 仓库](https://github.com/mozilla/rhino) 完成。

## 可用的工件
这些工件可以通过 GitHub 上的 [发布](https://github.com/mozilla/rhino/releases) 部分单独下载。有关每个发布版的更多信息，请参阅 [发布概览](#release-overview) 中的 `Release` 链接。

| 工件 | 描述 | 用途 | 备注 |
| --- | --- | --- | --- |
| `rhino-runtime-X.X.X.jar` | 精简版 jar，排除工具[^1] 和 JSR-223 脚本引擎封装 | 用于不需要任何工具[^1] 的嵌入场景 | [自 Rhino 1.7.12 起](new_in_rhino_1.7.12.md#new-jar-for-embedding-use-cases) |
| `rhino-X.X.X.jar` | 完整版 jar，包括工具[^1]，排除 JSR-223 脚本引擎封装 | 当需要任何工具[^1] 时使用，否则使用 `rhino-runtime-X.X.X.jar` 工件 | |
| `rhino-engine-X.X.X.jar` | JSR-223 脚本引擎封装 | 在通过 Java 脚本引擎接口使用 Rhino 时，与 `rhino-X.X.X.jar` 或 `rhino-runtime-X.X.X.jar` 工件结合使用 | [自 Rhino 1.7.13 起](new_in_rhino_1.7.13.md/#script-engine-support) |

:::注意
> 这些是当前 Rhino 最新发布版本中的可用工件。
> 历史上可能有其他可用工件。
:::

## Maven
Rhino 工件也可以通过 [MVNrepository](https://mvnrepository.com) 获取，组 ID 为 [org.mozilla](https://mvnrepository.com/artifact/org.mozilla)

| 工件 | artifactId |
| --- | --- |
| `rhino-runtime-X.X.X.jar` | [rhino-runtime](https://mvnrepository.com/artifact/org.mozilla/rhino-runtime) |
| `rhino-X.X.X.jar` | [rhino](https://mvnrepository.com/artifact/org.mozilla/rhino) |
| `rhino-engine-X.X.X.jar` | [rhino-engine](https://mvnrepository.com/artifact/org.mozilla/rhino-engine) |

## 发布概览

| 发布版本 | 发布日期 | 发行说明 | 链接 |
| --- | --- | --- | --- |
| Rhino 1.7.15 | 2022-05-04 | [发行说明](rhino_1.7.15.md) | [发布](https://github.com/mozilla/rhino/releases/tag/Rhino1_7_15_Release), [zip](https://github.com/mozilla/rhino/releases/download/Rhino1_7_15_Release/rhino-1.7.15.zip) |
| Rhino 1.7.14 | 2022-01-06 | [发行说明](rhino_1.7.14.md) | [发布](https://github.com/mozilla/rhino/releases/tag/Rhino1_7_14_Release), [zip](https://github.com/mozilla/rhino/releases/download/Rhino1_7_14_Release/rhino-1.7.14.zip) |
| Rhino 1.7.13 | 2020-09-02 | [发行说明](new_in_rhino_1.7.13.md) | [发布](https://github.com/mozilla/rhino/releases/tag/Rhino1_7_13_Release), [zip](https://github.com/mozilla/rhino/releases/download/Rhino1_7_13_Release/rhino-1.7.13.zip) |
| Rhino 1.7.12 | 2020-01-13 | [发行说明](new_in_rhino_1.7.12.md) | [发布](https://github.com/mozilla/rhino/releases/tag/Rhino1_7_12_Release), [zip](https://github.com/mozilla/rhino/releases/download/Rhino1_7_12_Release/rhino-1.7.12.zip) |
| Rhino 1.7.11 | 2019-05-30 | [发行说明](new_in_rhino_1.7.11.md) | [发布](https://github.com/mozilla/rhino/releases/tag/Rhino1_7_11_Release), [zip](https://github.com/mozilla/rhino/releases/download/Rhino1_7_11_Release/rhino-1.7.11.zip) |
| Rhino 1.7.10 | 2018-04-09 | [发行说明](new_in_rhino_1.7.10.md) | [发布](https://github.com/mozilla/rhino/releases/tag/Rhino1_7_10_Release), [zip](https://github.com/mozilla/rhino/releases/download/Rhino1_7_10_Release/rhino-1.7.10.zip) |
| Rhino 1.7.9 | 2018-03-15 | [发行说明](new_in_rhino_1.7.9.md) | [发布](https://github.com/mozilla/rhino/releases/tag/Rhino1_7_9_Release), [zip](https://github.com/mozilla/rhino/releases/download/Rhino1_7_9_Release/rhino-1.7.9.zip) |
| Rhino 1.7.8 | 2018-01-22 | [发行说明](new_in_rhino_1.7.8.md) | [发布](https://github.com/mozilla/rhino/releases/tag/Rhino1_7_8_Release), [zip](https://github.com/mozilla/rhino/releases/download/Rhino1_7_8_Release/rhino-1.7.8.zip) |
| Rhino 1.7.7.2 | 2017-08-24 | [发行说明](new_in_rhino_1.7.7.2.md) | [发布](https://github.com/mozilla/rhino/releases/tag/Rhino1_7_7_2_Release), [zip](https://github.com/mozilla/rhino/releases/download/Rhino1_7_7_2_Release/rhino-1.7.7.2.zip) |
| Rhino 1.7.7.1 | 2016-02-01 | [发行说明](new_in_rhino_1.7.7.1.md) | [发布](https://github.com/mozilla/rhino/releases/tag/Rhino1_7_7_1_Release), [zip](https://github.com/mozilla/rhino/releases/download/Rhino1_7_7_1_RELEASE/rhino-1.7.7.1.zip) |
| Rhino 1.7.7 | 2015-06-17 | [发行说明](new_in_rhino_1.7.7.md) | [发布](https://github.com/mozilla/rhino/releases/tag/Rhino1_7_7_Release), [zip](https://github.com/mozilla/rhino/releases/download/Rhino1_7_7_RELEASE/rhino1.7.7.zip) |
| Rhino 1.7.6 | 2015-04-15 | [发行说明](new_in_rhino_1.7.6.md) | [发布](https://github.com/mozilla/rhino/releases/tag/Rhino1_7_6_Release), [zip](https://github.com/mozilla/rhino/releases/download/Rhino1_7_6_RELEASE/rhino1.7.6.zip) |
| Rhino 1.7R5 | 2015-01-29 | [发行说明](new_in_rhino_1.7r5.md) | [发布](https://github.com/mozilla/rhino/releases/tag/Rhino1_7R5_Release), [zip](https://github.com/mozilla/rhino/releases/download/Rhino1_7R5_RELEASE/rhino1_7R5.zip) |
| Rhino 1.7R4 | 2012-06-18 | [Rhino 1.7R4 新功能](new_in_rhino_1.7r4.md) | [发布](https://github.com/mozilla/rhino/releases/tag/Rhino1_7R4_Release), [zip](https://github.com/mozilla/rhino/releases/download/Rhino1_7R4_RELEASE/rhino1_7R4.zip) |
| Rhino 1.7R3 | 2011-05-09 | [Rhino 1.7R3 新功能](new_in_rhino_1.7r3.md) | [zip](https://ftp.mozilla.org/pub/mozilla.org/js/rhino1_7R3.zip) |
| Rhino 1.7R2 | 2009-03-22 | [Rhino 1.7R2 新功能](new_in_rhino_1.7r2.md) | [zip](https://ftp.mozilla.org/pub/mozilla.org/js/rhino1_7R2.zip) |
| Rhino 1.7R1 | 2008-03-06 | [Rhino 1.7R1 新功能](new_in_rhino_1.7r1.md) | [zip](https://ftp.mozilla.org/pub/mozilla.org/js/rhino1_7R1.zip) |
| Rhino 1.6R7 | 2007-08-20 | [Rhino 1.6R7 新功能](new_in_rhino_1.6r7.md) | [zip](https://ftp.mozilla.org/pub/mozilla.org/js/rhino1_6R7.zip) |
| Rhino 1.6R6[^2] | 2007-07-30 | [Rhino 1.6R6 新功能](new_in_rhino_1.6r6.md) | [zip](https://ftp.mozilla.org/pub/mozilla.org/js/rhino1_6R6.zip) |
| Rhino 1.6R5[^2] | 2006-11-19 | 1.6R4 重新授权为 MPL/GPL | [zip](https://ftp.mozilla.org/pub/mozilla.org/js/rhino1_6R5.zip) |
| Rhino 1.6R4[^2] | 2006-09-10 | [bug 343976](https://bugzilla.mozilla.org/show_bug.cgi?id=343976) | [zip](https://ftp.mozilla.org/pub/mozilla.org/js/rhino1_6R4.zip) |
| Rhino 1.6R3[^2] | 2006-07-24 | [1.6R3 的变更](new_in_rhino_1.6r3.md) | [zip](https://ftp.mozilla.org/pub/mozilla.org/js/rhino1_6R3.zip) |
| Rhino 1.6R2[^2] | 2005-09-19 | [1.6R2 的变更](new_in_rhino_1.6r2.md) | [zip](https://ftp.mozilla.org/pub/mozilla.org/js/rhino1_6R2.zip) |
| Rhino 1.6R1[^2] | 2004-11-29 | [1.6R1 的变更](new_in_rhino_1.6r1.md) | [zip](https://ftp.mozilla.org/pub/mozilla.org/js/rhino1_6R1.zip) |
| Rhino 1.5R5[^2] | 2004-03-25 | [1.5R5 的变更](new_in_rhino_1.5r5.md) | [zip](https://ftp.mozilla.org/pub/mozilla.org/js/rhino1_5R5.zip) |
| Rhino 1.5R4.1 | 2003-04-21 | [1.5R4.1 的变更](new_in_rhino_1.5r4.1.md) | [zip](https://ftp.mozilla.org/pub/mozilla.org/js/rhino15R41.zip) |
| Rhino 1.5R4 | 2003-02-10 | [1.5R4 的变更](new_in_rhino_1.5r4.md) | [zip](https://ftp.mozilla.org/pub/mozilla.org/js/rhino15R4.zip) |
| Rhino 1.5R3 | 2002-01-27 | [1.5R3 的变更](new_in_rhino_1.5r3.md) | [zip](https://ftp.mozilla.org/pub/mozilla.org/js/rhino15R3.zip) |
| Rhino 1.5R2 | 2001-07-27 | [1.5R2 的变更](new_in_rhino_1.5r2.md) | [zip](https://ftp.mozilla.org/pub/mozilla.org/js/older-packages/rhino15R2.zip) |
| Rhino 1.5R1 | 2000-09-10 | [1.5R1 的变更](new_in_rhino_1.5r1.md) | [zip](https://ftp.mozilla.org/pub/mozilla.org/js/older-packages/rhino15R1.zip) |
| Rhino 1.4R3 | 1999-05-10 | 初次公开发布版本 | [zip](https://ftp.mozilla.org/pub/mozilla.org/js/older-packages/rhino14R3.zip) |


[^1]: Rhino 工具包括：
    - [调试器](../tools/debugger.md)：基于 Swing 的视觉化调试器
    - [Shell](../tools/shell.md)：交互式 JavaScript [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)
    - [JavaScript 编译器](../tools/javascript_compiler.md)：将 JavaScript 编译为 Java 类文件的命令行工具

    :::注意
    > 一些自动化源代码扫描工具将这些功能标记为不安全，因此提供了排除工具的 rhino-runtime-X.X.X.jar。
    :::
[^2]: Rhino 1.6R1 至 1.6R6 使用 [XMLBeans](https://xmlbeans.apache.org/) 库实现了 [E4X](https://developer.mozilla.org/en-US/docs/Archive/Web/E4X)。

    如果需要使用 E4X，请将 XMLBeans 发布版的 `xbean.jar` 添加到您的类路径中。

    从 Rhino 1.6R6 起，E4X 支持已重新实现，仅依赖 Java 1.5 原生支持的 DOM3 API。

    对于 Java 1.5 版本前的用户，可以使用 Java 的标准覆盖机制来使用支持 DOM3 的 XML 解析器。

    如果 XMLBeans 或 DOM3 未提供支持，则无法使用 E4X。