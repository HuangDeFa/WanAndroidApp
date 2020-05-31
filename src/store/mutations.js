import {
 SET_USER,
 ADD_COLLECTION,
 REMOVE_COLLECTION,
 ADD_HISTORY_SEARCH,
 CLEAR_HISTORY_SEARCH
} from './mutations-type'

export const mutations={
    [SET_USER](state,user){
        state.user = user;
        state.isLogin = user ? true :false;
    },
    [ADD_COLLECTION](state,cid){
        state.user.collectIds &&   state.user.collectIds.push(cid);
    },
    [REMOVE_COLLECTION](state,cid){
        if(state.user.collectIds){
          const index = state.user.collectIds.indexOf(cid);
          if(index>-1)
             state.user.collectIds.splice(index,1);
        }
    },
    [ADD_HISTORY_SEARCH](state,keyword){
        if(!state.historySearch.includes(keyword)){
            state.historySearch.push(keyword);
        }
    },
    [CLEAR_HISTORY_SEARCH](state){
        state.historySearch.length = 0;
    }
}