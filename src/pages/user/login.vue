<template>
    <div class="login">
        <div class="content">
            <div class="bg-1"></div>
            <div class="bg-2"></div>
            <img class="logo" src="../../assets/logo.png" />
            <div class="login-form">
                <div class="item-section">
                   <div class="item">
                    <cube-input v-model="username"
                     :clearable="clearable"
                     placeholder="用户名"
                     size="20"
                     >
                     <template v-slot:prepend>
                           <i class="cubeic-person" />
                     </template>
                    </cube-input>
                </div>
                <div class="item">
                    <cube-input v-model="password" 
                     :clearable="clearable"
                     placeholder="密码"
                     type="password"
                     :eye="{open:false,reverse:false}"
                     >
                     <template v-slot:prepend>
                           <i class="cubeic-lock" />
                     </template>
                    </cube-input>
                </div>
                </div>
                <div class="footer">
                    <span class="btn-register"  @click="login(false)">Sign Up</span>
                    <span class="btn-login" @click="login(true)">Login</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {login,register} from '../../api';
import { mapMutations,mapGetters, } from 'vuex';
import {SET_USER } from '../../store/mutations-type';
export default {
    components:{},
    data() {
        return {
            username:'',
            password:'',
            clearable:{
                visible: true,
                blurHidden: true
            }
        }
    },
    computed: {
        ...mapGetters([
            "getUser"
        ])
    },
    methods: {
        ...mapMutations([
            SET_USER
        ]),
        login(isLogin){
            if(!this.username || !this.password){
                this.showAlert("提醒","用户名和密码不能为空")
            }else{
                if(isLogin){
                    login(this.username,this.password).then(res=>{
                        console.log(res);
                        if(res.data.errorCode!==0){
                            this.showToast(res.data.errorMsg);
                        }else{
                            this[SET_USER](res.data.data);
                            this.$router.push({name:'home'});
                        }
                    }).catch(error=>{
                        console.log('loging error',error);
                    });
                }
            }
        },
        showAlert(title,content){
            this.$createDialog({
                type:'alert',
                title:title,
                content:content
            }).show();
        },
        showToast(message) {
         this.$createToast({
           txt: message,
           type: 'txt'
           }).show();
      }
    },
}
</script>
<style lang="less" scoped>
    .login{
        .mixin-page();
    }
    .content{
        .mixin-content();
        height: 100%;
        .bg-1,.bg-2{
            width: 100%;
            height: 50%;
        }
        .bg-1{
            background-color: cornflowerblue;
        }
        .bg-2{
            background-color: #9e9e9e59;
        }
        .logo{
            position: absolute;
            top: 25%;
            left: 0;
            height: 80px;
            width: 110px;
            margin: auto;
            right: 0;
        }
        .login-form{
            .mixin-center();
            width: 80%;
           
            .item-section{
                  display: flex;
                  flex-direction: column;
                  background-color: white;
                  padding: 20px 20px 10px 20px;
               .item{
                display: flex;
                align-items: center;
               }
               .item+.item{
                   margin-top: 10px;
               }
            }
            
            .footer{
                 background-color: #9e9e9e59;
                 display: flex;
                 align-items: center;
                 padding: 13px;
                 justify-content: flex-end;
                 .btn-register{
                    font-size: small;
                    padding: 6px;
                    color: dimgrey;
                    margin-right: 2vw;
                 }
                 .btn-login{
                     color: white;
                     padding: 6px;
                     font-size: small;
                     background-color: cornflowerblue;
                     border-radius: 3px;
                     &:active{
                         background-color: #3f79e2;
                     }
                 }
            }
        }
    }
</style>