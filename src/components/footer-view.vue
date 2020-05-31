<template>
    <div class="footer">
        <div class="tab" v-for="(item, index) in tabs" :key="index" :class="{'tab-selected':index==tabIndex}" @click="tabChange(index)">
            <div class="wrapper">
                 <i class="iconfont" :class=" `icon-${item.icon}` "/>
                 <span>{{item.text}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        tabIndex:{
            type:Number,
            default:0
        }
    },
    data() {
        return {
            tabs:[{text:'首页',icon:'home'},{text:'知识体系',icon:'anniu'},{text:'导航',icon:'nav'},{text:'项目',icon:'project'}]
        }
    },
    methods: {
        tabChange(index){
            if(index==this.tabIndex) return;
            let route = 'home';
            if(index==0)route = 'home';
            else if(index == 1)route = 'knowledge';
            else if(index == 2) route = 'nav';
            else route = 'project';
            this.$router.push({name:route});
        }
    },
}
</script>
<style lang="less" scoped>
    .footer{
        width: 100%;
        height: @footer-height;
        box-shadow: 0px -2px 5px 0px #00000021;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .tab{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: .8vh;
        .wrapper{
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items:center;
            i{
                font-size: 3vh;
            }
        }
    }
    .tab-selected{
        color: #0073ff;
    }
</style>