# Vue3 实践
这个模板将帮助你开始使用 Vue 3 和 Vite 进行开发。

# 推荐的 IDE 设置
推荐使用 VSCode + Volar（并禁用 Vetur 插件）。

# 自定义配置
请参阅 Vite 配置参考。

# 项目设置
首先，安装项目依赖：
```shell
npm install
```

编译和热加载用于开发
运行以下命令启动开发服务器，并开启热加载功能：
```shell
npm run dev
```

编译并最小化用于生产
运行以下命令将项目编译并最小化，以便部署到生产环境：
```shell
npm run build
```

目录结构
项目的基本目录结构如下：
```
├── public          # 静态资源目录
├── src
│   ├── assets      # 项目资源（图片、样式等）
│   ├── components  # Vue 组件
│   ├── views       # 视图组件
│   ├── App.vue     # 根组件
│   ├── main.ts     # 入口文件
├── index.html      # 入口 HTML 文件
├── package.json    # 项目配置文件
├── vite.config.ts  # Vite 配置文件
```

