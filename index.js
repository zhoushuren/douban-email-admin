import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'
import React from 'react';

import App from './src/App';

import UrlList from './src/view/pc/UrlList';
import EmailList from './src/view/pc/EmailList';
render((
    <Router history={browserHistory}>
        <Route  breadcrumbName="首页" path="/" component={App}>

            <Route path="/url" component={UrlList}/>
            <Route path="/email" component={EmailList}/>
        </Route>

    </Router>
), document.getElementById('root'))