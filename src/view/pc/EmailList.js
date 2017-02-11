/**
 * Created by zhoujun on 2017/2/7.
 * email :zhoujun247@gmail.com
 */

import { Table, Button ,Modal ,Input,Switch,Popconfirm} from 'antd';
const { Column, ColumnGroup } = Table;
import React from 'react';
import http from '../../http';


export class EmailList extends React.Component {
	constructor( props ) {
		super( props );
		this.state = { selectedRowKeys : '',loading:false,showEmailStr:false,emailStr:'',planEmail:'',PlanButtonDisabled: false};
		//this.setStatus({ selectedRowKeys : '',loading:false,showEmailStr:false,emailStr:'',planEmail:''})
	}
	start() {
		this.setState({ loading: true });
		// ajax request after empty completing
		setTimeout(() => {
			this.setState({
				loading: false,
			});
		}, 1000);
	}
	onSelectChange(selectedRowKeys) {
		console.log('selectedRowKeys changed: ', selectedRowKeys);
		this.setState({ selectedRowKeys });
	}
	componentDidMount(status){
		status = status == undefined ? 1 : status;
		http('/get_email_list?status='+status, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((data)=> {
			let list = data.list.map((r)=>{r.key=r._id; return r;})
			this.setState({ data: list });
		}).catch((e)=>alert(e.message));
	}
	render(){
		return (
			<div>
				<span>只显示未发:</span>
				<Switch defaultChecked={false} onChange={this.onChangeStatus.bind(this)} />,
				<Table dataSource={this.state.data}  >
					<Column
						title="ID"
						dataIndex="_id"
						key="id"
					/>
					<Column
						title="url备注"
						dataIndex="desc"
						key="desc"
					/>
					<Column
						title="数量"
						dataIndex="count"
					/>
					<Column
						title="日期"
						dataIndex="time"
					/>
					<Column
						title="已发数"
						dataIndex="send"
					/>
					<Column
						title="操作"
						render={(text, record) => (
							<span>
								{(function(_this){
									if(record.send == 0){
										return (<Button onClick={_this.setStatus.bind(_this,record._id)} type="danger">标记已发</Button>)
									}
								})(this)}
								
								<Button onClick={this.show.bind(this,record._id)} type="primary">显示邮箱</Button>
								<Popconfirm placement="leftTop" title="确定删除吗？不要后悔哦!" onConfirm={this.delete.bind(this,record._id)} okText="确定" cancelText="算了吧">
									<Button type="danger">删除</Button>|
								</Popconfirm>
									<PlanButton onClick = { this.addPlanEmail.bind(this,record._id)} disabled={this.state.PlanButtonDisabled} />
							</span>
						  )}
					/>
				</Table>
				<Modal title="邮箱结果" visible={this.state.showEmailStr}
					   onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
				>
					<p>
						<Input type="textarea" rows={30} value={this.state.emailStr} />
					</p>
					<p>直接复制就好了，别客气</p>
					<p>.</p>
				</Modal>

				<div>
					<Button onClick={this.deletePlan.bind(this)}>清掉备选框</Button>
					<Input value={this.state.planEmail} type="textarea" rows={10} />
				</div>
			</div>
		)
	}

	delete(id){
		http('/delete_email?time='+id, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((data)=> {
			this.componentDidMount();

		}).catch((e)=>alert(e.message));
	}

	setStatus(id){
		console.log(id);
		http('/set_status?id='+id, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((data)=> {
			this.componentDidMount();


		}).catch((e)=>alert(e.message));
	}

	show(time){
		http('/get_email_time?time='+time, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((data)=> {
			if(data && data.list.length>0){
				let str = '';
				data.list.forEach((r)=>{
					str += r._email +','
				});

				this.setState({
					showEmailStr: true,
					emailStr:str
				})
			}

		}).catch((e)=>alert(e.message));
	}

	addPlanEmail(time){
		http('/get_email_time?time='+time, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((data)=> {
			if(data && data.list.length>0){
				let str = '';
				data.list.forEach((r)=>{
					str += r._email +','
				});
				let planEmail = this.state.planEmail + str
				this.setState({
					PlanButtonDisabled: true,
					planEmail:planEmail
				})
			}

		}).catch((e)=>alert(e.message));

	}

	deletePlan(){
		this.setState({
			PlanButtonDisabled: false,	//列表的按钮状态
			planEmail:''
		})
	}

	handleOk(){
		this.setState({
			showEmailStr: false,
		})
	}
	handleCancel(){
		this.setState({
			showEmailStr: false,
		})
	}
	onChangeStatus(checked){
		let c = 1;
		if(checked){
			c= 0;
		}
		this.componentDidMount(c);
	}
}
export default EmailList;


class PlanButton extends  React.Component{
	constructor( props ) {
		super( props );
		this.state = {type: 'primary',disabled:false};
	}

	componentWillReceiveProps(nextProps){

		if(nextProps.disabled == false){
			this.setState({disabled: nextProps.disabled})
		}

	}

	render(){
		return (
			<Button disabled={this.state.disabled} type={this.state.type} onClick = {this.setStatus.bind(this)}>添加到备选框</Button>
		)
	}

	setStatus(){
		this.setState({ disabled: true});
		this.props.onClick();
	}
}