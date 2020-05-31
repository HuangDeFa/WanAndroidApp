<template>
    <div class="knowledge">
        <header-view title="知识体系"></header-view>
        <div class="content">
           <cube-scroll
                 ref="scroll"
                 :data="datas"
                 :options="scrollOptions"
                 @pulling-down="onPullingDown"
            >
              <template v-slot:default>
                  <div class="item" v-for="(item) in datas" :key="item.id" @click="itemClick(item)">
                      <label class="title" v-html="item.name"></label>
                      <div class="sub-title-wrapper">
                          <label class="sub-title" v-for="(child) in item.children" :key="child.id" v-html="child.name"></label>
                      </div>
                  </div>
              </template>
            </cube-scroll>
        </div>
        <footer-view :tabIndex="1"></footer-view>
       <transition name="router-slide" mode="out-in">
          <router-view></router-view>
     </transition>
    </div>
</template>
<script>
import headerView from '../../components/header-view';
import footerView from '../../components/footer-view';
import { getKnowledgeTree } from '../../api';
export default {
    components:{
        headerView,
        footerView
    },
    data() {
        return {
            datas:[],
            pullDownRefreshObj:{},
        }
    },
    computed: {
        scrollOptions(){
            return{
                pullDownRefresh: this.pullDownRefreshObj,
                scrollbar: false
            }
        }
    },

    beforeRouteUpdate(to,from,next){
        console.log("route update->");
        next();
    },
    created() {
        this.onPullingDown();
    },
    methods: {
        onPullingDown(){
             getKnowledgeTree().then(result=>{
             if(result.data){
                this.datas = result.data.data;
                console.log(this.datas);
             }else{
                 this.$refs.scroll.$$forceUpdate();
             }
        });},
        itemClick(item){
            this.$router.push({name:'knowledgeDetail',params:item})
        }
    },
}
</script>
<style lang="less" scoped>
    .knowledge{
        .mixin-page();
    }
    .content{
        .mixin-content();
    }
    .item{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 2vh 2vw 0 2vw;
        border-radius: 5px;
        box-shadow: 1px 2px 4px -1px #00000061;
        border: 1px solid lightgray;
        padding: 6px 2px;
        &:active{
            background: #9e9e9e69;
        }
        .title{
            color:#8BC34A;
        }
        .sub-title-wrapper{
            margin-top: 8px;
            width: 100%;
            font-size: small;
            padding: 0 5px;
             box-sizing: border-box;
             .sub-title{
                 margin-bottom: 5px;
                 display: inline-block;
             }
            .sub-title+.sub-title{
                margin-left: 5px;
            }
        }
    }
</style>