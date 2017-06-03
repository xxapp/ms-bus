<h1 align="center">:oncoming_bus:ms-bus:oncoming_bus:</h1>

<div align="center">
  <strong>基于 <a href="https://github.com/RubyLouvre/avalon">Avalon2</a> 的 SPA 脚手架 beta</strong>
</div>
<div align="center">
  <strong>中文名：巴适</strong>
</div>

## 开始

1. 首先安装配置 node 环境, 需要 6.x 版本。

2. 全局安装构建工具 FIS3。
  ``` bash
  npm install fis3 -g
  ```
3. 克隆项目到本地，并安装依赖模块
  ``` bash
  git clone --recursive https://github.com/xxapp/ms-bus.git
  
  cd ms-bus
  
  npm install
  ```
4. 日常运行项目
  ``` bash
  npm run dev
  ```

## 目录结构

```
- components            // 将页面按功能和业务切分后的模块
  + common-header       // 命名规范：[业务名称]-[模块名称]
  - gf-user             // gf 业务下的用户模块
    - gf-user.html      // 模块的页面结构和样式
    - gf-user.js        // 模块的业务逻辑
+ mock                  // 模拟后端服务的数据
+ pages                 // 除 index.html 的完整 HTML 页面，用于多页面应用
- services              // 超脱页面的业务逻辑模块
  - ajaxService.js      // 封装 ajax 方法，规范请求参数和响应数据的格式, 根据响应结果显示提示信息
  - configService.js    // 应用的配置项，可在构建时动态替换配置项
  - filterService.js    // 自定义的 Avalon2 过滤器
  - menuService.js      // 功能菜单的逻辑，权限过滤
  - routerService.js    // 路由配置
  - storeService.js     // 数据服务，包括后端数据交互和全局状态管理
- static                // 非 commonjs 模块化的资源
  - mod.js
- typings               // 如果使用 TS 且有必要，就存在这个目录
  - index.d.ts
+ vendor                // 不能通过 npm 安装的模块
- index.html            // 应用主页面
- index.js              // 应用启动，包括 polyfill/必要的依赖/root VM/路由启动
```

## 鸣谢

[活儿好又性感的在线 Mock 平台 - Easy Mock](https://www.easy-mock.com/) 提供模拟数据支持
