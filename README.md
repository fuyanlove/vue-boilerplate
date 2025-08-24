# 目录结构

```bash
.
├── public/               # 静态资源目录（原样拷贝到 dist，不走打包）
│   └── favicon.ico       # 网站图标
├── src/                  # 源码目录
│   ├── assets/           # 静态资源
│   │   ├── css/          # 全局样式、Less 变量
│   │   ├── data/         # 静态数据文件
│   │   └── img/          # 图片资源
│   ├── components/       # 公共组件
│   │   └── common/       # 通用基础组件（如 Icon、按钮等）
│   ├── layouts/          # 页面布局组件
│   ├── locale/           # 国际化配置（i18n）
│   ├── pages/            # 多入口页面
│   ├── router/           # Vue Router 配置
│   ├── service/          # 接口请求封装（API 调用）
│   ├── store/            # Vuex 状态管理
│   ├── utils/            # 工具函数
│   ├── views/            # 业务页面视图
│   ├── App.vue           # 根组件
│   ├── main.js           # 默认入口文件
│   └── settings.js       # 全局配置
│
├── index.html            # 默认入口 HTML
├── m.html                # 移动端入口 HTML
├── pc.html               # PC 端入口 HTML
│
├── vite.config.js        # Vite 构建配置
├── package.json          # 依赖与脚本
├── .github/              # GitHub 配置（CI、Issue 模板等）
├── node_modules/         # 依赖包
│
├── .env                  # 全局环境变量（always）
├── .env.local            # 私密环境变量（always）
├── .env.debug            # 本地环境变量
├── .env.development      # 开发环境变量
├── .env.staging          # 预览环境变量
├── .env.production       # 生产环境变量
│
├── .husky/               # Husky git hooks
├── .editorconfig         # 编辑器统一配置
├── .eslintignore         # ESLint 忽略配置
├── .eslintrc             # ESLint 配置
├── .prettierrc           # Prettier 格式化配置
├── jsconfig.json         # VSCode 路径别名/智能提示配置
│
├── .gitignore            # Git 忽略文件
├── .nvmrc                # Node.js 版本约束
├── .vscode/              # VSCode 项目配置
│
└── README.md             # 项目说明文档
```

# Scripts

## 环境说明

始终会加载.env（公共）和.env.local（私密）部分

-   `debug` 本地开发
-   `dev` 线上测试环境
-   `staging` 线上预览环境
-   `prod` 线上正式环境

## 默认命令

-   `npm run start:[mode]` 启动
-   `npm run build:[mode]` 打包
-   `npm run preview` 预览本地 dist 打包后

## 命令别名

-   `npm run dev` 等同 `npm run start:development` 启动线上测试环境
-   `npm run serve` 等同 `npm run start:production` 启动线上正式环境
-   `npm run debug` 等同 `npm run start:debug` 启动本地后端环境
-   `npm run build` 等同 `vite build --mode production` 打包

# UI

## styles

-   `@/assets/css/var.less` 项目级全局变量
-   `@/assets/css/mixin.less` 项目级 mixin
-   `csslab/base.less` 常用函数

## svg

### 单个 svg

```js
import IconHome from "@/assets/icons/home.svg";
<IconHome />;
```

### 公共 svg

```js
<Icon name="user" :size="18" />
```

# Template

1. 修改 package.json 的 name
2. 替换 public/favicon.ico
3. 修改.github/workflows
