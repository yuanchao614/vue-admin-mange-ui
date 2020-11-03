# vue-admin-manage

> 这是一个用于记录生活中资金的收入与支出账单、对账单数据的可视化图表展示以及计划日程管理的后台管理系统,使用vue + express + MongoDB完成(纯粹是为了学习Vue框架来写的)

### 前端技术栈
* vue
* axios
* echarts
* element ui

### 后端技术栈
* node.js
* express

### 数据库

* mongoDB

### 项目截图

- dashboard页面主要是对数据的可视化展示，计划展示，最新数据展示

![dashoboard](/showImage/dashoboar.png)

- 用户管理包含对用户基本的CRUD

![userManagement](/showImage/user.png)

- 收入支出账单管理可实现基本的CRUD

![expendManagement](/showImage/expen.png)

![expendManagement](/showImage/income.png)

- 计划管理

![scheduleManagement](/showImage/schedule.png)

### 后端接口

[https://github.com/yuanchao614/vue-admin-manage-server-api](https://github.com/yuanchao614/vue-admin-manage-server-api)


### 项目基础模板

- [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)

## Build Setup

```bash
# 克隆项目
https://github.com/yuanchao614/vue-money-management.git

# 安装依赖
npm install

# 启动服务
npm run dev

# 后端接口地址在`request.js`文件里可以自己修改
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```
