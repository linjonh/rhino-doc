---
title: Rhino 1.7.13
parent: Releases
nav_order: 26
---

# Rhino 1.7.13


---
## 脚本引擎支持

由于Nashorn已经弃用，Rhino 1.7.13现在支持通过`ScriptEngineManager`创建脚本引擎。以下是如何使用的示例：

```java
import javax.script.ScriptEngineManager;
import javax.script.ScriptEngine;

public class RhinoExample {
    public static void main(String[] args) throws Exception {
        ScriptEngineManager manager = new ScriptEngineManager();
        ScriptEngine engine = manager.getEngineByName("rhino");
        
        if (engine == null) {
            System.err.println("Rhino脚本引擎未找到。");
            return;
        }
        
        String script = "function hello(name) { return 'Hello, ' + name; }; hello('World')";
        Object result = engine.eval(script);
        System.out.println(result); // 输出：Hello, World
    }
}
```

### 特性：
- 支持从标准输入读取和写入标准输出。
- 可以通过`engine.put()`方法设置全局变量。
- 支持ES6特性。

### 注意事项：
- Rhino 1.7.13默认不启用严格模式（strict mode），如果需要启用，可以在代码中加入 `'use strict';`。
- 对于模块化代码，建议使用`load()`函数来导入其他脚本文件。

---
## 使用自定义全局变量

你可以通过`ScriptEngine`的`put()`方法添加自定义的全局变量：

```java
engine.put("myVariable", "Hello, Rhino!");
Object result = engine.eval("myVariable;");
System.out.println(result); // 输出：Hello, Rhino!
```

---
## 异常处理

Rhino脚本引擎会抛出`ScriptException`异常来指示错误：

```java
try {
    Object result = engine.eval("invalid_script");
} catch (javax.script.ScriptException e) {
    System.err.println("脚本执行错误：" + e.getMessage());
}
```

---
## 配置

Rhino引擎可以通过以下方式配置：

1. **启用严格模式**：
   ```javascript
   'use strict';
   ```
   
2. **设置超时时间**：
   ```java
   engine.put(ScriptEngine.TIMEOUT, 5000); // 设置5秒超时
   ```

3. **禁用特定功能**：
   ```java
   engine.put("disable_jsr_292", true); // 禁用JSR-292（Java 8 Nashorn替换）
   ```

---
## 已知问题

- 在某些情况下，`Function`对象可能无法正确序列化。
- 对于非常大的脚本文件，解析速度可能较慢。

如果遇到任何问题，请参考[GitHub存储库](https://github.com/mozilla/rhino)获取更多信息和更新。