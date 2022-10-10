# wejuai-page-index
官网主页
### 基础命令
```
npm install
npm run serve
npm run build
```
### 结构
- 使用了gradle的build docker image
- dist为build后的html源码以及组成docker镜像的参数和nginx的配置
- 其他结构就是标准vue结构

### 配置
- `vue.config.js`中配置脚手架
- `dist/nginx.config`配置nginx docker镜像中的访问方式，反代方式解决网页的跨域

### note
目前源码中将按钮的都关闭了，可以修改打开，但是要修改请求的服务路径