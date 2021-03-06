/**
 * Created by zhoujun on 2017/2/6.
 * email :zhoujun247@gmail.com
 */
import React from 'react';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import ReactRouter,{ Link} from 'react-router';
const { Header, Content, Footer, Sider } = Layout;
import '../index.css'
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
			<Layout style={{width:"100%" , height:"100%" }}>
				<Sider
					collapsible
					collapsed={this.state.collapsed}
					onCollapse={this.onCollapse}
				>
					<div className="logo"><h1>hong</h1></div>
					<Menu theme="dark" mode="inline" defaultSelectedKeys={['']}>
						
						<Menu.Item key="3">
							<Icon type="bulb" />
							<span className="nav-text">
									email管理
								</span>
							<Link to="/email">

							</Link>
						</Menu.Item>
						<Menu.Item key="4">
							<Icon type="bulb" />
							<span className="nav-text">
									url管理
								</span>
							<Link to="/url">

							</Link>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout style={{width:"100%" , height:"100%" }}>
					<Header style={{ background: '#fff', padding: 0 }} />
					<Content style={{ margin: '0 16px' }}>
						<Breadcrumb {...this.props} style={{ margin: '12px 0' }} router={ReactRouter}>

						</Breadcrumb>
						<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
							{this.props.children}
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>
						Kemeng ©2017
					</Footer>
				</Layout>
			</Layout>
		);
	}
}

export default App;