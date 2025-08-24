# 目录结构

# Warning

1. 安装依赖包时，请加上`--no-save`参数，package.json 手动管理

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
