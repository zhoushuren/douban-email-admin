/**
 * Created by zhoujun on 2017/2/7.
 * email :zhoujun247@gmail.com
 */
/**
 * Created by zhoujun on 2017/2/6.
 * email :zhoujun247@gmail.com
 */
import { Table, Button,Tabs,Form,Input,message,Select} from 'antd';
const { Column, ColumnGroup } = Table;
import React from 'react';
import http from '../../http';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
export class UrlList extends React.Component {
	constructor( props ) {
		super( props );
		this.state = { selectedRowKeys : '',loading:false,typeValue:'douban'};
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

	checkInput(name,event){
		if(name == 'title'){
			this.setState({desc:event.target.value});
		}else if(name== 'type'){
			console.log(event)
			this.setState({typeValue: event});
		}else if(name== 'url'){
			this.setState({url: event.target.value});
		}
	}

	onSubmit(event){
		this.setState({ loading: true });

		if(this.state.desc == undefined){
			message.warning('标题不能为空');
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

		if(this.state.summaryValue == undefined ){
			message.warning('摘要不能为空');
			this.setState({
				loading: false,
				validateStatusTitle: 'error'
			});
			return;
		}
		if(this.state.url == undefined){
			message.warning('url不能为空');
			this.setState({
				loading: false,
				validateStatusTitle: 'error'
			});
			return;
		}

		http('/seturl', {
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
				message.success('设置成功');
				this.componentDidMount();
			}

		}).catch((e)=>alert(e.message));
	}

	componentDidMount(){
		http('/get_msg_list', {
			method: 'get',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((data)=> {
			data.list.map((r)=>{r.key=r.id; return r;})
			this.setState({ data: data.list });
		}).catch((e)=>alert(e.message));
	}
	render(){
		return (
			<div>

				<Tabs defaultActiveKey="2" onChange={this.ChangeTab}>
					<TabPane tab="设置url" key="1">
						<Form>
							<FormItem
								label="备注"
								labelCol={{ span: 5 }}
								wrapperCol={{ span: 12 }}
								hasFeedback
								validateStatus={this.state.validateStatusTitle}
							>
								<Input placeholder="请输入消息备注" value={this.state.desc} onChange={this.checkInput.bind(this,'title')} />
							</FormItem>
							<FormItem
								label="类型"
								labelCol={{ span: 5 }}
								wrapperCol={{ span: 12 }}
								hasFeedback
								validateStatus="success"
							>
								<Select value={this.state.typeValue} defaultValue="douban" style={{ width: 120 }} onChange={this.checkInput.bind(this,'type')}>
									<Option value="douban">豆瓣</Option>
									<Option value="tieba">贴吧</Option>
								</Select>
							</FormItem>
							<FormItem
								label="网页链接"
								labelCol={{ span: 5 }}
								wrapperCol={{ span: 12 }}
								hasFeedback
								validateStatus="success"
							>
								<Input placeholder="请输入网页链接"  value={this.state.url} onChange={this.checkInput.bind(this,'url')} />
							</FormItem>
							<FormItem
								wrapperCol={{ span: 12, offset: 6 }}
							>
								<Button loading={this.state.loading} type="primary" htmlType="submit" size="large" onClick={this.onSubmit.bind(this)}>提交</Button>
							</FormItem>
						</Form>
					</TabPane>
					<TabPane tab="列表" key="2">
						<Table dataSource={this.state.data}  >
							<Column
								title="id"
								dataIndex="id"
								key="id"
							/>
							<Column
								title="Title"
								dataIndex="title"
							/>
							<Column
								title="summary"
								dataIndex="summary"
							/>
							<Column
								title="url"
								dataIndex="url"
							/>
							<Column
								title="操作"
								render={(text, record) => (
							<span>
								<Button onClick={this.delete.bind(this,record.id)} type="danger">删除</Button>|
								<Button onClick={this.delete.bind(this,record.id)} type="primary">爬一下</Button>|
								<Button onClick={this.delete.bind(this,record.id)} type="primary">显示当前email</Button>
							</span>
						  )}
							/>
						</Table>
					</TabPane>
				</Tabs>

			</div>
		)
	}

	delete(id){
		http('/delete_msg?id='+id, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((data)=> {
			this.componentDidMount()
		}).catch((e)=>alert(e.message));
	}
}
export default UrlList;