import jsonp from "common/js/jsonp"
import {commonParams,options} from './config'
import axios from 'axios'

export function getRecomend() {

  const url='https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data=Object.assign({},commonParams,{
    platform:'h5',
    uin:0,
    needNewCode:1
  })

  /*通过调用jsonp文件，来获取jsonp格式*/
  return  jsonp(url,data,options)
}
/*访问的是本地NODE代理服务器*/
export function getDiscList() {
  const url = '/api/getDiscList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  /*format: 'json'  将数据转换为json格式*/
  //var qs=require('qs');
  var instance = axios.create({
    headers: {'content-type': 'application/x-www-form-urlencoded'}
  });
  return instance.get(url, {
      /*此时的params对象本地NODE服务中的params，通过params对数据进行操作*/
      params: data
    }).then((res) => {
      /*所谓Promise是一个对象，从它可以获取异步操作的消息。
      Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。
      *
      *Promise.resolve将现有对象转换为promise对象（代表异步已经获取成功数据）
      *
      * */
      return Promise.resolve(res.data)
    })
}
