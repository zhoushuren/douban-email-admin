/**
 * Created by zhoujun on 2017/2/7.
 * email :zhoujun247@gmail.com
 */


var rp = require('request-promise');
var moment = require('moment');
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
import qs from 'querystring';
export async function runPC(ctx,next){
	let id = ctx.query.id;
	let conndition = {};
	if(id){
		conndition._id = ObjectID(id)
	}
	const db = await MongoClient.connect(DB_CONN_STR);
	var collection = db.collection('douban_url');
	let result = await collection.find(conndition).toArray();
	let obj = result[0];
	console.log(obj);
	if(obj.type == 1){
		var options = {
			method: 'POST',
			uri: 'http://127.0.0.1:8001/get_email',
			body: qs.stringify({
				url: obj.url,
				//		desc: obj.desc
			}),
			headers:{
				'Content-Type':'application/x-www-form-urlencoded'
			},
			json: true // Automatically stringifies the body to JSON
		};
	}else if(obj.type ==2){

	}

	let res = await rp(options);
	let len = res.emailList.length;
	if( res.emailList.length >0){
		var coll_douban = db.collection('douban');
		let countSuccess = 0;
		res.emailList.map(async (r)=>{
				try{
					r.desc = obj.desc
					let result = await  coll_douban.insert(r);
					countSuccess++
					console.log(result);
				}catch (e){
					console.log('插入失败');
				//	console.log(e);
				}
		});
		console.log(countSuccess);

		ctx.body = {
			result:true,
			msg: '爬取成功',
			res: res,
			length: len,
			countSuccess: countSuccess
		}

	}else{
		ctx.body = {
			result:false,
			msg: '貌似没有爬到',
			res: res,
			length: len
		}
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
	let status = {};
	console.log(ctx.query.status);
	if(ctx.query.status == '0'){
		status.status = 0
	}
	console.log(status)
	const db = await MongoClient.connect(DB_CONN_STR);
	var collection = db.collection('douban');
	//let dtime  =new Date(new Date().toLocaleDateString()).getTime() /1000;
	let email = await collection.aggregate([

		{ $match : status},
		{
			$group : {_id : "$time", count : {$sum : 1},desc:{$push:"$desc"},status:{$push:"$status"}},
		},
			{
				$sort: {
					"_id": -1
				}
			},
	]).toArray();
	//console.log(email)
	ctx.body = {
		list: email.map((r)=>{
			var day = moment.unix(parseInt(r._id));
			r.desc = r.desc[0] ?  r.desc[0] : '';
			let send = 0;
			r.status.forEach((sta)=>{
				if(sta == 1){
					send +=1
				}
			});
			r.send = send
			r.time =   day.format("YYYY-MM-DD hh-mm-ss");
			return r;
		})
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

export async function getEmailByTime(ctx,next){
	let time = ctx.query.time;
	const db = await MongoClient.connect(DB_CONN_STR);
	var collection = db.collection('douban');
	let email =  await collection.find({time:parseInt(time)}).toArray();
	console.log(time);
	console.log(email);
	ctx.body ={
		list: email
	}
}

export async function setStatus(ctx,next){
	let time = ctx.query.id;
	const db = await MongoClient.connect(DB_CONN_STR);
	var collection = db.collection('douban');
	console.log(time);
	let email =  await collection.update({time:parseInt(time)},{"$set":{'status':1}},{multi:true});
	//console.log(email);
	if(email.result.ok == 1){
		ctx.body = {
			result: true,
			msg: '设置成功'
		}

	}else{
		ctx.body = {
			result: false,
			msg: '设置失败'
		}

	}

}