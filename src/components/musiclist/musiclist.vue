<template>
  <div class="music-list">
    <div class="back" @click="prev">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="bgTitle"></h1>
    <div class="bg-image" :style="bgstyle" ref="bgimg">
     <div class="play-wrapper" v-show="songs.length">
     	<div class="play" ref='playbtn'>
     		<i class="icon-play"></i>
     		<span class="text">随机播放全部</span>
     	</div>
     </div>
     <div class="filter" ref='gshh'></div>
  
    </div>
    <div class="bg-layer" ref='bglayer'></div>
    <scroll :probe-Type='probeType' 
	    	:listen-scroll='listenScroll' 
	    	@scroll='scroll' 
	    	:data='songs' 
	    	class='list' ref='songlist'>
    	<div class="song-list-wrapper">
    		<song-list  @player="playere" :songss='songs'></song-list>
    	</div>
    	<div v-show="!songs.length" class="loading-container">
	        <loading></loading>	
	    </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
	import {prefixStyle} from 'common/js/dom'
	import Scroll from 'base/scroll/scroll'
	import SongList from "base/song-list/song-list"	
	import Loding from 'base/loading/loading'
	import {mapActions} from 'vuex'
	const YU_HEIGHT=40
	const tranform = prefixStyle('transform')
	const backdrop = prefixStyle('backdrop-filter') 
	export default {
		
		 props:{
		 	/*根据页面结构来判断三个的类型，和所需的数据*/
		 	bgImage:{
		 		type:String,
		 		default:''
		 	},
		 	songs:{
		 		type:Array,
		 		default:[]
		 	},
		 	bgTitle:{
		 		type:String,
		 		default:''
		 	} 
		 },
		 computed:{
		 	bgstyle(){
		 		return `background-image:url(${this.bgImage})`
		 	}
		 },
		 data(){
		 	return {
		 		scrollY:0
		 	}
		 },
		 methods:{
		 	scroll(pos){
		 		this.scrollY=pos.y

		 	},
		 	prev(){
		 		this.$router.back()
		 		
		 	},
		 	playere(item,index){
		 		var urlId=this.$route.params.id
		 		//item是当前的这首歌，而组件是播放list（所有歌）
				this.$router.push('/player/'+urlId)
		 /*		this.selectPlay({
		 			//把数据传送到list中
		 			list:this.songs,
		 			index:index
		 		})*/
		 	},
		 	...mapActions([
		 		'selectPlay'
		 	])
		 },
		 watch:{
		 	scrollY(newy){
		 		//max() 方法可返回两个指定的数中带有较大的值的那个数。
		 		let translateY=Math.max(this.minscrolly,newy)
		 		let zIndex=0 //zindex
		 		let scale=1 //缩放
		 		let blur=0 //高斯模糊
		 		this.$refs.bglayer.style['willChange']='transform'
		 		this.$refs.bglayer.style[tranform]=`translate3d(0,${translateY}px,0)`
		 		const percent=Math.abs(newy	/ this.imgHeight)
		 		if(newy>0){
		 			scale=1+percent
		 			zIndex=10
		 		}else{
		 			blur=Math.min(20*percent,20)
		 		}
		 		this.$refs.gshh.style[backdrop]=`blur(${blur})`
		 		if(newy<this.minscrolly){
		 			zIndex=10
		 			this.$refs.bgimg.style.paddingTop=0
		 			this.$refs.bgimg.style.height=`${YU_HEIGHT}px`
		 			this.$refs.playbtn.style.display='none'
		 		}else{
		 			this.$refs.bgimg.style.paddingTop='70%'
		 			this.$refs.bgimg.style.height=0
		 			this.$refs.playbtn.style.display='block'
		 		}
		 		this.$refs.bgimg.style.zIndex=zIndex
		 		//开启GPU加速
		 		this.$refs.bgimg.style['transform']='translateZ(0)'
		 		/*this.$refs.bgimg.style['willChange']='transform'*/
		 		this.$refs.bgimg.style[tranform]=`scale(${scale})`
		 	}
		 },
		 components:{
		 	Scroll,
		 	Loding,
		 	SongList
		 },
		 created(){
		 	this.probeType=3,
		 	this.listenScroll=true
		 },
		 mounted(){
		 	this.imgHeight=this.$refs.bgimg.clientHeight
		 	this.minscrolly=-this.imgHeight+YU_HEIGHT
		 	//this.$refs.songlist.top的高度就是等于 bgimg的图片高度 (均分屏幕)
		 	this.$refs.songlist.$el.style.top= `${this.$refs.bgimg.clientHeight}px`

		 	
		 }
		 
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>