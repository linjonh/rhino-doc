---
title: Rhino 1.7.14 发布说明
date: 2023-10-25
---

# Rhino 1.7.14 发布说明

## 链接

[Test262 测试套件](https://tc39.es/test262/)

[kangax ES6 兼容性表](https://kangax.github.io/compat-table/es6/)

[@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)

## 主要亮点

### 功能改进

#### ECMAScript 功能
- **Promise**：支持基于 Promise 的异步操作。
- **BigInt**：新增对大整数的支持。
- **Template Literal**：引入了模板字符串功能，方便字符串拼接。
- **其他增强**：包括对更多 ES6+ 特性的支持。

#### 重大更改
- **上下文关闭**：`Context` 现在实现了 `Closable` 接口，允许显式释放资源。
- **Lambda 表示**：引入了 `LambdaFunction` 和 `LambdaConstructor`，用于表示和构造 Java lambda 函数。

#### 错误处理
- **内部错误**：改为在无法访问 Java 异常类时抛出 `InternalError` 而非包装的 `JavaException`。

### 性能优化

- 代码路径优化，提升执行效率。
- 内存管理改进，减少内存泄漏风险。

## 测试与质量保障

#### Test262 支持
- 更新至最新版本的 Test262 测试套件，以确保符合 ECMAScript 规范。
- 提供更详细的文档和更多配置选项，便于测试运行。
- 自动生成 `test262.properties` 文件，反映实际测试通过情况。
- 提升测试失败反馈，帮助快速定位问题。

## Java 交互

- **列表处理**：自动调整 Java 列表大小以适应 `.put(...)` 操作需求。
- **子列表支持**：在 JavaScript 数组中启用 `java.util.subList()` 支持。
- **增强互操作性**：改进了 Java 与 JavaScript 之间的数据交换机制。

## 内部改进

- **代码结构**：移除了 `idSwitch`，简化内部逻辑。
- **Slot 管理**：重构了 `SlotMap` 和 Slot 的实现，提升维护性。
- **抽象操作**：开始提取与 ECMAScript 规范中定义的抽象操作相关的逻辑。

## 其他改进

- **代码格式化**：引入 Spotless 自动格式化 Java 代码。
- **CI 构建**：迁移至 CircleCI，并启用 GitLab CI，支持在多个 Java 版本上运行测试。
- **模块化支持**：自动为模块生成名称，便于依赖管理。

## 感谢

此版本包含来自 23 位贡献者的超过 350 个提交。感谢每一位帮助改进 Rhino 的开发者！

特别鸣谢：
- [gbrail](https://github.com/gbrail) 对 `Context` 接口和 lambda 支持的重大贡献。
- [youngj](https://github.com/youngj) 在错误处理上的精彩表现。

# 获取方式

可以从 [官方网站] 或 [GitHub 发布页] 下载 Rhino 1.7.14 版本。同时，通过 npm 使用：
```bash
npm install rhino@1.7.14
```

[官方网站]: https://developer.mozilla.org/zh-CN/docs/Rhino
[GitHub 发布页]: https://github.com/mozilla/rhino/releases/tag/1.7.14-release
