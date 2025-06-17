---
title: Rhino 1.7.14
parent: Releases
nav_order: 27
---

# Rhino 1.7.14


# 链接
* [1.7.14 里程碑](https://github.com/mozilla/rhino/milestone/14)
* [所有合并的 PRs](https://github.com/mozilla/rhino/pulls?q=is%3Apr+merged%3A2020-09-02..2022-01-06+)

# 要点
## 特性
### ECMAScript 特性
* [#160](https://github.com/mozilla/rhino/issues/160) Promise 支持 ([@gbrail](https://github.com/gbrail))
* [#837](https://github.com/mozilla/rhino/issues/837) BigInt 支持 ([@tuchida](https://github.com/tuchida))
* [#243](https://github.com/mozilla/rhino/issues/243) 模板字面量支持 ([@p-bakker](https://github.com/p-bakker))
* [#879](https://github.com/mozilla/rhino/issues/879) String.raw ([@tonygermano](https://github.com/tonygermano))
* [#977](https://github.com/mozilla/rhino/issues/977) JSON 超集支持 ([@tuchida](https://github.com/tuchida))
* [#932](https://github.com/mozilla/rhino/issues/932) globalThis ([@p-bakker](https://github.com/p-bakker))
* [#838](https://github.com/mozilla/rhino/issues/838) 指数运算符支持 ([@tuchida](https://github.com/tuchida))
* [#853](https://github.com/mozilla/rhino/issues/853) 简写属性名支持 ([@tuchida](https://github.com/tuchida))
* [#902](https://github.com/mozilla/rhino/issues/902) Object.values / Object.entries / Object.fromEntries 支持 ([@rPraml](https://github.com/rPraml))
* [#883](https://github.com/mozilla/rhino/issues/883) Number.EPSILON 支持 ([@tonygermano](https://github.com/tonygermano))

### 非 ECMAScript 特性
* [#153](https://github.com/mozilla/rhino/issues/153) 在 Error 构造器中添加 stack 属性 ([@gbrail](https://github.com/gbrail))
* [#888](https://github.com/mozilla/rhino/issues/888) 支持 Mozilla 风格的栈格式 ([@rbri](https://github.com/rbri))

[所有特性](https://github.com/mozilla/rhino/issues?q=milestone%3A%22Release+1.7.14%22+label%3Afeature+is%3Aclosed)

## （潜在的）不兼容变更
* [#820](https://github.com/mozilla/rhino/issues/820) 引入 Context.FEATURE_ENABLE_JAVA_MAP_ACCESS，默认值为 false。
  默认情况下，这会禁用 JavaScript 对 Java 映射的直接属性访问，该特性是在 [#713](https://github.com/mozilla/rhino/issues/713) 中引入并随 Rhino 1.7.13 发布:
  ```
  var h = new java.util.HashMap();
  h.put('a', 123);
  h.a;  // 123.0`)
  ```
  有关此更改的合理性，可以参见 [#820](https://github.com/mozilla/rhino/issues/820) 和上述特性标志的 JavaDoc 文档。

## 缺陷
[所有错误修复](https://github.com/mozilla/rhino/issues?q=milestone%3A%22Release+1.7.14%22+label%3Abug)

## 性能
[所有性能优化](https://github.com/mozilla/rhino/issues?q=milestone%3A%22Release+1.7.14%22+label%3APerformance)

## Java 互操作
* [#839](https://github.com/mozilla/rhino/issues/839) JavaScript 的 for-of 循环支持 Java Iterable ([@tuchida](https://github.com/tuchida))
* [#860](https://github.com/mozilla/rhino/issues/860) / [#857](https://github.com/mozilla/rhino/issues/857) JSON.stringify 对 Java 对象的支持 ([@tonygermano](https://github.com/tonygermano) / [@rPraml](https://github.com/rPraml))
* [#1031](https://github.com/mozilla/rhino/issues/1031) 在 JavaScript 中对 Java 列表支持 delete 操作符和设置 .length ([@rPraml](https://github.com/rPraml))
* [#901](https://github.com/mozilla/rhino/issues/901) 在 Java 中对 JavaScript 数组支持 java.util.subList() ([@rPraml](https://github.com/rPraml))
* [#889](https://github.com/mozilla/rhino/issues/889) 如果需要,在调用 .put(...) 时自动增加 Java 列表实例的大小 ([@rPraml](https://github.com/rPraml))

[所有 Java 互操作相关的案例](https://github.com/mozilla/rhino/issues?q=milestone%3A%22Release+1.7.14%22+label%3A%22Java+Interop%22)

## 嵌入 Rhino
* [#864](https://github.com/mozilla/rhino/issues/864) Context 现在实现了 Closable 接口 ([@gbrail](https://github.com/gbrail))
* [#865](https://github.com/mozilla/rhino/issues/865) 引入 LambdaFunction 和 LambdaConstructor，可以将 Java lambda 函数表示为原生 JavaScript 函数，同时也可以用来构造一个完全基于 lambda 的类 ([@gbrail](https://github.com/gbrail))
* [#911](https://github.com/mozilla/rhino/issues/911) 如果抛出的 Java 异常类由于类遮蔽而不可见，则抛出 InternalError 而不是包装的 JavaException ([@youngj](https://github.com/youngj))

[所有嵌入 Rhino 相关的案例](https://github.com/mozilla/rhino/issues?q=milestone%3A%22Release+1.7.14%22+label%3A%22embedding+Rhino%22+)

## Test262 测试集
* 使用较新的 Test262 测试集
* 改进了运行 Test262 测试集的文档，提供更多选项以使运行测试更加方便快速
* [#930](https://github.com/mozilla/rhino/issues/930) 添加支持，根据实际测试通过情况自动重新生成 test262.properties 文件
* [#930](https://github.com/mozilla/rhino/issues/930) 改进有关测试失败原因的反馈

## 分发
* [#873](https://github.com/mozilla/rhino/issues/873) 自动模块名称

## 内部机制
* [#878](https://github.com/mozilla/rhino/issues/878) 移除了 idSwitch
* [#896](https://github.com/mozilla/rhino/issues/896) SlotMap 和 Slot 重构
* [#922](https://github.com/mozilla/rhino/issues/922) 开始提取与 ECMAScript 规范中定义的抽象操作相关的逻辑

## 杂项
* [#661](https://github.com/mozilla/rhino/issues/661) Rhino 现在被列在 [kangax ES6 兼容性表](https://kangax.github.io/compat-table/es6) 中(需选择左上角的`显示过时的平台`)
* [#661](https://github.com/mozilla/rhino/issues/661) Rhino 现在可以作为 Babel 的编译目标，通过 @babel/preset-env 实现:
```
{
  "targets": {
    "rhino": "1.7.13"
  }
}
```
* 通过 spotless 引入 Java 代码格式化
* 从 Travis 移动到 CircleCI
* 启用 Gitlab CI，支持在多个 Java 版本上运行测试

# 感谢!

该版本包含来自 23 个贡献者的 350 多次提交。感谢每一位参与者的帮助!