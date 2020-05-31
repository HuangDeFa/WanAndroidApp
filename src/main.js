import Vue from 'vue'
import './cube-ui'
import Cube from './cube-ui'
import './assets/fonts/iconfont.css';
import { createApp } from './app';

Vue.config.productionTip = false;
const handler = Vue.config.errorHandler;

Vue.config.errorHandler = (error,vm,info)=>{
    if(handler && typeof handler =='function'){
      handler(error,vm,info);
    }
    //custom handle the error
    console.error(info);
};
window.addEventListener("error",(error)=>{
  console.error('the global unhandle exception ',error);
},true);
if(window.Promise && window.Promise.toString() == 'function Promise() { [native code] }'){
    window.onunhandledrejection = (error)=>{
      //rethrow the error then will be catch by the window.onerror 
      throw error;
    };
}
//处理SSR 组件数据预获取
Vue.mixin({
   beforeMount () {
    const { asyncData } = this.$options
    if (asyncData) {
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route
      })
    }
   },
    beforeRouteUpdate (to, from, next){
      const { asyncData } = this.$options
      if (asyncData) {
        asyncData({
          store: this.$store,
          route: to
        }).then(next).catch(next);
      } else {
        next()
      }
    }
})

const { app, router ,store } = createApp();

router.onReady(()=>{
  app.$mount('#app');
});
//接管 SSR返回的 store
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

