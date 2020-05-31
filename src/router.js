import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const splash = ()=>import(/* webpackChunkName:'splash' */'./pages/Splash.vue');
const home = ()=>import(/* webpackChunkName:'home' */'@/pages/home/home.vue');
const knowledge = ()=>import(/* webpackChunkName:'home' */'@/pages/knowledge/knowledge');
const nav = ()=>import(/* webpackChunkName:'home' */'@/pages/nav/nav');
const project = ()=>import(/* webpackChunkName:'home' */'@/pages/project/project');
const detail = ()=>import(/* webpackChunkName:'detail' */'@/pages/detail/detail');
const knowledgeDetail = ()=>import(/* webpackChunkName:'knowledge-detail' */'@/pages/knowledge/children/knowledge-detail');
const login = ()=>import(/* webpackChunkName:'user' */'@/pages/user/login');
const collectArticle = ()=>import(/* webpackChunkName:'user' */'@/pages/user/collect-article');
const search = ()=>import(/* webpackChunkName:'search' */'@/pages/search/search');

const routes=[
    {
        path:'/',
        redirect:'splash'
    },
    {
        path:'/splash',
        name:'splash',
        component:splash,
        meta:{
            requireAuth:false,
            keepAlive:false
        }
    },
    {
        path:'/home',
        name:'home',
        component:home,
        meta:{
            requireAuth:false,
            keepAlive:true
        }
    },
    {
        path:'/knowledge',
        name:'knowledge',
        component:knowledge,
        meta:{
            requireAuth:false,
            keepAlive:false
        },
        children:[
            {
                path:'/knowledge/detail',
                name:'knowledgeDetail',
                component:knowledgeDetail,
                meta:{
                  requireAuth:false,
                  keepAlive:false
                }
            },
        ]
    },
    {
        path:'/nav',
        name:'nav',
        component:nav,
        meta:{
            requireAuth:false,
            keepAlive:true
        }
    },
    {
        path:'/project',
        name:'project',
        component:project,
        meta:{
            requireAuth:false,
            keepAlive:true
        }
    },
    {
        path:'/detail',
        name:'detail',
        component:detail,
        meta:{
            requireAuth:false,
            keepAlive:false
        }
    },
    {
        path:'/login',
        name:'login',
        component:login,
        meta:{
            requireAuth:false,
            keepAlive:false
        }
    },
    {
        path:'/collectArticle',
        name:'collectArticle',
        component:collectArticle,
        meta:{
            requireAuth:true,
        }
    },
    {
        path:'/search',
        name:'search',
        component:search,
        meta:{
            requireAuth:false,
        }
    }
];

export function createRouter(){
    const router = new VueRouter({routes:routes,mode:"history"});
    return router;
}