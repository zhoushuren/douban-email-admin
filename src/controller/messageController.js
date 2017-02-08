/**
 * Created by zhoujun on 2017/2/6.
 * email :zhoujun247@gmail.com
 */

import Db from '../model/db'
export async function addMsg (ctx,next){
	let data = ctx.request.body;
	if(data){

	}
	let db = new Db();
	let sql = 'insert into message SET ?';
	let value = {
		title: data.titleValue,
		summary: data.summaryValue,
		url: data.url,
		created_time: Math.round(Date.now() / 1000)
	};
	let result = await db.query(sql,value);
	if(result){
		ctx.body = {
			result: true,
			msg: '发送消息成功'
		}
	}

}

export async function getMsgList (ctx,next){

	let db = new Db();
	let sql = 'select * from message';
	let value = []
	let result = await db.query(sql,value);
	ctx.body = {
		result:true,
		list:result
	}
}

export async function deleteMsg(ctx,next){
	let db = new Db();
	let id = ctx.query.id;
	if(id == ''){
		ctx.body = 'error'
	}else{
		let sql = 'delete from message where id=?';
		let value = [id];
		let result = await db.query(sql,value);
		if(result){
			ctx.body = {
				result: true,
				msg: '删除成功'
			}
		}
	}

}