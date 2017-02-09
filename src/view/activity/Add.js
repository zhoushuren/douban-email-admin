/**
 * Created by zhoujun on 2017/2/8.
 * email :zhoujun247@gmail.com
 */
/**
 * Created by zhoujun on 2017/2/6.
 * email :zhoujun247@gmail.com
 */
import { Form, Input, DatePicker, Col,Button,message } from 'antd';
import React from 'react';
import http from '../../http';
const FormItem = Form.Item;

export class Add extends React.Component{
	constructor(props){
		super(props);
		this.state = {titleValue: ''};
	}
	checkInput(name,event){
		if(name == 'name'){
			this.setState({name:event.target.value});
		}else if(name== 'json'){
			this.setState({json: event.target.value});
		}
	}

	onSubmit(event){
		this.setState({ loading: true });
		console.log(this.state);
		if(this.state.name == undefined){
			message.warning('名称不能为空');
			this.setState({
				loading: false,
				validateStatusTitle: 'error'
			});
			return;
		}else{

			this.setState({
				validateStatusTitle: ''
			});
		}

		if(this.state.json == undefined ){
			message.warning('json为空');
			this.setState({
				loading: false,
				validateStatusTitle: 'error'
			});
			return;
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
					label="活动名称"
					labelCol={{ span: 5 }}
					wrapperCol={{ span: 12 }}
					hasFeedback
					validateStatus={this.state.validateStatusTitle}
				>
					<Input placeholder="请输入消息备注" value={this.state.name} onChange={this.checkInput.bind(this,'name')} />
				</FormItem>

				<FormItem
					label="活动的json"
					labelCol={{ span: 5 }}
					wrapperCol={{ span: 12 }}
					hasFeedback
					validateStatus="success"
				>
					<Input placeholder="注意json格式一定要正确，否则无法添加"  value={this.state.json} onChange={this.checkInput.bind(this,'json')} />
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

export default Add;