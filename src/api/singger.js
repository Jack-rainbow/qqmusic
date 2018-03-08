import jsonp from "common/js/jsonp"
import {commonParams,options} from './config'

/*歌手页面抓取*/
export function GetSingerListCallback() {

  const url='https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data=Object.assign({},commonParams,{
    channel:'singer',
    page: 'list',
    key:'all_all_all',
    pagesize:100,
    pagenum:1,
    hostUin:0,
    needNewCode:0,
    platform:'yqq'
  })

  /*通过调用jsonp文件，来获取jsonp格式*/
  return  jsonp(url,data,options)
}

/*歌手信息抓取*/
export function MusicSinger(singermidId) {

  const url='https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data=Object.assign({},commonParams,{
  	hostUin: 0,
    needNewCode: 0,
		platform:'yqq',
		order:'listen',
		begin:0,
		num:100,
		songstatus:1,
		singermid:singermidId
  })

  /*通过调用jsonp文件，来获取jsonp格式*/
  return  jsonp(url,data,options)
}
