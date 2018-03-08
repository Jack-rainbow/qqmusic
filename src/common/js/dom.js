/*添加class*/
export  function addClass(el,className){
    if(hasClass(el,className)){
      return
    }
    let newClass=el.className.split(' ')
    newClass.push(className)
    el.className=newClass.join(' ')
}

/*判断class是否存在*/
export  function hasClass(el,className){
  /*el 表示当前的元素标签*/
  /*  (^|\\s)  表示开头或者空白字符
   * 因为获取到的字符是字符串所以要转义  \
   */
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

/* 获取获取
* 如果有name名那么就设置属性否则就获取他的属性
*el-元素，name-属性名，val-属性
* */
export function  getData(el,name,val){

  const prefix='data-'
  name=prefix+name
  if(val){
    return el.setAttribute(name,val)
  }else{
    return el.getAttribute(name)
  }
}


/*transform封装*/
let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
