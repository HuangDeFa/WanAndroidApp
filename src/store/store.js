import {Store} from 'vuex'
import Vue from 'vue'
import Vuex from 'vuex'
import {getters} from './getters'
import {actions} from './actions'
import { mutations } from './mutations'

Vue.use(Vuex);

export function createStore(){
    return new Store({
        state:{
            /*
            "admin": false,
            "chapterTops": [],
            "collectIds": [],
            "email": "",
            "icon": "",
            "id": 63889,
            "nickname": "ranbo",
            "password": "",
            "publicName": "ranbo",
            "token": "",
            "type": 0,
            "username": "ranbo"
            */
            user:null,
            token:{
                value:'',
                expires:''
            },
            isLogin:false,
            historySearch:[]
        },
        getters:getters,
        actions:actions,
        mutations:mutations
    });
}