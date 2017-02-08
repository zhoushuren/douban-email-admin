/**
 * Created by zhoujun on 2017/2/6.
 * email :zhoujun247@gmail.com
 */

import Koa from 'koa';
import Router from 'koa-router';
import messageRouter from './src/router/messageRouter';
import bodyparser from 'koa-bodyparser';
const session = require('koa-session')
const convert = require('koa-convert');
const path = require('path');
var send = require('koa-send');
const app = new Koa();


app.keys = ['some secret hurr'];

var CONFIG = {
	key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
	maxAge: 86400000, /** (number) maxAge in ms (default is 1 days) */
	overwrite: true, /** (boolean) can overwrite or not (default true) */
	httpOnly: true, /** (boolean) httpOnly or not (default true) */
	signed: true, /** (boolean) signed or not (default true) */
};
app.use(convert(session(CONFIG,app)));

app.use(async(ctx,next)=>{


	if(ctx.path == '/login' && !ctx.session.login ){
		await send(ctx, 'index.html');
	}else{
		if(ctx.path == '/login'){
			ctx.redirect('/');
		}

		if(ctx.session.login || ctx.path == '/post_login'){
			await next();
		}else{
			ctx.redirect('login');
		}
	}



});

app.use(bodyparser());
app.use(messageRouter.routes(),messageRouter.allowedMethods());

app.use(async function (ctx, next){
	await send(ctx, 'index.html');
})
app.listen(4000);
console.log('listen:4000')