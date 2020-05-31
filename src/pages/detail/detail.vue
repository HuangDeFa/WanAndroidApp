<template>
    <div class="detail">
        <header-view :title="headTitle"></header-view>
         <div class="content" ref="content">
             <iframe :src="contentUrl" ></iframe>
         </div>
    </div>
</template>
<script>
import headerView from '../../components/header-view'
import { loadHtml } from '../../api'
export default {
    props:{
        title:{
            type:String
        },
        url:{
            type:String
        }
    },
    components:{
        headerView
    },
    data() {
        return {
            html:'',
            headTitle:'',
            contentUrl:''
        }
    },
    mounted() {
       // window.open(this.url,'_self');
    },
    created(){
      this.headTitle = this.title || this.$route.params.title;
      this.contentUrl = this.url || this.$route.params.url;

    //   loadHtml(url).then(result=>{
    //       this.html = result.data;
    //       this.$refs.content.innerHTML = this.html;
    //       //console.log(result.data);
    //   });
    }
}
</script>
<style lang="less" scoped>
    .detail{
        .mixin-page();
    }
    .content{
        .mixin-content();
        height: 93vh;
    }
</style>