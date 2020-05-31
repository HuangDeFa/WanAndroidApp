export const getters={
    getUser:state=>{
        return state.user;
    },
    getCollecArticleIds:state=>state.user && state.user.collectIds,
    isLogin:state=>state.isLogin,
    historySearch:state=>state.historySearch,
}