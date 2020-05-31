<template>
    <div class="detail">
        <header-view :title="title" :showMenu="false" :showSearch="false"></header-view>
        <div class="content">
            <cube-scroll-nav-bar :current="current" :labels="category" @change="categoryChange">
                <!-- <template v-slot:default="item">
                    <div class="category-option">
                        <label>{{item.label}}</label>
                    </div>
                </template> -->
            </cube-scroll-nav-bar>
            <cube-slide ref="slide" style="flex:1"
            :data="knowledgeTreeItem.children" 
            :loop="false"
            :auto-play="false"
            :allow-vertical="true"
            :showDots="false"
            :threshold="0.5"
            @change="changePage">
              <cube-slide-item v-for="(item, index) in knowledgeTreeItem.children" :key="index">
                 <template>
                    <div v-if="loadCategoryIds.indexOf(item.id)==-1" class="data-list" :key="item.id">
                        <!-- {{item.name}} -->
                    </div>
                    <cube-recycle-list v-else  :key="item.id" class="data-list" :size="size" :on-fetch="()=>onFetch(item)" :offset="offset">
                        <template v-slot:item="{data}">
                            <div class="article-item" :key="data.id" @click="itemClick(data)">
                             <!--<div class="wrapper">-->
                               <i class="iconfont icon-favorite"/>
                               <div class="item-detail">
                                   <span class="title" v-html="data.title"></span>
                                   <div class="sub-title">
                                      <div class="author">
                                       <span class="label">{{data.author ? '作者:':'分享者:' }}</span>
                                        {{ data.author ? data.author : data.shareUser }}
                                      </div>
                                      <div class="category">
                                         <span class="label">分类:</span>{{ data.superChapterName && data.chapterName ? `${data.superChapterName}/${data.chapterName}`: data.superChapterName}}
                                      </div>
                                      <div class="time">
                                          <span class="label">时间:</span>{{data.niceDate}}
                                      </div>
                                  </div>
                              </div>    
                          <!--</div>-->
                           </div>
                        </template>
                   </cube-recycle-list>
                </template>
              </cube-slide-item>
           </cube-slide>
        </div>
    </div>
</template>
<script>
import headerView from '../../../components/header-view';
import {getKnowledgeTreeData} from '../../../api';

export default { 
    components:{
        headerView
    },
    data() {
        return {
            title:'',
            headScrollOptions:{

            },
            knowledgeTreeItem:{},
            current:'',
            size:20,
            offset:100,
            loadCategoryIds:[]
        }
    },
    created() {
        console.log(this.$route.params)
        this.knowledgeTreeItem = this.$route.params;
        this.title = this.knowledgeTreeItem.name;
        this.current = this.knowledgeTreeItem.children && this.knowledgeTreeItem.children[0].name;
        this.loadCategoryIds[0] = this.knowledgeTreeItem.children && this.knowledgeTreeItem.children[0].id;
    },
    mounted() {
       
    },
    computed:{
        category(){
            return this.knowledgeTreeItem.children && this.knowledgeTreeItem.children.map(c=>{
               c.totalPage = 0;
               c.loadPage = 0;
               return c.name
            });
        }
    },
    methods: {
        categoryChange(curr){
            if(this.current==curr) return;
            this.current = curr;
            const page = this.category.indexOf(curr);
            if(page!==-1){
                 const child = this.knowledgeTreeItem.children[page];
                 if(this.loadCategoryIds.indexOf(child.id)==-1) this.loadCategoryIds.push(child.id);
                 this.$refs.slide._goToPage(page);
            }
        },
        changePage(pageNumber){
            this.current = this.category[pageNumber]; 
            const child = this.knowledgeTreeItem.children[pageNumber];
            if(this.loadCategoryIds.indexOf(child.id)==-1) this.loadCategoryIds.push(child.id);
        },
        onFetch(item){
           return new Promise((resolve)=>{
               if(item.totalPage && item.loadPage && item.loadPage >= item.totalPage){
                   resolve([]);
                   return;
               }
               getKnowledgeTreeData(item.id,item.loadPage ||(item.loadPage=0)).then(res=>{
                   if(res.data){
                       item.loadPage++;
                       item.totalPage = res.data.data.pageCount;
                       resolve(res.data.data.datas);
                   }
               }).catch(error=>{
                   console.log('load data error ',error);
                   resolve([]);
               });
           }); 
        }
    },
}
</script>
<style lang="less" scoped>
    .detail{
        .mixin-page();
        z-index: 1;
        background-color: white;
    }
//    /deep/ .cube-scroll-nav-bar-item{
//         padding: 0;
//     }
    .content{
        .mixin-content();
        height: 93vh;
        display: flex;
        flex-direction: column;
       
        .category-option{
            padding: 3vw;
            border: #4caf5099 1px solid;
            border-radius: 3px;
            color: #2196F3;
        }
        .data-list{
            width: 100%;
            height: 100%;
            display: inline-block;
        }

      .article-item{
        display: flex;
        align-items: center;
        margin: 2vh 2vw 0 2vw;
        border-radius: 5px;
        box-shadow: 1px 2px 4px -1px #00000061;
        border: 1px solid lightgray;
        padding: 6px 2px;
        white-space: pre-line;
        .icon-favorite{
            font-size: 20px;
            color: grey;
            &:active{
                color: red;
            }
        }
        .item-detail{
            display: flex;
            flex-direction: column;
            margin-left: 10px;
            .title{
                font-size: 15px;
                font-weight: bold;
                margin:8px 0;
                justify-content: flex-start;
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