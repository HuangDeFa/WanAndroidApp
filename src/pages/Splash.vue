<template>
    <div class="splash">
       <div class="content">
              <div class="ann-dot2" v-show="!annPlay2" ></div>
              <div class="ann-wrapper" :class="{'ann-wrapper-play':annPlay2}">
                   <div class="layer-1">
                     <div class="layer-2">
                        <div class="layer-3"></div>
                     </div>
                  </div>
                  <div class="ann-text" :class="{'fade-in':annPlay2}">
                       Ae
                  </div>
              </div>
              <img class="ann-img" src="../assets/splash.svg" :class="{'ann-img-play':annPlay4}" />
              <span class="sub-desc" v-on:transitionend="end2" :class="{'fade-in':annPlay2}">Discover with Wan Android</span>
            <span v-on:transitionend="end" v-show="!annPlay2"  class="ann-dot" :class="{'ann-dot-play':annPlay}"></span>
       </div>
       <div class="bottom" v-on:transitionend="end3" :class="{'bottom-fade-out':annPlay3}">
           <span @click="enter" class="btn btn-start" :class="{'btn-fade-in':annPlay4}">GET START</span>
           <span @click="login" class="btn btn-sign" :class="{'btn-fade-in':annPlay4}">SIGN IN</span>
       </div>
    </div>
</template>
<script>
export default {
    name:'splash',
    data() {
        return {
            annPlay:false,
            annPlay2:false,
            annPlay3:false,
            annPlay4:false
        }
    },
    mounted() {
        setTimeout(()=>{
            this.annPlay = true;
        },10);
    },
    methods: {
        end(e){
            this.annPlay2 =true;
        },
        end2(e){
            this.annPlay3 = true;
        },
        end3(e){
            this.annPlay4 = true;
        },
        enter(e){
            this.$router.push({name:'home'});
        },
        login(e){
            this.$router.push({name:'login'});
        }
    },
}
</script>
<style lang="less" scoped>
    @color:#0073ff;

     .dot{
         position: absolute;
         left: 50%;
         width: 25px;
         height: 25px;
         border-radius: 50%;
         background-color:@color;
     }
    .splash{
        background-color:@background;
        .mixin-page();
        .content{
            position: relative;
            width: 100%;
            height: 70%;
            .ann-dot{
                &:extend(.dot);
                bottom: 0;
                display: block;
                transform: translateY(100%) translateX(-50%);
                transition: transform 2s cubic-bezier(0.99, 0.05, 0.39, 1.01)
            }
            .ann-dot-play{
                transform: translateY(-50vh) translateX(-50%);
            }
            .ann-dot2{
                 &:extend(.dot);
                 bottom: 0;
                 transform: translateX(-50%) translateY(-50vh);
            }
        .ann-wrapper{
            position: absolute;
            left: 50%;
            bottom: 0;
            transition: transform ease-out 2s;
            transform: translateX(-50%) translateY(-50vh);
            overflow: hidden;
            width: 20px;
            height: 25px;
            font-size: small;
            .layer-1,.layer-2,.layer-3
            {
              width: 100%;
              height: 100%;
              overflow: hidden;
            }
             .layer-1,.layer-2
            {
                visibility: hidden;
            }
            .layer1
            {
                transform: rotate(120deg);
            }
            .layer-2
            {
                transform: rotate(-60deg);
            }
            .layer-3
            {
                transform: rotate(-60deg);
                background: no-repeat 50% center;
                background-color:@color;
                background-size: 125% auto;
                visibility: visible;
            }
         }

         .ann-wrapper-play{
               transform: translateX(-50%) translateY(-50vh) scale(3.5);
         }
         .ann-text{
                .mixin-center();
                color: white;
                font-weight: bold;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0;
                transition: all ease-out 2s;
         }
        .sub-desc{
             color: white;
             margin-top: 32vh;
             display: inline-block;
             position: absolute;
             left: 50%;
             transform: translateX(-50%);
             opacity: 0;
             transition: all ease-out 2s;
             font-size: small;
        }
        
          .fade-in{
              opacity: 1;
          }
          .ann-img{
              position: absolute;
              left: 50%;
              bottom: 0;
              transform: translateX(-50%) translateY(100%);
              transition: all ease-in 1s;
          }
          .ann-img-play{
               transform: translateX(-50%) translateY(0);
          }
        }
        .bottom{
             position: relative;
             width: 100%;
             height: 30%;
             background-color: @color;
             transition: all ease-out 0.8s;
             display: flex;
             justify-content: center;
             flex-direction: column;
             align-items:center;
             .btn{
                 padding: 15px;
                 width: 86%;
                 text-align: center;
                 font-weight: bold;
                 opacity: 0;
             }
             .btn-fade-in{
                opacity: 1;
             }
             .btn-start{
                  color: white;
                  background-color: @color;
                  &:active{
                  background-color: #0073ffbf;
                  color: #ffffffc4;
                  }
             }
             .btn-sign{
                 margin-top: 20px;
                 background-color: white;
                 color: @color;
                 &:active{
                     background-color: #ffffffc4;
                     color: #0073ffbf;;
                 }
             }
             
        }
        .bottom-fade-out{
             border-top: solid white 2px;
             background-color: @background;
        }
    }
</style>