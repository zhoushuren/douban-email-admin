/**
 * Created by zhoujun on 2017/2/8.
 * email :zhoujun247@gmail.com
 */

import React from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import Add from './activity/Add'
import MsgList from './MsgList'
export class Activity extends  React.Component {
	ChangeTab(){

	}
	render() {
		return (
			<Tabs defaultActiveKey="2" onChange={this.ChangeTab}>
				<TabPane tab="添加活动" key="1">
					<Add />
				</TabPane>
				<TabPane tab="活动列表" key="2">
					<MsgList />
				</TabPane>
			</Tabs>
		)
	}
}
export default Activity;