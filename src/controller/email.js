/**
 * Created by zhoujun on 2017/2/7.
 * email :zhoujun247@gmail.com
 */




var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/test_db';
var ObjectID = require('mongodb').ObjectID;
var exec = require('child_process').exec;

export async function setUrl( ctx,next ) {
	const db = await MongoClient.connect(DB_CONN_STR);
	var collection = db.collection('douban_url');
	let url = ctx.request.body.url;
	let desc = ctx.request.body.desc;
	let type = ctx.request.body.typeValue;
	console.log(type);
	let result = await collection.insert({
		url :url,
		desc :desc,
		type: type,
		time: Date.now()
	});

	ctx.body = {
		result : true,

	}
}

export async function delUrl( ctx,next ) {
	const db = await MongoClient.connect(DB_CONN_STR);
	var collection = db.collection('douban_url');
	let _id = ctx.request.body._id;

	let result = collection.remove({_id: ObjectID(_id)});
	if(result){
		ctx.body = {
			result: true
		}
	}

}

export async function runPC(ctx,next){
	let id = ctx.query.id;
	let conndition = {};
	if(id){
		conndition._id = ObjectID(id)
	}
	const db = await MongoClient.connect(DB_CONN_STR);
	var collection = db.collection('douban_url');
	let result = await collection.find(conndition).toArray();
	console.log(result);
	result.forEach((item)=>{
		var cmdStr = 'python /home/www/feisu/src/py/dou.py ';
		cmdStr += item.url;
		console.log(cmdStr)
		exec(cmdStr,function (err,stdout,stderr){
			console.log('python执行结果')
			console.log(stdout);

		})
	})

	ctx.body = {
		result : true,
		msg: '爬取完毕'
	}


}

export async function sousuo(ctx,next){
	let time = ctx.request.body.time;
	console.log(time);
	const db = await MongoClient.connect(DB_CONN_STR);
	var collection = db.collection('douban');
	let email = await collection.find({time:parseInt(time)}).toArray();
	let strEmail = '';
	email.forEach((item)=>{
		strEmail += item._email + ',';
	})
	ctx.body = {
		email:strEmail
	}
}

export async function love(ctx,next){
	await ctx.render('love',{layout:'null', title:'主页'});

}

export async function day(ctx,next){

	const db = await MongoClient.connect(DB_CONN_STR);
	var collection = db.collection('douban');
	let dtime  =new Date(new Date().toLocaleDateString()).getTime() /1000;
	let email = await collection.find({time:{$gt:dtime }}).toArray();
	let strEmail = '';
	email.forEach((item)=>{
		strEmail += item._email + ',';
	})
	ctx.body = {
		email:strEmail
	}
}

export async function getEmailList(ctx,next){

	const db = await MongoClient.connect(DB_CONN_STR);
	var collection = db.collection('douban');
	let dtime  =new Date(new Date().toLocaleDateString()).getTime() /1000;
	let email = await collection.find({}).toArray();

	ctx.body = {
		list: email
	}
}

export async function getUrlList(ctx,next){
	const db = await MongoClient.connect(DB_CONN_STR);
	var collection = db.collection('douban_url');
	let result = await collection.find().toArray();

	ctx.body = {
		list: result
	}
}