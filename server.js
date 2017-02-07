/**
 * Created by zhoujun on 2017/2/6.
 * email :zhoujun247@gmail.com
 */

import Koa from 'koa';
import Router from 'koa-router';
import messageRouter from './src/router/messageRouter';
import bodyparser from 'koa-bodyparser';
const path = require('path');
var send = require('koa-send');
const app = new Koa();

app.use(bodyparser());
app.use(messageRouter.routes(),messageRouter.allowedMethods());

app.use(async function (ctx, next){
	await send(ctx, 'index.html');
})
app.listen(4000);
console.log('listen:4000')