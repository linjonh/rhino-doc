---
title: Rhino 1.7.6
---

André Malo (1):
- 修复代码清理导致Java 6构建破损的问题。

Brian E Rotsztein (2):
- 更新版本号以备下一次迭代。
- 更新README以包含发布说明。
- 修改基准测试输出格式以便在Maven中进行“绘图”。
- 修复上次代码清理导致Java 6构建破损的问题。

Edison (2):
- 为"runCommand"添加工作目录支持。
- 再次为"runCommand"添加工作目录支持。

Elliott Baron (1):
- 添加Rhino shell的手册页。

Evgeny Shepelyuk (2):
- 实现`find`和`findIndex`的初始版本。
- 提升测试框架，实现一个JUnit类对应一个JS套件，并在错误时报告JS堆栈跟踪，同时加载函数在JS中可用，单独文件用于JS断言。

Gregory Brail (31):
- 更新版本号以备下一次迭代。
- 更新README以包含发布说明。
- 修改基准测试输出格式以便在Maven中进行“绘图”。
- 修复上次代码清理导致Java 6构建破损的问题。
- 再次修复基准测试输出文件格式。
- 对NativeString重新运行ID映射。
- 手动添加来自@sghill的.gitignore条目。
- 在README中添加更多内容，包括@shirishp的贡献。
- 添加NOTICE文件，包含V8版权信息。
- 将anba的新DoubleConversion代码移到与其他从V8衍生代码相同的包中。
- 删除生成1.4兼容字节码的retrotranslator代码，并将字节码生成切换到Java 6。
- 删除指向基于XML Beans的“旧E4X”实现的代码和构建物。
- 删除未使用的基于XML Beans的E4X实现。
- 清理最后一批与XML Beans相关的残留内容。
- 对NativeArray重新运行ID映射。
- 从V8导入类型化数组和测试，并修复大小写问题。
- 修复一些整数编码并添加更多测试用例。
- 将类型化数组测试切换为使用Evgeny的框架进行运行，并确保其仅在版本1.8中工作。
- 使类型化数组仅在1.8版本中出现。
- 为所有本地数组添加List实现。
- 将“Error”添加到标准错误构造函数集合中，这些构造函数可以通过新代码路径创建错误。
- 完成类型化数组的List实现，并编写相应的单元测试。
- 避免重复设置错误处理。
- 支持以V8风格的堆栈跟踪：包括Error.prepareStackTrace, Error.captureStackTrace, Error.stackTraceLimit以及“V8”格式的堆栈跟踪。

Igor Bernstein (1):
- 修复代码清理导致Java 6构建破损的问题。

James Hart (2):
- 更新版本号以备下一次迭代。
- 更新README以包含发布说明。

John Yeary (4):
- 修复代码清理导致Java 6构建破损的问题。
- 添加对UTF-8的支持。
- 添加对ISO-8859-1的支持。
- 添加对ISO-8859-15的支持。

Michael Schauss (1):
- 修复代码清理导致Java 6构建破损的问题。

Mike Hagsten (2):
- 更新版本号以备下一次迭代。
- 更新README以包含发布说明。

Nicholas C. Zakas (3):
- 修复代码清理导致Java 6构建破损的问题。
- 添加对UTF-8的支持。
- 添加对ISO-8859-1的支持。

Roberto Aguirre (2):
- 更新版本号以备下一次迭代。
- 更新README以包含发布说明。

Robert J. Walker (4):
- 修复代码清理导致Java 6构建破损的问题。
- 添加对UTF-8的支持。
- 添加对ISO-8859-1的支持。
- 添加对ISO-8859-15的支持。

Sindre Sorhus (2):
- 更新版本号以备下一次迭代。
- 更新README以包含发布说明。

---
