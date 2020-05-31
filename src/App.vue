<template>
   <div>
      <transition class="router-fade" mode="out-in">
           <keep-alive >
          <router-view v-if="$route.meta.keepAlive"></router-view>
       </keep-alive>
      </transition>
     <transition name="router-fade" mode="out-in">
          <router-view v-if="!$route.meta.keepAlive"></router-view>
     </transition>
   </div>
</template>

<script>

export default {
  name: 'App'
}
</script>
<style lang="less">
.router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
}
.router-fade-enter, .router-fade-leave-active {
    opacity: 0;
} 

  .router-slide-enter-active, .router-slide-leave-active {
        transition: all .6s;
   }
  .router-slide-enter, .router-slide-leave-active {
        transform: translate3d(50%, 0, 0);
        opacity: 0;
    }
</style>