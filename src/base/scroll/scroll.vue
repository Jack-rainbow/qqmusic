<template>
    <div ref="warpper">
      <slot></slot>
    </div>
</template>

<script>
  import BScroll from "better-scroll"
    export default{
      props:{
        probtType:{
          type:Number,
          default:1
        },
        click:{
          type:Boolean,
          default:true
        },
        data:{
          type:Array,
          default:null
        },
        listenScroll:{
          type:Boolean,
          dafault:false
        }
      },
      data(){
        return{

        }
      },
      mounted(){
        setTimeout(()=>{
          this._inscroll()
        },20)
      },
      methods:{
        _inscroll(){
            if(!this.$refs.warpper){
              return
            }
          this.scroll=new BScroll(this.$refs.warpper,{
            probeType:this.probtType,
            click:this.click
          })
          if(this.listenScroll){
            let that=this
            /*pops是一个对象，里边可以看到X和Y轴*/
            this.scroll.on('scroll',(pops)=>{
              that.$emit('scroll',pops)
            })

          }
        },
        enable(){
          this.scroll&&this.scroll.enable()/*默认开启scroll*/
        },
        disable(){
          this.scroll&&this.scroll.disable()/*如果有那么就禁用掉scroll*/
        },
        refresh(){
          this.scroll&&this.scroll.refresh()/*当每次scroll变化的时候重新计算scroll*/
        },
        scrollTo(){
          /*scrollTo为什么要用arguments，因为有时候scrollTo中会有一些参数传到scrollto中，所以要是用apply，让
          * scrollTo()去继承scrioll中的参数
          * */
          this.scroll&&this.scroll.scrollTo.apply(this.scroll,arguments)
        },
        scrollToElement() {
          this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        }

      },
      watch:{
        /*因为data数据发生变化了，需要重新计算scroll，所以就需要调用refresh()*/
        data(){
        //经验证的一般为17ms,20ms完全可以.用户无知觉
          setTimeout(()=>{
            this.refresh()
          },20)
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

</style>
