/*入口文件-初始化*/
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex) //注册插件
/* 
 *     * as语法就是将actions变为一个对象从而可以直接 actions.aa  来获取actions文件中的属性
 *	注意：
        * 一个页面只能有一个store
        * 状态存储是响应式的
        * 不能直接改变store中的状态，唯一途径显示地提交mutations
 * */
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'
//vuex调试工具
//build 环境是prouction  
//dev 环境就是NODE_ENV
const debug = process.env.NODE_ENV !== 'production'
 
//创建一个最大的仓库
export default new Vuex.Store({
	/*作为参数传入*/
	actions,
	getters,
	state,
	mutations,
	strict:debug,// 开启严格模式（线上环境不推荐使用,耗费内存）,
	plugins: debug ? [createLogger()] : []
})
