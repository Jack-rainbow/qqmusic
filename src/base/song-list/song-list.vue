<template>
	<div class="song-list">
		<ul>
			<li  @click='selectItem(songq,index)' v-for="(songq,index) in songss" class="item">
				<div class="content">
					<h2 class="name">{{songq.name}}</h2>
					<p class="desc">{{getDesc(songq)}}</p>
				</div>
			</li>
		</ul>
		<div class="loading-container" v-show="songss.length">
    		<loading></loading>
    	</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import Loading from 'base/loading/loading'
	export default {
		props:{
			songss:{
				type:Array,
				default:[]
			}
		},
		methods:{
			
			//传送父组件(索引和内容 发送出去)
			selectItem(item,index){
				this.$emit('player',item,index)
			},
			getDesc(song){
			
				return `${song.singer}.${song.album}`
			}
		},
		mounted(){},
		components:{
			Loading
		}
		
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      .rank
        flex: 0 0 25px
        width: 25px
        margin-right: 30px
        text-align: center
        .icon
          display: inline-block
          width: 25px
          height: 24px
          background-size: 25px 24px
          /*&.icon0
            bg-image('first')
          &.icon1
            bg-image('second')
          &.icon2
            bg-image('third')*/
        .text
          color: $color-theme
          font-size: $font-size-large
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: $color-text
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d
    .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>