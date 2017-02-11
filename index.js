import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'
import React from 'react';

import App from './src/App';
import Login from './src/view/Login';

import UrlList from './src/view/pc/UrlList';
import EmailList from './src/view/pc/EmailList';
render((
    <Router history={browserHistory}>
        <Route  breadcrumbName="首页" path="/" component={App}>
            <Route  breadcrumbName="URL" path="/url" component={UrlList}/>
            <Route  breadcrumbName="Email" path="/email" component={EmailList}/>
        </Route>
        <Route path="/login" component={Login}/>
    </Router>
), document.getElementById('root'))