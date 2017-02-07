/**
 * Created by zhoujun on 2017/2/6.
 * email :zhoujun247@gmail.com
 */
import React from 'react';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import ReactRouter,{ Link} from 'react-router';
const { Header, Content, Footer, Sider } = Layout;

export class App extends React.Component {

	constructor( props ) {
		super( props );
		this.state = { collapsed : false};
	}
	onCollapse (collapsed) {
		console.log(collapsed);
		this.setState({ collapsed });
	}
	componentDidMount(){

	}
	render() {
		return (
			<Layout>
				<Sider
					collapsible
					collapsed={this.state.collapsed}
					onCollapse={this.onCollapse}
				>
					<div className="logo"><h1>可萌</h1></div>
					<Menu theme="dark" mode="inline" defaultSelectedKeys={['']}>
						<Menu.Item key="1">
							<Icon type="user" />
								<Link className="nav-text" to="/user">用户</Link>

						</Menu.Item>
						<Menu.Item key="2">
							<Icon type="message" />
							<span className="nav-text">
									消息系统
								</span>
							<Link to="/message">

							</Link>
						</Menu.Item>
						<Menu.Item key="3">
							<Icon type="bulb" />
							<span className="nav-text">
									活动管理
								</span>
							<Link to="/activity">

							</Link>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout>
					<Header style={{ background: '#fff', padding: 0 }} />
					<Content style={{ margin: '0 16px' }}>
						<Breadcrumb {...this.props} style={{ margin: '12px 0' }} router={ReactRouter}>

						</Breadcrumb>
						<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
							{this.props.children}
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>
						Kemeng ©2016
					</Footer>
				</Layout>
			</Layout>
		);
	}
}

export default App;