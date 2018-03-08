<template>
   <div class="slider" ref="slider">
      <div class="slider-group" ref="sliderGroup">
        <slot>

        </slot>
      </div>
     <div class="dots">
        <span class="dot" v-for="(value,index) in dots" :class="{active:pageIndex===index}"></span>
     </div>
   </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import { addClass,hasClass } from 'common/js/dom'
    export default{
      name:"slider",
      props: {
        loop: {
          type: Boolean,
          default: true
        },
        autoPlay: {
          type: Boolean,
          default: true
        },
        interval: {
          type: Number,
          default: 4000
        }
      },
      data(){
        return {
          dots:[],
          pageIndex:0
        }
      },
      mounted(){
        /*浏览器的刷新时间一般为17毫秒一次*/
        setTimeout(() => {
            this._setSliderWidth(),
            this._initSlider(),
            this._initdos()

            if(this.autoPlay){
              this._autoPlay()
            }
        },20)

        window.addEventListener('res',()=>{
          if(!this._setSliderWidth){
            return
          }
          this._setSliderWidth(true)
          /*当宽度发生变化的时候，让页面重新计算*/
          this.slider.refresh()
        })
      },
      methods:{
        /*宽度改变，设置样式*/
        _setSliderWidth(isRe){
          /*通过在元素中绑定ref，并且通过$refs可获取到他的子元素*/
          this.children=this.$refs.sliderGroup.children

 //         console.log(this.children)
          /*设置sliderGroup元素的宽度*/
          let width=0
          /*设置slider元素的宽度*/
          let sliderWidth=this.$refs.slider.clientWidth
//          console.log(sliderWidth)
          for(let i=0;i<this.children.length;i++){
            let child=this.children[i]
            addClass(child,'slider-item')
            /*子容器的宽度就是等于父容器的宽度*/
            child.style.width = sliderWidth+ 'px'
            width+=sliderWidth
          }
          if(this.loop&& !isRe){
            /*因为形成循环，左右各加一个标签所以要加上这2个标签的宽度*/
            width +=2*sliderWidth
          }
          this.$refs.sliderGroup.style.width = width + 'px'
        },
        /*轮播*/
        _initSlider(){
          this.slider =new BScroll(this.$refs.slider,{
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: {
              loop: this.loop, // 开启循环播放
              threshold: 0.3, // 滚动距离超过宽度/高度的 30% 时切换图片
              speed: 400 // 切换动画时长 400ms
            }
          })
          this.slider.on('scrollEnd', () => {
              let pIndex = this.slider.getCurrentPage().pageX
              this.pageIndex = pIndex
            if(this.autoPlay){
              /*clearTimeout(this.timer)*/
              this._autoPlay()
            }
          })
          this.slider.on('beforeScrollStart',() => {
            if(this.autoPlay){
                clearTimeout(this.timer);
              }
            })

        },
        /*分页器*/
        _initdos(){
          this.dots = new Array(this.children.length-2)
        },
        /*自动播放*/
        _autoPlay(){
          let pagIndx=this.pageIndex+1
          this.timer=setTimeout(()=>{
              /*goTopage(x方向,y方向，间隔 )
              * 因为是横向轮播，所以只需要改变x轴就可以
              * goTopage 方法自动轮播
              * */
              this.slider.goToPage(pagIndx,0,400)
          },this.interval)
        }
      },
      destoryed(){
        /*如果页面中有定时器一类的，建议在销毁之前清除所有定时器,释放内存 */
        clearTimeout(this.timer)
      }


    }
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

    .slider
      min-height  1px
      .slider-group
        position  relative
        overflow  hidden
        white-space  nowrap
        .slider-item
          float  left
          box-sizing  border-box
          overflow  hidden
          text-align  center
          a
            display  block
            width  100%
            overflow  hidden
            text-decoration  none
          img
            display  block
            width  100%
      .dots
        position  absolute
        right  0
        left  0
        bottom  12px
        text-align  center
        font-size  0
        .dot
          display  inline-block
          margin  0 4px
          width  8px
          height  8px
          border-radius  50%
          background  $color-text-l
          &.active
            width  20px
            border-radius  5px
            background  $color-text-ll
</style>
