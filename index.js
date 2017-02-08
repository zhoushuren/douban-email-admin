import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'
import React from 'react';

import App from './src/App';
import Message from './src/view/Message';
import Activity from './src/view/Activity';
import Users from './src/view/Users';
import Logion from './src/view/Login';
render((
    <Router history={browserHistory}>
        <Route  breadcrumbName="首页" path="/" component={App}>
            <Route breadcrumbName="消息" path="/message" component={Message}/>
            <Route breadcrumbName="活动" path="/activity" component={Activity}/>
            <Route path="/user" component={Users}>
            </Route>

        </Route>
        <Route path="/login" component={Logion} />
    </Router>
), document.getElementById('root'))