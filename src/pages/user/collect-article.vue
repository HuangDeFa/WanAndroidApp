<template>
    <div class="collect-article">
        <head-view title="我的收藏" :showMenu="false" :showSearch="false" ></head-view>
        <div class="content">
             <div class="scroll-wrapper">
                <cube-scroll
                 ref="scroll"
                 :data="articles"
                 :options="scrollOptions"
                 @pulling-down="onPullingDown"
                 @pulling-up="onPullingUp"
                >
                <template v-slot:default="">
                  <template v-for="(item, index) in articles">
                    <div class="article-item" :key="item.id" @click.self="itemClick(item)">
                           <!--<div class="wrapper">-->
                             <i class="iconfont icon-favorite"  @click.self="unCollect(index,item)"/>
                             <div class="detail">
                                <span class="title" v-html="item.title"></span>
                                <div class="sub-title">
                                   <div class="author">
                                    <span class="label">{{item.author ? '作者:':'分享者:' }}</span>
                                     {{ item.author ? item.author : item.shareUser }}
                                   </div>
                                   <div class="category">
                                      <span class="label">分类:</span>{{ item.superChapterName && item.chapterName ? `${item.superChapterName}/${item.chapterName}`: item.superChapterName}}
                                   </div>
                                   <div class="time">
                                       <span class="label">时间:</span>{{item.niceDate}}
                                   </div>
                              </div>
                           </div>    
                        <!--</div>-->
                     </div>
                  </template>
                </template>
              </cube-scroll>
            </div>
        </div>
    </div>
</template>
<script>
import {getCollectedArticles,unCollect} from '../../api';
import headView from '../../components/header-view';
import { mapMutations } from 'vuex';
import { ADD_COLLECTION,REMOVE_COLLECTION } from '../../store/mutations-type';
export default {
    components:{
        headView
    },
    data() {
        return {
            articles:[],
            pullDownRefreshObj:{},
            pullUpLoadObj:{},
            currentPage:1
        }
    },
    computed: {
         scrollOptions(){
            return {
                pullDownRefresh: this.pullDownRefreshObj,
                pullUpLoad: this.pullUpLoadObj,
                scrollbar: true
            }
        },
    },
    created(){
        this.onPullingDown();
    },
    methods:{
        ...mapMutations([
            ADD_COLLECTION,
            REMOVE_COLLECTION
        ]),
         onPullingDown(){
          getCollectedArticles().then(result=>{
             if(result.data){
                this.currentPage = 1;
                this.articles.splice(0,this.articles.length-1);
                this.articles.push(...result.data.data.datas);
                console.log(this.articles);
             }else{
                 this.$refs.scroll.$$forceUpdate();
             }
        });
        },
        onPullingUp(){
           getCollectedArticles(this.currentPage).then(result=>{
              if(result.data){
                this.currentPage += 1;
                this.articles.push(...result.data.data.datas);
                console.log(this.articles);
             }else{
                 this.$refs.scroll.$$forceUpdate();
             }
           });
        },
        itemClick(item){

        },
        unCollect(index,item){
            unCollect(item.id,item.originalId).then(res=>{
                this.articles.splice(index,1);
                this[REMOVE_COLLECTION](item.id);
            }).cathc(error=>{
                console.error('unCollect',error);
            });
        }
    }
}
</script>
<style lang="less" scoped>
    .collect-article{
        .mixin-page();
    }
    .content{
        .mixin-content();
        height: 93vh;
    }
    .article-item{
        display: flex;
        align-items: center;
        margin: 2vh 2vw 0 2vw;
        border-radius: 5px;
        box-shadow: 1px 2px 4px -1px #00000061;
        border: 1px solid lightgray;
        padding: 6px 2px;
        .icon-favorite{
            font-size: 20px;
            color: red;
        }
        .detail{
            display: flex;
            flex-direction: column;
            margin-left: 10px;
            .title{
                font-size: 15px;
                font-weight: bold;
                margin:8px 0;
            }
            .sub-title{
                display: flex;
                font-size: x-small;
                margin: 6px 0;
                color: black;
                .label{
                    margin-right: 3px;
                }
                .category{
                    margin-left: 8px;
                    span{
                         color: gray;
                    }
                }
                .time{
                    color: gray;
                    margin-left: 8px;
                }
            }
        }
    }
</style>