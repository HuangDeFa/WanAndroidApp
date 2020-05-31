<template>
    <div class="navigation">
        <header-view title="导航" :showSearch="false"></header-view>
        <div class="content">
            <cube-scroll-nav 
           :side="true"
           :data="navDatas"
           :current="current"
           @change="changeHandler"
           @sticky-change="stickyChangeHandler">
            <cube-scroll-nav-panel
                  v-for="item in navDatas"
                  :key="item.name"
                  :label="item.name">
                  <div class="tag-container">
                      <span class="tag" :style="tagColorStyle()" v-for="child in item.children" :key="child.id">
                          {{child.title}}
                      </span>
                  </div>
             </cube-scroll-nav-panel>
            </cube-scroll-nav>
        </div>
        <footer-view :tabIndex="2"></footer-view>
    </div>
</template>
<script>
import headerView from '../../components/header-view';
import footerView from '../../components/footer-view';
import { getNavData } from '../../api'
export default {
     components:{
        headerView,
        footerView
    },
    created(){
        getNavData().then(res=>{
            if(res.data){
               this.navDatas = res.data.data.map(item=> {
                    var result = {name:item.name,cid:item.cid};
                    result.children = item.articles && item.articles.map(
                     t=>{
                         return {
                             id:t.id,
                             chapterId:t.chapterId,
                             chapterName:t.chapterName,
                             author:t.author,
                             link:t.link,
                             title:t.title
                         }
                     }
                    ) || [];
                    return result;
                });
                this.current = this.navDatas[0].name;
            }
        }).catch(error=>{
            console.log('load nav data error ',error);
        });
    },
    data() {
        return {
            navDatas:[],
            current:'',
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
            ]
        }
    },
    computed: {
        
    },
    methods: {
        changeHandler(){

        },
        stickyChangeHandler(){

        },
        tagColorStyle(){
            const len = this.tagColor.length;
            const index = Math.floor(Math.random() * len);
            return {
                color: this.tagColor[index]
            }
        }
    },
}
</script>
<style lang="less" scoped>
    .navigation{
        .mixin-page();
    }
    .content{
        .mixin-content();
    }
   /deep/.cube-scroll-nav-bar-item_active{
       color: #0072ff;
       background: lightgrey;
   }
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
</style>