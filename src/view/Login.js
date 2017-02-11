/**
 * Created by zhoujun on 2017/2/8.
 * email :zhoujun247@gmail.com
 */
import React from 'react';

import { Form,Icon, Input, Button, Checkbox } from 'antd';
import http from '../http';
import './style/login.css';

const FormItem = Form.Item;
const Login = Form.create()(React.createClass({
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);

				http('/post_login', {
					method: 'POST',
					body: JSON.stringify(values),
					headers: {
						'Content-Type': 'application/json'
					}
				}).then((data)=> {
					if(data.result){

						alert('登录成功')
						location.href = '/'
					}

				}).catch((e)=>alert(e.message));
			}
		});
	},
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div id="login-page">
				<div className="main">
					<Form onSubmit={this.handleSubmit} className="login-form">
						<FormItem>
							{getFieldDecorator('username', {
								rules: [{ required: true, message: '请输入用户名!' }],
							})(
								<Input addonBefore={<Icon type="user" />} placeholder="请输入用户名" />
							)}
						</FormItem>
						<FormItem>
							{getFieldDecorator('password', {
								rules: [{ required: true, message: '请输入密码' }],
							})(
								<Input addonBefore={<Icon type="lock" />} type="password" placeholder="请输入密码" />
							)}
						</FormItem>
						<FormItem>
							{getFieldDecorator('remember', {
								valuePropName: 'checked',
								initialValue: true,
							})(
								<Checkbox>Remember me</Checkbox>
							)}
							<a className="login-form-forgot">Forgot password</a>
							<Button type="primary" htmlType="submit" className="login-form-button">
								登录
							</Button>
							Or <a>register now!</a>
						</FormItem>
					</Form>
				</div>
			</div>
		);
	},
}));
export default Login;