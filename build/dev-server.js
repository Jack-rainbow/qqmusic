require('./check-versions')()
/*用来把配置文件中的端口传入*/
var config = require('../config/index')
// opn插件是用来打开特定终端的，此文件用来在默认浏览器中打开链接 opn(url)
var opn = require('opn')
// nodejs路径模块
var path = require('path')
//node中web框架
var express = require('express')
var webpack = require('webpack')
// 引入http-proxy-middleware插件，此插件是用来代理请求的只能用于开发环境，目的主要是解决跨域请求后台api
var proxyMiddleware = require('http-proxy-middleware')

/*相对于build文件*/
var webpackConfig = require('./webpack.dev.conf.js')
var axios = require('axios')

var app = express() /*启动express*/
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
// dev服务器侦听传入流量的默认端口。
var port = process.env.PORT || config.dev.port
// 自动打开浏览器，如果没有设置将是错误的。
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// 定义HTTP代理到您的自定义API后端。
var proxyTable = config.dev.proxyTable
//express设置node环境变量为production
app.set('env', 'production');

/* exprss 路由级中间件 Router
* */
var apiRoutes = express.Router()
//express中的get请求
apiRoutes.get('/getDiscList', function (req, res) {

  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    /*将模拟的表头传入*/
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)/*将query获取到的参数转换为json格式*/
  }).catch((e) => {
    console.log(e)
  })
})
/*歌手信息抓取*/
apiRoutes.get('/getDiscList', function (req, res) {

  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    /*将模拟的表头传入*/
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)/*将query获取到的参数转换为json格式*/
  }).catch((e) => {
    console.log(e)
  })
})

/*只匹配/api后边路径的文件（加中间件。请求一次就use一次）
* 加载用于处理http请求的middleware（中间件），当一个请求来的时候，会依次被这些中间件处理。
* */
app.use('/api', apiRoutes)

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// 当html-webpack-plugin模板发生变化时，强制页面重新加载。
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

//代理解Object.keys
// 代理api请求
//proxyMiddleware 使用这个解决跨域请求
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// 处理h5历史API
app.use(require('connect-history-api-fallback')())

// 服务webpack束输出
app.use(devMiddleware)

//热重载，，，来进行页面的热重载的,刷新浏览器
app.use(hotMiddleware)

// 静态资源
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
/*设置以static为根目录的静态资源*/
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // 当env测试时，不需要打开它。
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

//服务器监听端口和IP
var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
