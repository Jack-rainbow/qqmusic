import * as types from './mutation-typs'
//唯一修改状态的事件回调函数
//切记在Vuex中store数据改变的唯一方法就是mutation！
//因为matutaions是一个方法
 const matutaions={
	/*第一个参数----获取当前的state文件里边的state
	 *第二个参数--设置传进来的参数
	 * */
	
	//ES6风格的计算属性命名功能来使用一个常量作为函数名
	/*[types.SET_SINGER](state,singer) 获取mutation-typs里边的属性SET_SINGER 
	 *切记 声明就暴露
	 *  
	 * */
	[types.SET_SINGER](state,singerq){
    //可根据传进来的参数，进行对后台的状态值内容的改变
		state.singer=singerq
	},
	[types.SET_PLAYING_STATE](state,flag){
		state.plsy=flag
	},
	[types.SET_FULL_SCREEN](state,flag){
		state.fullScreen=flag
	},
	[types.SET_PLAYLIST](state,list){
		state.playList=list
	},
	[types.SET_SQUENCE_LIST](state,list){
		state.squenceList=list
	},
	[types.SET_PLAY_MODE](state,mode){
		state.mode=mode
	},
	[types.SET_CURRENT_INDEX](state,index){
		state.currentIndex=index
	},
}
export default matutaions
