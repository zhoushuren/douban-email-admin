/**
 * Created by zhoujun on 2017/2/7.
 * email :zhoujun247@gmail.com
 */

import { Table, Button } from 'antd';
const { Column, ColumnGroup } = Table;
import React from 'react';
import http from '../../http';


export class EmailList extends React.Component {
	constructor( props ) {
		super( props );
		this.state = { selectedRowKeys : '',loading:false};
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
	componentDidMount(){
		http('/get_email_list', {
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
								<Button onClick={this.delete.bind(this,record.id)} type="danger">删除</Button>
							</span>
						  )}
					/>
				</Table>
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
export default EmailList;