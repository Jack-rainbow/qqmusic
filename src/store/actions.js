/*获取数据--提交mutation改变状态*/
import * as types from './mutation-typs'

//commit 方法 state属性   
export const selectPlay	= function ({commit, state}, {list, index}) {
	commit(types.SET_SQUENCE_LIST,list)
	commit(types.SET_PLAYLIST,list)
	commit(types.SET_CURRENT_INDEX,index)
	commit(types.SET_FULL_SCREEN,true)
	commit(types.SET_PLAYING_STATE,true)
}

//在一个组件中多次调用mutation，往往会封装一个action
//list为单击的列表，index是单击的索引