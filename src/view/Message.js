/**
 * Created by zhoujun on 2017/2/6.
 * email :zhoujun247@gmail.com
 */
import React from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import Send from './Send'
import MsgList from './MsgList'
export class Message extends  React.Component {
	ChangeTab(){

	}
	render() {
		return (
			<Tabs defaultActiveKey="2" onChange={this.ChangeTab}>
				<TabPane tab="发送消息" key="1">
					<Send />
				</TabPane>
				<TabPane tab="已发消息" key="2">
					<MsgList />
				</TabPane>
			</Tabs>
		)
	}
}
export default Message;