/**
 * Created by zhoujun on 2017/2/6.
 * email :zhoujun247@gmail.com
 */
import Router from 'koa-router';
var router = new Router();
import {addMsg,getMsgList,deleteMsg,login} from '../controller/messageController';

import * as eMail from '../controller/email';
router.post('/api', addMsg);
router.get('/get_msg_list', getMsgList);
router.get('/delete_msg', deleteMsg);
router.post('/post_login', login);

router.post('/seturl',eMail.setUrl);
router.post('/delurl',eMail.delUrl);
router.get('/runpc',eMail.runPC);
router.post('/sousuo',eMail.sousuo);
router.get('/love',eMail.love);
router.get('/day',eMail.day);
router.get('/get_email_list',eMail.getEmailList);
router.get('/get_url_list',eMail.getUrlList);
router.get('/get_email_time',eMail.getEmailByTime);
router.get('/set_status',eMail.setStatus);
router.get('/delete_email',eMail.deleteTime);

export default router;