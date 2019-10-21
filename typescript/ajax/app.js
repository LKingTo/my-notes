const Koa = require('koa')
const Router = require('koa-router')
const Static = require('koa-static')

let app = new Koa()
let router = new Router()

router.get('/test', async ctx => {
	ctx.body = {
		code: 200,
		message: '请求成功'
	}
})

app.use(Static('./static'))
app.use(router.routes())
app.listen(3000)