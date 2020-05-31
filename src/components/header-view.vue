<template>
    <div class="header">
        <div class="icon">
            <i class="iconfont" :class="{'icon-menu':showMenu , 'icon-back':!showMenu}" @click="handleClick"/>
        </div>
        <div class="title" :style="{'margin-right':!showSearch ? '7vh':''}">{{title}}</div>
        <div v-show="showSearch" class="icon" @click="handleSearch">
             <i class="iconfont icon-search"/>
        </div>
        <cube-popup :type="popupType" ref="menuPopup"
        :mask="true"
        position="left" 
        :mask-closable="false"
        @mask-click="maskClick"
        >
        <div class="menu-container">
            <div class="section-head">
                <i class="iconfont icon-user"/>
                <span @click="checkLogin">{{ this.userName ? this.userName : '请登录' }}</span>
            </div>
            <div class="section-content">
                <p @click="menuClick('favorite')" @touchstart="touch">
                    <i class="iconfont icon-favorite" style="color:#F44336;" />
                    <span>我的收藏</span>
                </p>
                <p @click="menuClick('about')" @touchstart="touch">
                    <i class="iconfont icon-about" style="color:blueviolet;" />
                    <span>关于我们</span>
                </p>
                <p @click="menuClick('logout')" @touchstart="touch">
                    <i class="iconfont icon-logout" style="color:darkgrey;" />
                    <span>退出登录</span>
                </p>
            </div>
          </div>
        </cube-popup>
    </div>
</template>
<script>
import {logout} from '../api'
import { mapGetters ,mapMutations} from 'vuex'
import {SET_USER } from '../store/mutations-type'
export default {
    props:{
        title:{
            type:String,
            default:''
        },
        showSearch:{
            type:Boolean,
            default:true
        },
        showMenu:{
            type:Boolean,
            default:true
        }
    },
    data() {
        return {
            popupType:'menu-default'
        }
    },
    computed:{
        ...mapGetters([
            'getUser',
            'isLogin'
        ]),
        userName(){
            return this.getUser && this.getUser.nickname;
        }
    },
    methods: {
        ...mapMutations([
            SET_USER
        ]),
        handleClick(){
            if(this.showMenu){
                this.$refs.menuPopup.show();
                this.$nextTick(()=>{
                 this.popupType = "menu-open";
                });
            }else{
             this.$router.go(-1);
            }
        },
        menuClick(menu){
             this.maskClick();
             if(menu==='favorite'){
                 this.$router.push({name:'collectArticle'});
             }else if(menu=='logout'){
                 if(this.isLogin){
                    logout(this.userName).then(res=>{
                          this[SET_USER](null);
                    });
                 }
             }
        },
        maskClick(){
            this.popupType = "menu-default";
             setTimeout(()=>{
                  this.$refs.menuPopup.hide();
             },300)
        },
        touch(){

        },
        loginOut(){
            logout();
        },
        checkLogin(){
            if(this.userName)return;
            this.$router.push({name:'login'});
        },
        handleSearch(){
            this.$router.push({name:'search'});
        }
    },
}
</script>
<style lang="less" scoped>
    .header{
        width: 100%;
        height: @header-height;
        background-color: @background;
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .title{
        display: flex;
        justify-content: center;
        flex: 1;
    }
    .icon{
        width: @header-height;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        i{
            font-size: 2.6vh;
        }
        &:active{
            background-color: #252639f7;
        }
    }

 /deep/.cube-menu-default  .cube-popup-container{
     transform: translate(0%, 100%);
 }
/deep/.cube-menu-open .cube-popup-container{
    transform: translate(100%, 100%);
}
   /deep/.cube-menu-default,
  /deep/.cube-menu-open
   {
        .cube-popup-container{
          transition: all 0.5s ease;
        }
        .cube-popup-content{
            width: 60%;
            background: white;
        }
    }

    .menu-container{
         color: black;
        i{
            font-size: 2.6vh;
            margin-right: 3vw;
        }
        .section-head{
           height: 30%;
           background-color: cornflowerblue;
           display: flex;
           flex-direction: column;
           justify-content: center;
           align-items: center;
           i{
               margin-right: 0;
               color: floralwhite;
           }
           span{
               margin-top: 10px;
               font-size: smaller;
           }
        }
       
        .section-content{
            p{
                padding:3vw;
                display: flex;
                align-items: center;
                span{
                    font-size: smaller;
                }
                &:active{
                    background: #9e9e9e59;
                }
            }
        }
        width: 100%;
        height: 100%;
    }
</style>