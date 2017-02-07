/**
 * Created by zhoujun on 2017/2/6.
 * email :zhoujun247@gmail.com
 */
const Redisoption = {
	port:  process.env.REDIS_PORT || 6379,
	host:  process.env.REDIS_HOST || '127.0.0.1',
	db:	 process.env.REDIS_DB || '1'
}

const  Mysqloptions = {
	user:  process.env.MYSQL_USER || 'root',
	password: process.env.MYSQL_PWD || '123456',
	database:  process.env.MYSQL_DB ||'pink-wallet',
	host:  process.env.MYSQL_HOST ||'127.0.0.1',
	charset: 'utf8mb4',
	connectionLimit : 200
};

export {
	Redisoption,
	Mysqloptions,
}