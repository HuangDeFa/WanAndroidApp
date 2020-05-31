import Axios from 'axios';
Axios.defaults.baseURL ="/api";// "https://www.wanandroid.com";
Axios.defaults.withCredentials = true;
//请求拦截器
Axios.interceptors.request.use(req=>{
    //eg:统一加上 token header
    req.headers['Accept']='';
    console.log(req);
    return req;
},error=>{
    console.log(`request exception ${error}`);
});
//响应拦截器
Axios.interceptors.response.use(res=>{
    //对响应做一些统一的处理
    console.log(res);
    return res;
},error=>{
    console.log(`response exception ${error}`)
});

export function login(username,password){
    return Axios.post('/user/login',null,{params:{username,password}});
}

export function register(username,password){
    return Axios.post('/user/register',{
        username,password,repassword:password
    });
}

export function logout(username){
    return Axios.get(`/user/logout/json`);
}

export function getBanners(){
    return Axios.get('/banner/json');
}

export function getArticles(index = 0){
    return Axios.get(`/article/list/${index}/json`);
}

export function getKnowledgeTree(){
    return Axios.get(`/tree/json`);
}

export function getKnowledgeTreeData(id,index=0){
    //https://www.wanandroid.com/article/list/0/json?cid=60
    return Axios.get(`/article/list/${index}/json?cid=${id}`);
}

export function getNavData(){
    //https://www.wanandroid.com/navi/json
    return Axios.get('/navi/json');
}

export function getProjectTree(){
    //https://www.wanandroid.com/project/tree/json
    return Axios.get('/project/tree/json');
}

export function getProjectTreeData(id,index=1){
    //https://www.wanandroid.com/project/list/1/json?cid=294
    return Axios.get(`/project/list/${index}/json?cid=${id}`);
}

export function getCollectedArticles(index=0){
    //https://www.wanandroid.com/lg/collect/list/0/json
    return Axios.get(`/lg/collect/list/${index}/json`);
}
/**
 * 收藏站内文章
 *  @parma cid 
 */
export function collectArticle(cid){
    //https://www.wanandroid.com/lg/collect/1165/json
    return Axios.post(`/lg/collect/${cid}/json`);
}

/**
 * 收藏站外文章
 */
export function collectExternalArticle({title,author,link}){
    //https://www.wanandroid.com/lg/collect/add/json
    return Axios.post("/lg/collect/add/json",null,{params:{ title,author,link }});
}


/**
 * 文章列表触发取消收藏
 */
export function unCollectArticle(articleId){
    //https://www.wanandroid.com/lg/uncollect_originId/2333/json
    return Axios.post(`/lg/uncollect_originId/${articleId}/json`);
}

//我的收藏页面触发取消收藏
export function unCollect({id,originId=-1}){
    //https://www.wanandroid.com/lg/uncollect/2805/json
    return Axios.post(`/lg/uncollect/${id}/json`,null,{params:{originId}});
}

/**
 * 常用网站
 */
export function getFriendwebSite(){
    return Axios.get(`/friend/json`);
}

/**
 * 搜索热词
 * @this
 */
export function getHotKeys(){
    return Axios.get("/hotkey/json");
}

/**
 * 获取搜索结果
 */
export function getQueryResult(index=0,keyword){
    keyword =  Array.isArray(keyword) ? keyword.join(" ") : keyword;
    return Axios.post(`/article/query/${index}/json`,null,{params:{k:keyword}})
}

export function loadHtml(url){
    const parts = url.split('/');
    let host = `${parts[0]}//${parts[2]}`;
    const url2 = url.replace(host,'');
    return Axios.get(url2,{ baseURL:`/api2`,params:{ 'original-host':parts[2]}});
}