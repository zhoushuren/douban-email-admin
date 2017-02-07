/**
 * Created by zhoujun on 2017/2/7.
 * email :zhoujun247@gmail.com
 */

'use strict';

import mysql from 'mysql';
import Promise from 'bluebird';

import {Mysqloptions} from '../../config';
var Pool = require("mysql/lib/Pool");
var Connection = require("mysql/lib/Connection");
Promise.promisifyAll([Pool, Connection]);

function createMysqlPool(  ) {
	return mysql.createPool(Mysqloptions);
}
var Pool = createMysqlPool();
function Db (){

}
Db.prototype.mysqlConn = '';

Db.prototype.getConnection = async function(){
	let _this = this;
	return Pool.getConnectionAsync().then((r)=>{
		_this.mysqlConn  = r;
		return r;
	});
}

Db.prototype.release = async function(){
	return this.mysqlConn.release();
}

Db.prototype.query = async  function (sql,value){
	return Pool.queryAsync(sql,value);
}
Db.prototype.findOne = async  function (sql,value){
	let result = await this.query(sql,value);
	return result[0]
}

Db.prototype.beginTransaction = async function (){

}

export default Db;