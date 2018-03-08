import oldJSONP from 'jsonp'

export default function jsonp(url,data,option){
  url +=(url.indexOf('?')<0 ? '?':'&')+param(data)
  return new Promise(
      /*resolve代表调用成功,reject代表调用失败*/
      (resolve,reject)=>{
         oldJSONP(url,option,(err,data)=>{
            if(!err){
              resolve(data)
            }else{
              reject(err)
            }
          })
      })
}
/*
* encodeURIComponent
* 可将字符串作为URL进行转码
*
* */
function  param(data){
  let url=''
  for (var k in data){
    let value = data[k] !== undefined ? data[k]:''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url?url.substring(1):''
}
