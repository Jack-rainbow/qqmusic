<template>
	<transition name="dafe">
	 	<music-list :songs='song' :bg-image='bgimage' :bg-title='bgtit'></music-list>
    </transition>
</template>

<script>
	
	import MusicList from 'components/musiclist/musiclist'
	import { mapGetters } from 'vuex'
	import { MusicSinger } from 'api/singger' 
	import { creatSong } from 'common/js/song'
	import { ERR_OK } from 'api/config'
    export default{
    	data(){
    		return{
    			song:[]/*,
    			singers:{
    				id:''
    			}*/
    		}
    	},
    	computed:{
    		bgimage(){
    			return this.singers.avatar
    		},
    		bgtit(){
    			return this.singers.name
    		},
    		/*此时得到getters中的数据，而singer也是getters.中的常量*/
    		...mapGetters([
    			'singers'
    		])
    	},
    	created(){
    		this._musicDetail()
    	},
    	methods:{
    		_musicDetail(){
	    		//未生效
//	  			if(!this.singers.id){ 
//	  				this.$route.push('/singer')
//		         	return
//					
//		        }
				
		    	MusicSinger(this.singers.id).then((res) => {
				        if (res.code === ERR_OK) {
				            this.song = this._normalSongs(res.data.list)
				      		
				        }
				})    
    		},
    		_normalSongs(list){
    			let ret=[]
    			list.forEach((item)=>{
    				let { musicData } = item
    				if(musicData.songid && musicData.albummid){
    					ret.push(creatSong(musicData))
    				}
    			})
    			return ret
    		}
    	},
    	components:{
    		MusicList	
    	}
    }
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  
  .dafe.enter-active,.dafe-leave-active
  	transition  all 0.3s ease
  	
  .dafe.enter,.dafe-leave-to
  	/*translate3d-x到全覆盖*/
  	transform translate3d(100%,0,0)  
  
    
</style>
