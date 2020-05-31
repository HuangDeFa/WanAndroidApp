<template>
    <div class="home-page">
        <header-view title="首页"></header-view>
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
                      <template v-if="item.isBanner">
                        <cube-slide
                            :data="bannerList"
                            :loop="true"
                            :autoPlay="true"
                            :threshold="0.1"
                            style="height:20vh"
                            :key="index"
                         >
                          <template v-for="banner in bannerList">
                              <img class="banner-img" :src="banner.imagePath" :key="banner.imagePath" />
                          </template>
                         </cube-slide>
                   </template>
                   <template v-else>
                       <div class="article-item" :key="item.id" @click.self="itemClick(item)">
                           <!--<div class="wrapper">-->
                             <i class="iconfont icon-favorite" :style="favoriteStyle(item)" @click.self="toggleCollect(item)"/>
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
                </template>
              </cube-scroll>
            </div>
        </div>
        <footer-view :tabIndex=" 0 "></footer-view>
    </div>
</template>
<script>
import headerView from '../../components/header-view';
import footerView from '../../components/footer-view';
import { getBanners, getArticles,collectArticle,unCollectArticle} from '../../api';
import { mapMutations,mapGetters } from 'vuex';
import { ADD_COLLECTION,REMOVE_COLLECTION } from '../../store/mutations-type';
export default {
    components:{
        headerView,
        footerView
    },
    data() {
        return {
            bannerList:[],
            articles:[{isBanner:true}],
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
        ...mapGetters([
            "getCollecArticleIds",
            "isLogin"
        ])
    },
    created(){
        getBanners().then(result=>{
             console.log(result);
             if(result.data){
                 const url = "https://www.wanandroid.com/";
                 this.bannerList = result.data.data;//.map(function(x){ 
                   //  return {url:url ,image:x.imagePath}
                   // });
             }
        });
        getArticles().then(result=>{
             if(result.data){
                this.articles.push(...result.data.data.datas);
                console.log(this.articles);
             }
        });
    },
    methods:{
        ...mapMutations([
            ADD_COLLECTION,
            REMOVE_COLLECTION
        ]),
        onPullingDown(){
          getArticles().then(result=>{
             if(result.data){
                this.currentPage = 1;
                this.articles.splice(1,this.articles.length-1);
                this.articles.push(...result.data.data.datas);
                console.log(this.articles);
             }else{
                 this.$refs.scroll.$$forceUpdate();
             }
        });
        },
        onPullingUp(){
           getArticles(this.currentPage).then(result=>{
              if(result.data){
                this.currentPage += 1;
                this.articles.push(...result.data.data.datas);
                console.log(this.articles);
             }else{
                 this.$refs.scroll.$$forceUpdate();
             }
           });
        },
        
        favoriteStyle(item){
            if(this.getCollecArticleIds && this.getCollecArticleIds.indexOf(item.id)>-1){
                return {
                     color:'red'
                }
            }else{
                return {
                    color:'grey'
                }
            }
        },

        itemClick(item){
           this.$router.push({name:'detail',params:{title:item.title,url:item.link}});
           //window.location.href = item.link;
        },
       
        toggleCollect(item){
            if(!this.isLogin){
                this.$router.push({name:'login'});
                return;
            }
            const index =this.getCollecArticleIds && this.getCollecArticleIds.indexOf(item.id);
            if(index!==undefined && index!==-1){
                unCollectArticle(item.id).then(res=>{
                    this[REMOVE_COLLECTION](item.id);
                }).catch(error=>{
                    console.error('unCollecArticle',error);
                });
            }else{
                collectArticle(item.id).then(res=>{
                    this[ADD_COLLECTION](item.id);
                }).catch(error=>{
                    console.error('collectArticle',error);
                });
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .home-page{
        .mixin-page();
    }
    .content{
        .mixin-content();
    }
    .banner-img{
        width: 100%;
        height: 100%;
    }
    .scroll-wrapper{
        width: 100%;
        height: 100%;
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
            color: grey;
            &:active{
                color: red;
            }
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