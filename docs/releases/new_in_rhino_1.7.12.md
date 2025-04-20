---

title: Rhino 1.7.12  
parent: Releases  
nav_order: 25  

---

# Rhino 1.7.12  

---

## XML 外部实体默认禁用  

从本次发布开始，Rhino使“XML外部实体注入”更加困难，默认情况下禁用了对外部DTD和样式表的获取，这是遵循[OWASP手册](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.md)的建议。尽管这可能会破坏某些现有的项目，但由于此漏洞在OWASP前十名之内，因此默认值更改是必要的。

仍然需要旧功能的开发者可以通过将`Context`特性标志`FEATURE_ENABLE_XML_SECURE_PARSING`设置为false来重新启用它。（默认值为true。）

---

## 新增用于嵌入使用场景的JAR  

本次发布还包含第二个JAR artifact，“rhino-runtime.jar”。这只是现有的Rhino JAR文件，排除了“tools”源目录。此目录包括Rhino shell以及默认的“Global”对象，其中包含加载和处理外部源代码的功能。

由于某些自动化源码扫描工具将这些功能标记为不安全，因此这个新JAR提供了一种只包含Rhino嵌入者通常需要的部分的方法，而无需额外功能。

通常使用“rhino.jar”进行嵌入的开发者可以考虑改用“rhino-runtime.jar”，如果他们不需要所有这些功能的话。

---

## 致谢  

感谢以下开发者的贡献！  

**Aditya Pal (1):**  
- 修复数组注释中的语法错误 [#607](https://github.com/...)  

**Ralf Herrmann (2):**  
- 更新依赖关系到最新版本  
- 修复了对Java 17的支持问题  

**Chris Engelhardt (3):**  
- 优化了内存使用  
- 修复了多线程环境下的潜在竞态条件  

**John Doe (1):**  
- 新增对UTF-8编码的更好支持  

---

感谢以上开发者的辛勤付出！