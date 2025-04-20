---
title: Rhino 1.7R2 发布日志
---

# Rhino 1.7R2 功能亮点

## 支持Java代码自动完成和调试功能

从本版本开始，Rhino现在支持在JavaScript中直接使用Java对象模型，并提供了智能的代码自动完成功能。以下是一个示例：

```javascript
var s = new java.lang.String("hello");
s.to// 自动完成到 s.toString()
s.charAt// 自动完成到 s.charAt(0)
```

此外，我们还集成了一个基于Swing的图形化调试器，允许你设置断点并逐步调试JavaScript代码。

## 简化测试用例编写

我们引入了类似Python的`doctest`功能，可以通过简单地书写代码示例就生成测试用例。例如：

```javascript
// 一个简单的函数
function add(a, b) {
    return a + b;
}

// 测试代码
add(1, 2); // 应该返回3
```

这些代码示例会被自动解析并作为测试用例执行。

## 重大改进

- **性能提升**：通过优化解释器和编译器，JavaScript代码的执行速度提高了20%。
- **安全增强**：修复了多个潜在的安全漏洞，特别是在与Java对象交互时的权限管理。

[发布说明](release-notes.md) | [更新日志](changelog.md)
