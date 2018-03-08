<template>
    <div class="recommend">
       <scroll  ref="loadscroll" class="recommend-content" :data="musicList">
         <div>
           <div  v-if="mes.length" class="slider-wrapper">
             <!--轮播-->
             <slider>
               <div  v-for="(value,index) in mes">
                 <a :href="value.linkUrl">
                   <img  :src="value.picUrl"><!--@load="loads"-->
                 </a>
               </div>

             </slider>
           </div>
           <div class="recommend-list">
             <h1 class="list-title">热门歌单推荐</h1>
             <ul>
               <li v-for="value in musicList" class="item">
                  <div class="icon">
                    <img v-lazy="value.imgurl" width="60" height="60">
                  </div>
                  <div class="text">
                    <!--v-html 可以将一些特殊字符转义-->
                    <h2 class="name" v-html="value.creator.name"></h2>
                    <p class="desc" v-html="value.dissname"></p>
                  </div>
               </li>
             </ul>
           </div>
         </div>
         <div class="loading-container" v-show="!musicList.length">
           <loading></loading>
         </div>
       </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
    /*加载组件*/
    import Loading from 'base/loading/loading'

    import Scroll from 'base/scroll/scroll'
  /*轮播基础组件*/
    import Slider from 'base/silder/slider'
  /*抓取QQ音乐接口*/

    import { getRecomend,getDiscList } from 'api/recommend'
    import { ERR_OK } from 'api/config'

    export default{
      data(){
        return{
          mes:[],
          musicList:[]
        }
      },
      created(){
        this. _getRecomend(),
        this._getDiscList()
      },
      methods:{
        _getRecomend(){
          getRecomend().then((res)=>{
            if(res.code === ERR_OK){
              this.mes=res.data.slider
            }
          })
        },
        _getDiscList(){
          getDiscList().then((res)=>{
            if(res.code === ERR_OK){
//              console.log(res.data.list)
              this.musicList=res.data.list
            }
          })
        }
        /*,
        可预防当图片延迟出现后，歌单滚动滚不到底部
        loads(){
          /!*refresh为scroll中的refresh方法，重新加载数据*!/
          if(!this.checkLoaded){
            this.$refs.loadscroll.refresh()
            this.checkLoaded=true
          }
        }*/
      },
      components:{
        Slider,
        Scroll,
        Loading
      },

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
     position  fixed
     width  100%
     top  88px
     bottom  0
     .recommend-content
       height  100%
       overflow  hidden
       .slider-wrapper
         position  relative
         width  100%
         overflow  hidden
       .recommend-list
         .list-title
           height  65px
           line-height  65px
           color $color-theme
           text-align  center
           font-size  $font-size-medium
         .item
           padding  0 20px 20px 20px
           display flex
           box-sizing  border-box
           align-items  center
           .icon
              width  60px
              padding-right  20px
           .text
              display  flex
              flex-direction  column
              justify-content  center
              flex  1
              line-height  20px
              overflow  hidden
              font-size  $font-size-medium
              .name
                 margin-bottom  10px
                 color  $color-text
              .desc
                 color  $color-text-d
        .loading-container
           position  absolute
           width  100%
           top  50%
           transform  translateY(-50%)
</style>
