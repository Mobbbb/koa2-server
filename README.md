### koa2-server
后端服务基础框架

### 目录结构

```
├─app.js                    // 应用入口
├─config.js                 // 公共配置文件
├─bin                       // 启动目录
|   └─www                       // 启动文件配置
├─controllers               // 业务逻辑处理
|   ├─index.js                  // 业务逻辑模块导出
|   └─user                      // 用户相关的业务逻辑处理
|      └─index.js                   // 具体代码
├─services                  // 服务处理
|   ├─index.js                  // 服务模块导出
|   └─user                      // 用户相关的服务处理
|      └─index.js                   // 具体代码
├─mapper                    // 数据库操作处理
|   ├─index.js                  // 模块导出
|   └─user                      // 用户相关的数据库查询
|      └─index.js                   // 具体代码
├─routers                   // 路由映射
|   ├─private                   // token校验接口
|   |  └─index.js                   // 具体代码
|   └─public                    // 公开接口
|      └─index.js                   // 具体代码
├─middlewares               // 中间件
|   ├─cors.js                   // 跨域中间件
|   ├─jwt.js                    // jwt中间件
|   └─response.js               // 响应及异常处理中间件
└─util                      // 工具方法
   ├─libs.js                   // 工具方法
   └─token-libs.js             // token生成
```
