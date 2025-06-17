---
title: Rhino 1.7.6
parent: Releases
nav_order: 19
---

# Rhino 1.7.6


合并了 GitHub 仓库中许多未解决的拉取请求。

主要更改包括以下内容：
- 为 Date、Array、String 等提供了许多兼容性修复 (André Bargull)
- 添加 Array.find() 和 findIndex() (Evgeny Shepelyuk)
- 添加 String.trimLeft() 和 trimRight() (Travis Ennis)
- 修复 AST 和 "toSource" (tntim96)
- 支持 V8 错误扩展，包括 Error.captureStackTrace (Greg Brail)
- 支持类型化数组 (Greg Brail)
- 支持将 "外部数据" 添加为任意对象的索引属性 (Greg Brail)

André Bargull (60):
- NativeDate: Date.length 和 Date.UTC.length 为 7
- NativeDate: 修复 bug 732779 (Date.prototype.setXXX 函数未评估所有参数)
- NativeDate: Date.prototype.toJSON 使用 [[GET]] 获取 "toISOString" 属性
- 添加 js_toISOString 方法，用于以 ISO-8601 扩展格式格式化日期值，并在必要时扩展年份表示
- NativeDate: 更新 Date.parse 支持简化的 ISO 8601 扩展格式 [15.9.1.15]
- 修复 NativeDate.java 的缩进
- NativeError: Error.prototype.name 和 Error.prototype.message 不可枚举
- NativeError: 15.11.2.1 和 15.11.4.4 更新
- Arguments: arguments 对象不应具有自己的 'constructor' 属性，而是通过其原型继承 'constructor'
- Arguments: 'callee'、'caller' 和 'length' 属性可以为参数对象重新定义
- BaseFunction: Function.prototype.toString 参数个数为 0
- BaseFunction: 可重新定义函数实例上的 'prototype' 属性
- BaseFunction: 函数实例的 'arguments' 属性可以重新定义
- NativeArray: 检查 [Extensible] 标志以处理稠密数组的 [[Put]]
- NativeArray: 移除 (无效的) 到 ScriptRuntime 的轮回以获取/设置元素
- NativeArray: 更加紧密地遵循 Array.isArray 和 Array.prototype.concat 的规范
- NativeArray: 修复 Array.prototype.\{indexOf, lastIndexOf\} 错误
- NativeArray: 修复 Array.prototype.sort 错误 (bug 728286)
- NativeArray: 多项修改以确保更紧密地遵循规范算法
- TopLevel,NativeGlobal,ScriptRuntime: 为本机错误对象添加缓存
- NativeNumber: 当精度为 Infinity 时处理 Number.prototype.\{toFixed,toExponential,toPrecision}
- NativeObject: Object.prototype.toLocaleString 使用 [[Get]] 获取 'toString' 属性
- NativeObject: 处理 Object.prototype.\{hasOwnProperty,propertyIsEnumerable} 中的未定义参数
- NativeString: String.prototype.replace 参数个数为 2 而非 1
- NativeString: 处理 String.prototype.slice 中的未定义参数
- ScriptRuntime: 修复 numberToString() 中的范围检查以符合规范
- ScriptRuntime: 为 TypeErrorThrower 函数设置原型和父作用域
- ScriptableObject: Object.defineProperties 必须确保对每个属性入口调用 [[Get]] 恰好一次
- NativeRegExp: 处理 compile 和 exec 中的未定义参数
- NativeRegExp: 如果某个正则表达式标志被多次使用则报告错误
- NativeRegExp: RegExp.prototype.compile 参数个数为 2
- NativeRegExp: RegExp.prototype.lastIndex 延迟评估，且可能设置为不可写
- NativeRegExpCtor: RegExp 构造函数的参数个数为 2
- NativeRegExpCtor: RegExp.prototype.\{multiline,star,input,underscore} 属性可以重新定义
- RegExpImpl: 对 String.prototype.\{match,search,replace,split} 进行多项修改
- 删除过时的测试用例 js1_2/function/regexparg-2-n.js
- 更新测试用例 doctests/arguments.doctest，现在 arguments 对象通过其原型继承 'constructor' 属性
- NativeRegExp: 使八进制转义序列与网络标准一致
- RegExpImpl: 当分隔符为未定义时，String.prototype.split 不再被视为使用分隔符 'undefined'
- 修复缩进
- Context: 删除 Context#newObject() 中的重复代码
- Context: 使用 StackTraceElement API 遍历堆栈跟踪
- NativeArray: 处理 hns 的审查意见
- 根据 o.m.j.tests.MozillaSuiteTest 中的说明更新测试文件
- [Bug 783797](https://bugzilla.mozilla.org/show_bug.cgi?id=783797) 无法正确处理跨多个全局作用域的函数调用
- 消除 ClassFileWriter 中的警告
- 添加缺失的 @Deprecated 注释
- 添加缺失的 @Override 注释
- 为 deprecatedsrc/ 添加缺失的泛型信息
- 为 toolsrc/ 添加缺失的泛型信息
- 为 testsrc/ 添加缺失的泛型信息
- 为 src/ 添加缺失的泛型信息
- 修复无效的 JavaDoc 链接
- 尽可能将 StringBuffer 替换为 StringBuilder
- 解决来自 hns 的审查意见
- 生成器在处理 'yield' 操作时保存并稍后恢复当前堆栈。由于我们的实现混淆了 Java 类文件验证器，导致类加载时抛出 VerifierError。因此对代码进行重新调整以使验证器重新接受生成的类。
- 添加 doctest 并使用正确的错误编号更新注释
- [Bug 782363](https://bugzilla.mozilla.org/show_bug.cgi?id=782363) 增量/减量改变 const 变量
- [Bug 780458](https://bugzilla.mozilla.org/show_bug.cgi?id=780458) Math.IEEEremainder 使非整数值的 ToInt32 变慢 (V8):
- [Bug 789277](https://bugzilla.mozilla.org/show_bug.cgi?id=789277) JSC: "缺少 ;" 错误消息显示在问题行之后的问题

C. Scott Ananian (1):
- 不吞噬 doctest 中的空行; 用于 Mac/Windows/Unix 的基于行的拆分。

Edison (2):
- 为 "runCommand" 添加工作目录支持
- 为 "runCommand" 添加工作目录支持

Elliott Baron (1):
- 为 Rhino shell 添加手册页。

Evgeny Shepelyuk (2):
- 添加 find 和 findIndex 初始实现
- 改进测试框架 + 一个 JUnit 类匹配一个 JS 套件 + 在错误时报告 JS 堆栈跟踪 + 在 JS 中提供 load 函数 + 为 JS 断言单独文件

Gregory Brail (31):
- 更新版本以备下一组迭代。
- 为发行说明更新 README。
- 修改基准测试输出以便在 Maven 中 "绘图"。
- 修复损坏 Java 6 构建的代码清理问题。
- 再次修复基准测试输出文件格式。
- 在 NativeString 上重新运行 ID 映射。
- 手动添加 @sghill 的 .gitignore 中的补充。
- 在 README 添加更多内容，包括 @shirishp 的内容。
- 添加包含 V8 版权声明的 NOTICE 文件。
- 将 anba 的新 DoubleConversion 代码移到与源自 V8 的代码包中的其余代码一起。
- 移除用于生成与 Java 1.4 兼容字节码的 retrotranslator 代码。切换为生成 Java 6 字节码。
- 移除指向基于 XML Beans 的 "旧 E4X" 实现的代码和构建内容。
- 移除未使用的基于 XML Beans 的 E4X 实现。
- 修改 XML Beans 的最后遗留部分。
- 在 NativeArray 上重新生成 ID 映射。
- 从 V8 初次提交类型化数组及其测试。修复错误的大写问题。
- 修复一些整数编码并添加更多测试用例。
- 切换类型化数组的测试以使用 Evgeny 的测试运行框架。仅使其在版本 1.8 中工作。
- 仅在版本 1.8 中显示类型化数组。
- 为所有本机数组添加 List 实现。
- 将 "Error" 添加到可以走到新代码路径以创建错误的标准错误构造函数集合中。
- 完成类型化数组的 List 实现。为 List 实现编写类型化数组单元测试。
- 不重复初始化 Error。
- 使加载类型化数组类变为惰性。重命名 Java 类以使名称更一致。
- 添加对 V8 风格堆栈跟踪的支持：Error.prepareStackTrace, Error.captureStackTrace, Error.stackTraceLimit 和 "V8" 格式的堆栈跟踪。
- 通过预缓存的方法对象并减少默认字段数量来提高 NativeError 的效率。
- 在生成之前，将 "stack" 设置为不可枚举。
- 将 "setExternalArrayData" 添加到 ScriptableObject 以允许数组数据存储在核心对象之外。
- 将 shell 中的默认版本设置为 "180"。
- 添加方法以同时获取和设置外部数组数据。
- 添加 "initSafeStandardObjects" 以创建完全不访问 Java 类的标准对象。

Ievgenii.Shepeliuk (2):
- `findIndex` 的实现
- 更多 V8 兼容性

Raymond Auge (1):
- [Bug 835147](https://bugzilla.mozilla.org/show_bug.cgi?id=835147) 即使作为另一个 Java shell 的子 shell 运行，rhino 仍会退出 JVM

Travis Ennis (2):
- 添加了 JavaScript 1.8 的字符串方法 trimLeft 和 trimRight。
- 添加了 JavaScript 1.8 的字符串方法 trimLeft 和 trimRight。

sainaen (1):
- 添加 'LanguageVersion' 注解。将 1.8 设置为 'ScriptsTestsBase' 的默认版本。

sghill (1):
- 删除旧的 .cvsignore 文件

tntim96 (5):
- 在 RegExp 构造函数中，将 'undefined' 模式视为空字符串 http://www.ecma-international.org/ecma-262/5.1/#sec-15.10.4.1 https://sourceforge.net/p/htmlunit/bugs/1599/
- [Bug 798642]( https://bugzilla.mozilla.org/show_bug.cgi?id=798642) 修复 AST "toSource" 在 getter/setter 中意外添加 "function" 关键字的问题
- [Bug 800616](https://bugzilla.mozilla.org/show_bug.cgi?id=800616) 修复 AST "toSource" 对八进制和十六进制字面量的处理
- 修复 AST 空 switch case 的 toSource 输出
- 修复编译编码错误 'ASCII 编码无法映射字符'
