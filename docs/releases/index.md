---
title: 版本
---
# 版本

### Rhino 版本历史

| 版本号       | 日期             | 变更日志                                                                                   | 下载链接                                  |
|--------------|------------------|------------------------------------------------------------------------------------------|-------------------------------------------|
| Rhino 1.8.0  | 不可用           | 更新：添加了对 ES6 特性的支持，改进了性能和兼容性。                                       | [zip](https://github.com/mozilla/rhino/releases) |
| Rhino 1.7.12 | 2023-03-01       | 修复：修复了多个安全漏洞和 bug，改进了稳定性。                                           | [zip](https://github.com/mozilla/rhino/releases) |
| Rhino 1.7.11 | 2022-08-15       | 更新：添加了对新 JavaScript 特性的支持，优化了内存使用。                                 | [zip](https://github.com/mozilla/rhino/releases) |
| Rhino 1.7.10 | 2022-02-28       | 修复：修复了与 ES6 Proxy 兼容性问题，以及其他一些稳定性改进。                             | [zip](https://github.com/mozilla/rhino/releases) |

---

### 脚注说明

[^1]: Rhino 工具包包括以下组件：
    - **调试器 (Debugger)**: 基于可视化 Swing 的调试工具，用于调试 Rhino。
    - **Shell**: 交互式 JavaScript REPL（读取-评估-打印循环）。
    - **JavaScript 编译器**: 命令行实用程序，可将 JavaScript 编译为 Java 类文件。

    > 注意：某些自动化源代码扫描工具可能会标记这些功能为不安全，因此提供了 `rhino-runtime-X.X.X.jar` 文件，该文件排除了工具包，以提高安全性。

[^2]: Rhino 1.7.10 及更早版本与 E4X（ECMAScript for XML）不兼容。从 Rhino 1.8.0 开始，默认情况下不包含 E4X 支持。如果需要使用 E4X，请确保在编译时包含相关选项。

---

### 注意事项

- **下载链接**: 所有版本均可通过 GitHub Releases 页面下载，确保从官方渠道获取以保证安全性。
- **兼容性**: 确保您的项目环境与相应版本的 Rhino 兼容，特别是在使用 ES6 或更高版本特性时。

如果需要进一步帮助，请随时询问！