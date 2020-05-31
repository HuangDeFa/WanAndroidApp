<template>
    <div class="project">
        <header-view title="项目"></header-view>
        <div class="content">
             <cube-scroll-nav-bar :current="currProject" :labels="projectsCategory" @change="categoryChange">
                <!-- <template v-slot:default="item">
                    <div class="category-option">
                        <label>{{item.label}}</label>
                    </div>
                </template> -->
            </cube-scroll-nav-bar>
            <cube-slide ref="slide" style="flex:1"
            :data="projects" 
            :loop="false"
            :auto-play="false"
            :allow-vertical="true"
            :showDots="false"
            :threshold="0.5"
            @change="changePage">
              <cube-slide-item v-for="(item, index) in projects" :key="index">
                 <template>
                    <div v-if="loadCategoryIds.indexOf(item.id)==-1" class="data-list" :key="item.id">
                        <!-- {{item.name}} -->
                    </div>
                    <cube-recycle-list v-else  :key="item.id" class="data-list" :size="size" :on-fetch="()=>onFetch(item)" :offset="offset">
                        <template v-slot:item="{data}">
                            <div class="project-item" :key="data.id" @click="itemClick(data)">
                             <!--<div class="wrapper">-->
                               <img :src="data.envelopePic" class="pic"/>
                               <div class="item-detail">
                                   <span class="title" v-html="data.title"></span>
                                   <span class="desc" v-html="data.desc"></span>
                                   <div class="sub-title">
                                     <span class="time">{{data.niceDate}}</span><span>{{ data.author?data.author:data.shareUser}}</span>
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
        <footer-view :tabIndex="3"></footer-view>
    </div>
</template>
<script>
import headerView from '../../components/header-view';
import footerView from '../../components/footer-view';
import {getProjectTree,getProjectTreeData} from '../../api';
export default {
     components:{
        headerView,
        footerView
    },
    data() {
        return {
            projects:[],
            size:15,
            offset:100,
            currProject:'',
            loadCategoryIds:[],
        }
    },
    created() {
        getProjectTree().then(res=>{
            if(res.data){
                this.projects = res.data.data;
                this.currProject = this.projects[0].name;
                this.loadCategoryIds.push(this.projects[0].id);
            }
        }).catch(error=>{
            console.log('load data error ',error);
        });
    },
    computed:{
        projectsCategory(){
            return this.projects && this.projects.map(x=>x.name);
        }
    },
    methods: {
        onFetch(item){
              return new Promise((resolve)=>{
               if(item.totalPage && item.loadPage && item.loadPage >= item.totalPage){
                   resolve([]);
                   return;
               }
               getProjectTreeData(item.id,item.loadPage ||(item.loadPage=1)).then(res=>{
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
        },
        categoryChange(curr){
            if(this.currProject==curr)return;
            this.currProject = curr;
            const page = this.projectsCategory.indexOf(curr);
            if(page!==-1){
                 const project = this.projects[page];
                 if(this.loadCategoryIds.indexOf(project.id)==-1) this.loadCategoryIds.push(project.id);
                 this.$refs.slide._goToPage(page);
            }
        },
        changePage(page){
            this.currProject = this.projectsCategory[page]; 
             const project = this.projects[page];
            if(this.loadCategoryIds.indexOf(project.id)==-1) this.loadCategoryIds.push(project.id);
        },
        itemClick(item){
            //TODO: open a item detail
        }
    },
}
</script>
<style lang="less" scoped>
    .project{
        .mixin-page();
    }
    .content{
        .mixin-content();
    }
    .project-item{
        display: flex;
        align-items: center;
        margin: 2vh 2vw 0 2vw;
        border-radius: 5px;
        box-shadow: 1px 2px 4px -1px #00000061;
        border: 1px solid lightgray;
        padding: 6px 2px;
        white-space: pre-line;
        .pic{
            height: 120px;
             width: 70px;
        }
        .item-detail{
            display: flex;
            flex-direction: column;
            margin-left: 10px;
            flex: 1;
            .title{
                font-size: 15px;
                font-weight: bold;
                margin:8px 0;
                justify-content: flex-start;
            }
            .desc{
                color: gray;
                font-size: 3.5vw;
                margin-top: 3.5vw;
            }
            .sub-title{
                display: flex;
                font-size: x-small;
                color: gray;
                margin-top: 1vw;
                .time{
                    margin-right: 2vw;
                }
            }
        }
    }
</style>