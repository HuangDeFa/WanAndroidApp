<template>
    <div class="search">
        <div class="search-area">
            <div class="icon" @click="$router.go(-1)">
                <i class="iconfont icon-back" ></i>
            </div>
            <cube-input class="input-area" v-model="searchWord"
                     :clearable="clearable"
                     placeholder="发现更多干货"
                     size="20"
                     >
             </cube-input>
             <div class="btn-search" @click="search">
                 搜索
             </div>
        </div>
        <div class="content">
            <div class="normal" v-show="!searchWord">
                <div v-if="historySearch && historySearch.length" class="history-search">
                     <h5 class="sub-title" style="color:#2196F3">历史搜索</h5>
                      <div class="tag-container">
                      <span class="tag" :style="tagColorStyle(item)" v-for="(item,index) in historySearch" :key="index">
                          {{item}}
                      </span>
                     </div>
                </div>
                <div class="hot-keys">
                     <h5 class="sub-title" style="color:rgb(244, 67, 54)">热搜</h5>
                      <div class="tag-container">
                      <span class="tag" :style="tagColorStyle(item)" v-for="item in hotKeys" :key="item.id">
                          {{item.name}}
                      </span>
                     </div>
                </div>
                <div class="friend-websites">
                    <h5 class="sub-title" style="color:rgb(103, 58, 183);">常用网站</h5>
                    <div class="tag-container">
                      <span class="tag" :style="tagColorStyle(item)" v-for="item in friendWebsites" :key="item.id">
                          {{item.name}}
                      </span>
                    </div>
                </div>
            </div>
            <div class="search-result" >
                <cube-scroll
                 ref="scroll"
                 :data="articles"
                 :options="scrollOptions"
                 @pulling-down="onPullingDown"
                 @pulling-up="onPullingUp"
                >
                <template>
                     <div class="article-item" v-for="(item) in articles" :key="item.id" @click.self="itemClick(item)" >
                           <!--<div class="wrapper">-->
                             <!-- <i class="iconfont icon-favorite" :style="favoriteStyle(item)" @click.self="toggleCollect(item)"/> -->
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
                </cube-scroll>
            </div>
        </div>
    </div>
</template>
<script>
import {getFriendwebSite,getHotKeys,getQueryResult }  from '../../api';
import { mapGetters,mapMutations } from 'vuex';
import { ADD_HISTORY_SEARCH,CLEAR_HISTORY_SEARCH } from '../../store/mutations-type'
export default {
    data() {
        return {
            searchWord:'',
            articles:[],
            friendWebsites:[],
            hotKeys:[],
            clearable:{
                visible: true,
                blurHidden: true
            },
            tagColor:[
                '#03a9f4',
                '#F44336',
                '#9C27B0',
                '#673AB7',
                '#00BCD4',
                '#009688',
                '#4CAF50',
                '#FF9800',
                '#795548',
                '#9E9E9E'
            ],
             pullDownRefreshObj:{},
            pullUpLoadObj:{},
            currentPage:1,
            totalPage:1
        }
    },
    created(){
        Promise.all([getFriendwebSite(),getHotKeys()]).then(result=>{
            this.friendWebsites = result[0].data.data;
            this.hotKeys = result[1].data.data;
        }).catch(error=>{
            console.error('search page init error',error);
        });
    },
    computed:{
        ...mapGetters([
            "historySearch"
        ]),
        scrollOptions(){
            return {
                pullDownRefresh: this.pullDownRefreshObj,
                pullUpLoad: this.pullUpLoadObj,
                scrollbar: true
            }
        },
    },
    watch: {
        searchWord(oldVal,newVal){
            
        }
    },
    methods: {
        ...mapMutations([
        ADD_HISTORY_SEARCH,
        CLEAR_HISTORY_SEARCH
        ]),

        tagColorStyle(item){
            const isObj = Object.prototype.toString.call(item) ==='[object Object]';
            if(isObj && item._color)
              return { color:item._color};
            const len = this.tagColor.length;
            const index = Math.floor(Math.random() * len);
            return {
                color: isObj? item._color = this.tagColor[index] : this.tagColor[index]
            }
        },
        search(){
            if(this.searchWord){
              getQueryResult(0,this.searchWord).then(result=>{
                  console.log(result);
                  this.articles = result.data.data.datas;
                  this.currentPage = 1;
                  this.totalPage = result.data.data.pageCount;
                  this[ADD_HISTORY_SEARCH](this.searchWord);
              }).catch(error=>{
                  console.error('search error ',error);
              })
            }
        },
        onPullingDown(){
            getQueryResult(0,this.searchWord).then(result=>{
                this.currentPage  = 1;
                this.articles.length = 0;
                this.articles.push(...result.data.data.datas);
            }).catch(error=>{
                console.error('search error ',error);
            });
        },
        onPullingUp(){
             if(this.currentPage>=this.totalPage){
                this.$refs.scroll.$$forceUpdate();
                return;
            }
             getQueryResult(this.currentPage,this.searchWord).then(result=>{
                this.currentPage++;
                this.articles.push(...result.data.data.datas);
            }).catch(error=>{
                console.error('search error ',error);
            });
        },
        itemClick(item){

        }
    },
}
</script>
<style lang="less" scoped>
    .search{
        .mixin-page();
    }
    .search-area{
        display: flex;
        align-items: center;
        height: 7vh;
        background-color: @background;
        color: white;
        width: 100%;
        font-size: 3.2vw;
        .cube-input{
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
        .btn-search{
            padding: 2vw;
            border: 1px solid transparent;
            border-radius: 5vw;
            background: #2196F3;
            margin: 0 8px;
        }
    }
    .content{
        .mixin-content();
        height: 93vh;
        .tag-container{
          padding: 5px;
        }
       .tag{
        display: inline-flex;
        padding: 2vw;
        border: 1px solid transparent;
        border-radius: 5vw;
        background: #ece5e5;
        font-size: 12px;
        margin-bottom: 5px;
        margin-right: 5px;
      }
      .sub-title{
          font-size: 15px;
          margin: 8px;
      }
    .search-result{
        height: 100%;
        width: 100%;
    }
    .article-item{
        display: flex;
        align-items: center;
        margin: 2vh 2vw 0 2vw;
        border-radius: 5px;
        box-shadow: 1px 2px 4px -1px #00000061;
        border: 1px solid lightgray;
        padding: 6px 2px;

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
    }
</style>