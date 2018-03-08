/*包含所有应用级别状态的对象*/
import {playMode} from 'common/js/config'
const  state={
	singers:{},
	playing: false,//播放
	fullScreen:false,//全屏
	playList:[],//播放列表
	squenceList:[],//播放顺序
	mode:playMode.swquence,//key值
	currentIndex:-1//当前播放的索引
}

export default state
