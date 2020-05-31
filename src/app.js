
import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store/store'
import {createRouter} from './router';

const router = createRouter();
const store = createStore();

router.beforeEach((to,from,next)=>{
      if(to.meta.requireAuth && !store.state.isLogin){
        //redirect to login
        next('/login')
      }else{
        next();
      }
});
export function createApp(){
  const app = new Vue({
        store,
        router,
        render: h => h(App),
  });
  return {app,router,store};
}