/*对数据映射.映射到组件中*/
/*把state当做参数传进来*/
/*在组件内部获取store中状态的函数*/

export const singers=state=>state.singer/*singer是state中的属性*/
export const playing=state=>state.playing
export const fullScreen=state=>state.fullScreen
export const playlist=state=>state.playlist
export const squenceList=state=>state.squenceList
export const mode=state=>state.mode
export const currentIndex=state=>state.currentIndex

export const currentSong=(state)=>{
	return state.playlist[state.currentIndex]|| {}
}