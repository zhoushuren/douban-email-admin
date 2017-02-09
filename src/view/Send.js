/**
 * Created by zhoujun on 2017/2/6.
 * email :zhoujun247@gmail.com
 */
import { Form, Input, DatePicker, Col,Button,message } from 'antd';
import React from 'react';
import http from '../http';
const FormItem = Form.Item;

export class Send extends React.Component{
	constructor(props){
		super(props);
		this.state = {titleValue: ''};
	}
	checkInput(name,event){
		if(name == 'title'){
			this.setState({titleValue:event.target.value});
		}else if(name== 'summary'){
			this.setState({summaryValue: event.target.value});
		}else if(name== 'url'){
			this.setState({url: event.target.value});
		}
	}

	onSubmit(event){
		this.setState({ loading: true });
		console.log(this.state);
		if(this.state.titleValue == undefined || this.state.titleValue =='' ){
			message.warning('标题不能为空');
			this.setState({
				loading: false,
				validateStatusTitle: 'error'
			});
			return;
		}else{

			this.setState({
				validateStatusTitle: 'success'
			});
		}

		if(this.state.summaryValue == undefined || this.state.summaryValue == '' ){
			message.warning('摘要不能为空');
			this.setState({
				loading: false,
				validateStatusSummary: 'error'
			});
			return;
		}else{
			this.setState({
				loading: false,
				validateStatusSummary: 'success'
			});
		}
		if(this.state.url == undefined || this.state.url == '' ){
			message.warning('url不能为空');
			this.setState({
				loading: false,
				validateStatusUrl: 'error'
			});
			return;
		}else{
			this.setState({
				loading: false,
				validateStatusUrl: 'success'
			});
		}

		http('/api', {
			method: 'POST',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((data)=> {
			if(data.result){
				this.setState({
					loading: false,
					summaryValue:'',
					titleValue:'',
					url: ''
				});
				message.success('消息发送成功');

			}

		}).catch((e)=>alert(e.message));
	}


	render(){
		return (
			<Form>
				<FormItem
					label="消息标题"
					labelCol={{ span: 5 }}
					wrapperCol={{ span: 12 }}
					hasFeedback
					validateStatus={this.state.validateStatusTitle}
				>
					<Input placeholder="请输入消息标题" value={this.state.titleValue} onChange={this.checkInput.bind(this,'title')} />
				</FormItem>
				<FormItem
					label="摘要"
					labelCol={{ span: 5 }}
					wrapperCol={{ span: 12 }}
					hasFeedback
					validateStatus={this.state.validateStatusSummary}
				>
					<Input placeholder="请输入摘要" value={this.state.summaryValue} onChange={this.checkInput.bind(this,'summary')} />
				</FormItem>
				<FormItem
					label="网页链接"
					labelCol={{ span: 5 }}
					wrapperCol={{ span: 12 }}
					hasFeedback
					validateStatus={this.state.validateStatusUrl}
				>
					<Input placeholder="请输入网页链接"  value={this.state.url} onChange={this.checkInput.bind(this,'url')} />
				</FormItem>
				<FormItem
					wrapperCol={{ span: 12, offset: 6 }}
				>
					<Button loading={this.state.loading} type="primary" htmlType="submit" size="large" onClick={this.onSubmit.bind(this)}>提交</Button>
				</FormItem>
			</Form>
		)
	}
}

export default Send;