---
title: Rhino 1.7.15
parent: Releases
nav_order: 28
---

# Rhino 1.7.15


---
# 链接
* [1.7.14 里程碑](https://github.com/mozilla/rhino/milestone/17)
* [所有已合并的 PR](https://github.com/mozilla/rhino/pulls?q=is%3Apr+merged%3A2022-01-06..2024-05-05)

# Rhino 1.7.15

此版本的亮点包括：

* 基本支持“剩余参数”
* Unicode支持的改进
* 在许多地方实现了“Symbol.species”
* 在许多地方更正确的属性排序
* 以及更多改进和错误修复

此版本包含来自29位提交者的提交。感谢你们的帮助！

## 更改内容
* 准备 1.7.15 by @gbrail in https://github.com/mozilla/rhino/pull/1148
* 实现 Promise.allSettled() by @grob in https://github.com/mozilla/rhino/pull/1090
* 修复问题 #1041。正确处理 {0} 量词最大值为零的情况。by @MaxisTekfield in https://github.com/mozilla/rhino/pull/1098
* 在 OSGi 清单中添加正确的导入包指令 by @makusuko in https://github.com/mozilla/rhino/pull/1163
* 添加 Object.hasOwn (#1052) in https://github.com/mozilla/rhino/pull/1157
* 应用 spotlessApply 到所有代码 by @tuchida in https://github.com/mozilla/rhino/pull/1159
* 移除 spotless 的“ratchet” by @gbrail in https://github.com/mozilla/rhino/pull/1170
* 统一并改进不支持的正则表达式标志错误消息 by @rbri in https://github.com/mozilla/rhino/pull/1180
* 实现正则表达式粘性支持 by @rbri in https://github.com/mozilla/rhino/pull/1181
* 修复 GitHub 仓库语言问题 by @p-bakker in https://github.com/mozilla/rhino/pull/1185
* 修复 #780 在值为 undefined 且不可扩展时 Object.assign 的问题 by @tuchida in https://github.com/mozilla/rhino/pull/1186
* 修复 #934 实现 ES2017 Object.getOwnPropertyDescriptors by @tuchida in https://github.com/mozilla/rhino/pull/1193
* 代码清理 by @rbri in https://github.com/mozilla/rhino/pull/1196
* 考虑缓冲区偏移量在从缓冲区构造子数组时（修复 #1204）by @rbri in https://github.com/mozilla/rhino/pull/1205
* NativeConsole 的各种修复 by @rbri in https://github.com/mozilla/rhino/pull/1207
* 更多控制台修复和测试 by @rbri in https://github.com/mozilla/rhino/pull/1208
* 两个 JSON 字符串化修复 by @rbri in https://github.com/mozilla/rhino/pull/1209
* 修复 toLocaleLowercase 参数处理问题 by @rbri in https://github.com/mozilla/rhino/pull/1131
* 改进 Callable 的日志输出 by @rbri in https://github.com/mozilla/rhino/pull/1213
* 简化发布步骤 by @zloirock in https://github.com/mozilla/rhino/pull/1214
* 一些清理和小优化 by @rbri in https://github.com/mozilla/rhino/pull/1212
* 修复共享全局范围内原生类的 typeof问题 #1173 by @Schmidor in https://github.com/mozilla/rhino/pull/1211
* 在Test262测试中使$262对象可用 by @p-bakker in https://github.com/mozilla/rhino/pull/1229
* 修复使用 StringBuilder/Buffer 时出现的 ClassCastException问题 #496 by @shelches in https://github.com/mozilla/rhino/pull/1210
* 修复某些地方缺失的范围定义 by @rbri in https://github.com/mozilla/rhino/pull/1227
* 修复：TaggedTemplateLiteral 中的父关系问题 (#1238) by @kuzjka in https://github.com/mozilla/rhino/pull/1239
* 使 UrlModuleSourceProvider 中的 getCharacterEncoding 受保护 by @midgleyc in https://github.com/mozilla/rhino/pull/1233
* 修复(#1237)：为Android polyfill `Map.putIfAbsent` by @naijun0403 in https://github.com/mozilla/rhino/pull/1252
* 添加 PGP_KEYS.txt by @gbrail in https://github.com/mozilla/rhino/pull/1263
* 修复量词最大值（第二个值）小于最小值（第一个值）时的错误信息 by @rbri in https://github.com/mozilla/rhino/pull/1260
* 修复 NativeJavaObject 上的 hasOwnProperty by @Schmidor in https://github.com/mozilla/rhino/pull/1255
* 更新 README.md by @wimjongman in https://github.com/mozilla/rhino/pull/1266
* ES6中Function原型属性长度和名称可配置化 by @rbri in https://github.com/mozilla/rhino/pull/1284
* pr 1284 的后续清理 by @rbri in https://github.com/mozilla/rhino/pull/1285
* 确保 ConsStrings 的占位符替换也完成 by @rbri in https://github.com/mozilla/rhino/pull/1293
* 代码清理 by @rbri in https://github.com/mozilla/rhino/pull/1295
* 修复 isResourceChanged 的条件问题 by @szegedi in https://github.com/mozilla/rhino/pull/1301
* 修复绑定函数的 name 属性问题（参见问题 #1297）by @rbri in https://github.com/mozilla/rhino/pull/1298
* 尝试再次修复问题 #780 by @rbri in https://github.com/mozilla/rhino/pull/1294
* 修复在 Promise.then() 内调用绑定函数时的 ScriptException问题 by @rbri in https://github.com/mozilla/rhino/pull/1287
* 保留重抛异常的原因 by @rPraml in https://github.com/mozilla/rhino/pull/1286
* BUG：javaList 的 X 在严格模式下无法正常工作 by @rPraml in https://github.com/mozilla/rhino/pull/1304
* 使用try-with-resource by @rbri in https://github.com/mozilla/rhino/pull/1306
* setter 函数（从属性描述符生成）需转换参数 by @rbri in https://github.com/mozilla/rhino/pull/1305
* 将 String, ConsString, Boolean 和 Double 视为值类型 by @szegedi in https://github.com/mozilla/rhino/pull/1302
* ci：在 GitHub Workflows 中设置最小权限 by @diogoteles08 in https://github.com/mozilla/rhino/pull/1311
* 测试优化级别 by @rbri in https://github.com/mozilla/rhino/pull/1317
* 更多测试方法清理 by @rbri in https://github.com/mozilla/rhino/pull/1320
* 修复测试代码中的一些警告 by @rbri in https://github.com/mozilla/rhino/pull/1325
* 修复测试代码中的一些警告 by @rbri in https://github.com/mozilla/rhino/pull/1326
* 从 compareArray.js 中移除默认参数 by @rbri in https://github.com/mozilla/rhino/pull/1329
* 支持 ES2019 Array.prototype.flat by @midgleyc in https://github.com/mozilla/rhino/pull/1313
* 为 array_flat PR 进行一些代码清理 by @rbri in https://github.com/mozilla/rhino/pull/1330
* 支持 ES2022 的 at 方法 by @JohnBain in https://github.com/mozilla/rhino/pull/1289
* 为 array at 支持进行一些代码清理 by @rbri in https://github.com/mozilla/rhino/pull/1331
* 修复 PropertyDescriptor 的问题 by @rbri in https://github.com/mozilla/rhino/pull/1324
* 移除 CircleCI 配置 by @gbrail in https://github.com/mozilla/rhino/pull/1335
* 解析模板时处理 eof 问题（修复 #1337）by @rbri in https://github.com/mozilla/rhino/pull/1338
* 创建安全策略 by @diogoteles08 in https://github.com/mozilla/rhino/pull/1328
* 文档（README）：移除损坏的 MDN 链接 by @caugner in https://github.com/mozilla/rhino/pull/1340
* 修复一些废弃警告 by @gbrail in https://github.com/mozilla/rhino/pull/1343
* 修复 flush() 问题 by @nmondal in https://github.com/mozilla/rhino/pull/1358
* 修复 Symbol 相关问题 by @rbri in https://github.com/mozilla/rhino/pull/1357
* 为 NativeError 实例生成控制台输出时进行特殊处理 by @rbri in https://github.com/mozilla/rhino/pull/1366
* 修复调试器引入的回归问题 by @gbrail in https://github.com/mozilla/rhino/pull/1369
* 添加一些属性访问微基准测试 by @gbrail in https://github.com/mozilla/rhino/pull/1370
* 修复丢失的数组限制检查 by @rbri in https://github.com/mozilla/rhino/pull/1371
* 修复 Messages.properties 中的一些拼写错误 by @rbri in https://github.com/mozilla/rhino/pull/1373
* 更新 SunSpider 基准测试 by @gbrail in https://github.com/mozilla/rhino/pull/1375
* 在转换前处理 SymbolKey 问题 by @rbri in https://github.com/mozilla/rhino/pull/1377
* 支持 ES2019 Array.prototype.flatMap by @midgleyc in https://github.com/mozilla/rhino/pull/1372
* 功能：更新 GitHub Action 版本至 3 by @midgleyc in https://github.com/mozilla/rhino/pull/1379
* 停止 IRFactory 从 Parser 继承 by @tuchida in https://github.com/mozilla/rhino/pull/1380
* Array.of 必须使用 defineOwnProperty 而不是 set by @rbri in https://github.com/mozilla/rhino/pull/1381
* 支持 Unicode 代码点转义序列 by @tuchida in https://github.com/mozilla/rhino/pull/1383
* 将 NativeMath 和 NativeJSON 转换为基于 Lambda 的 ScriptableObject by @rbri in https://github.com/mozilla/rhino/pull/1384
* 使用不同的方法确定是否运行在 Java 11 上 by @gbrail in https://github.com/mozilla/rhino/pull/1385
* JavaScript 的 'Set' 无法正确处理封装的 Java 对象 by @rPraml in https://github.com/mozilla/rhino/pull/1387
* 修改 `DoctestsTest` 包含优化级别 by @andreabergia in https://github.com/mozilla/rhino/pull/1401
* 允许更新函数的 `name`，符合标准要求 by @andreabergia in https://github.com/mozilla/rhino/pull/1398
* [StepSecurity] ci：加强 GitHub Actions 的安全性 by @step-security-bot in https://github.com/mozilla/rhino/pull/1405
* 创建 dependabot.yml by @diogoteles08 in https://github.com/mozilla/rhino/pull/1407
* 更符合规范的对象索引处理方式 by @gbrail in https://github.com/mozilla/rhino/pull/1392
* 支持 hashbang by @p-bakker in https://github.com/mozilla/rhino/pull/1417
* 添加 Scorecard Action by @diogoteles08 in https://github.com/mozilla/rhino/pull/1400
* 添加对函数参数中尾随逗号的支持 by @p-bakker in https://github.com/mozilla/rhino/pull/1416
* 在标准操作中处理数组原型属性 by @gbrail in https://github.com/mozilla/rhino/pull/1426
* 限制用于缩进的字符串长度 by @rbri in https://github.com/mozilla/rhino/pull/1428
* BigIntLiteral.toSource 包含后缀 by @JohnCokerC3 in https://github.com/mozilla/rhino/pull/1432
* 修复 NativeArray 中 Symbol.iterator 的处理 by @rbri in https://github.com/mozilla/rhino/pull/1435
* 修复 clz32 的舍入误差 by @rbri in https://github.com/mozilla/rhino/pull/1430
* 对 NativeRegExp 的各种修复和实现 by @rbri in https://github.com/mozilla/rhino/pull/1434
* 修复 `Math.atanh` by @andreabergia in https://github.com/mozilla/rhino/pull/1438
* 由 @rbri 在 https://github.com/mozilla/rhino/pull/1449 中添加 @Override 和一些 try-with-resources
* 通过 @andreabergia 在 https://github.com/mozilla/rhino/pull/1448 中（部分）实现 `[Symbol.species]`
* 由 @rbri 在 https://github.com/mozilla/rhino/pull/1454 中为类型化数组添加 species 支持
* 由 @rbri 在 https://github.com/mozilla/rhino/pull/1457 中修复对 Symbol.__proto__ 赋值返回 undefined 的问题
* 由 @rbri 在 https://github.com/mozilla/rhino/pull/1460 中优化了 Context#close() 方法
* 由 @0xe 在 https://github.com/mozilla/rhino/pull/1462 中修复：生成器上的 toString()
* 由 @rbri 在 https://github.com/mozilla/rhino/pull/1467 中对 PR 进行了一些清理工作
* 由 @andreabergia 在 https://github.com/mozilla/rhino/pull/1464 中修复了词法分析器中对 Unicode 字符的处理
* 由 @rbri 在 https://github.com/mozilla/rhino/pull/1468 中更新了评分卡工作流
* 通过 @blutorange 在 https://github.com/mozilla/rhino/pull/1440 中使正则表达式执行循环可中断 #1189
* 由 @rbri 在 https://github.com/mozilla/rhino/pull/1451 中初步实现对函数 rest 参数的支持
* 由 @andreabergia 在 https://github.com/mozilla/rhino/pull/1469 修复 `.then` 后未处理的 promise 拒绝处理程序
* 由 @gbrail 在 https://github.com/mozilla/rhino/pull/1471 中更新了 1.7.15 版本的文件

## 新增贡献者
* @grob 在 https://github.com/mozilla/rhino/pull/1090 中完成了首次贡献
* @makusuko 在 https://github.com/mozilla/rhino/pull/1163 中完成了首次贡献
* @zloirock 在 https://github.com/mozilla/rhino/pull/1214 中完成了首次贡献
* @Schmidor 在 https://github.com/mozilla/rhino/pull/1211 中完成了首次贡献
* @shelches 在 https://github.com/mozilla/rhino/pull/1210 中完成了首次贡献
* @midgleyc 在 https://github.com/mozilla/rhino/pull/1233 中完成了首次贡献
* @naijun0403 在 https://github.com/mozilla/rhino/pull/1252 中完成了首次贡献
* @wimjongman 在 https://github.com/mozilla/rhino/pull/1266 中完成了首次贡献
* @diogoteles08 在 https://github.com/mozilla/rhino/pull/1311 中完成了首次贡献
* @JohnBain 在 https://github.com/mozilla/rhino/pull/1289 中完成了首次贡献
* @caugner 在 https://github.com/mozilla/rhino/pull/1340 中完成了首次贡献
* @nmondal 在 https://github.com/mozilla/rhino/pull/1358 中完成了首次贡献
* @andreabergia 在 https://github.com/mozilla/rhino/pull/1401 中完成了首次贡献
* @step-security-bot 在 https://github.com/mozilla/rhino/pull/1405 中完成了首次贡献
* @JohnCokerC3 在 https://github.com/mozilla/rhino/pull/1432 中完成了首次贡献
* @0xe 在 https://github.com/mozilla/rhino/pull/1462 中完成了首次贡献
* @blutorange 在 https://github.com/mozilla/rhino/pull/1440 中完成了首次贡献

**完整变更日志**: https://github.com/mozilla/rhino/compare/Rhino1_7_14_Release...Rhino1_7_15_Release