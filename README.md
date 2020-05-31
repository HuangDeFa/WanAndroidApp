# wanandroid
## Vue 全家桶实现的 WanAndroid 客户端

## 技术栈

vue2 + vuex + vue-router + webpack + ES6/7 + less + flex 

## 关于接口数据

此项目的所有接口数据都来源 [玩Android](https://www.wanandroid.com/index)。

## 项目截图
#### 登陆页面
<img src="https://github.com/HuangDeFa/WanAndroidApp/blob/master/screenshots/login.gif" width="365" height="619">

#### 首页
<img src="https://github.com/HuangDeFa/WanAndroidApp/blob/master/screenshots/start.gif" width="365" height="619">

#### 知识体系
<img src="https://github.com/HuangDeFa/WanAndroidApp/blob/master/screenshots/zhishitixi.gif" width="365" height="619">

#### 导航
<img src="https://github.com/HuangDeFa/WanAndroidApp/blob/master/screenshots/nav.gif" width="365" height="619">

#### 项目
<img src="https://github.com/HuangDeFa/WanAndroidApp/blob/master/screenshots/project.gif" width="365" height="619">

#### 搜索
<img src="https://github.com/HuangDeFa/WanAndroidApp/blob/master/screenshots/search.gif" width="365" height="619">

## 目标功能
- [x] 首页文章显示 -- 完成
- [x] 登陆注册 -- 完成
- [x] 文章收藏(站内) -- 完成
- [x] 搜索 -- 完成
- [x] 知识体系模块 -- 完成
- [x] 导航页面 -- 完成
- [x] 项目页面 -- 完成
- [ ] 详情页面 -- 待完成
- [ ] about页面 -- 待完成

## 项目结构
```
.
├── dist                                                //发布文件
├── public
│   ├── favicon.ico
│   └── index.html
├── screenshots                                         //项目截图
│   ├── login.gif
│   ├── nav.gif
│   ├── project.gif
│   ├── search.gif
│   ├── start.gif
│   └── zhishitixi.gif
├── src                                                 //源码目录
│   ├── assets                                          //资源文件，包括图片 字体
│   │   ├── fonts
│   │   │   ├── iconfont.css
│   │   │   ├── iconfont.eot
│   │   │   ├── iconfont.ttf
│   │   │   └── iconfont.woff
│   │   ├── favicon.ico
│   │   ├── logo.png
│   │   └── splash.svg
│   ├── components                                      //公共组件
│   │   ├── footer-view.vue
│   │   └── header-view.vue
│   ├── pages                                           //页面组件
│   │   ├── detail
│   │   │   └── detail.vue                              //详情页面
│   │   ├── home
│   │   │   └── home.vue                                //入口主页
│   │   ├── knowledge                                   //知识体系页面
│   │   │   ├── children
│   │   │   │   └── knowledge-detail.vue
│   │   │   └── knowledge.vue
│   │   ├── nav                                         //导航页面
│   │   │   └── nav.vue
│   │   ├── project                                     //项目页面
│   │   │   └── project.vue
│   │   ├── search                                      //搜索页面
│   │   │   └── search.vue
│   │   ├── user                                        
│   │   │   ├── about.vue                               //关于页面 TODO： 待完成
│   │   │   ├── collect-article.vue                     //收藏页面
│   │   │   └── login.vue                               //注册登陆页面
│   │   └── Splash.vue                                  //Splash页面
│   ├── server
│   │   └── ssr-example.js
│   ├── store                                           //Vex 全局Store
│   │   ├── actions.js
│   │   ├── getters.js
│   │   ├── mutations-type.js
│   │   ├── mutations.js
│   │   └── store.js
│   ├── App.vue                                         //入口文件
│   ├── api.js                                          //全局Api接口
│   ├── app.js
│   ├── app.less                                        //全局公共样式
│   ├── cube-ui.js                                      //按需引入 cube-ui
│   ├── entry-server.js                                 // SSR 服务器渲染入口文件
│   ├── main.js                                         //客户端入口文件
│   └── router.js                                       //路由配置
├── LICENSE
├── README.md
├── babel.config.js                                     //babel配置
├── package-lock.json
├── package.json
├── postcss.config.js                                   //postcss
└── vue.config.js       

22 directories, 84 files
```
# License

[MIT](https://github.com/HuangDeFa/WanAndroidApp/blob/master/LICENSE)