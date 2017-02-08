/**
 * Created by zhoujun on 2017/2/6.
 * email :zhoujun247@gmail.com
 */
import Router from 'koa-router';
var router = new Router();
import {addMsg,getMsgList,deleteMsg,login} from '../controller/messageController';
router.post('/api', addMsg);
router.get('/get_msg_list', getMsgList);
router.get('/delete_msg', deleteMsg);


router.post('/post_login', login);

export default router;