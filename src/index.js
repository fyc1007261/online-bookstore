import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import './index.css';

import Booklist from './booklist/Booklist';
import Home from './home/home';
import Purchase from './purchase/purchase';

import registerServiceWorker from './registerServiceWorker';


let history = createBrowserHistory();

ReactDOM.render((
        <Router history={history}>
            <div>
                <div className={"links1"}>
                    <Link className={"linkText"} to={"/"}>Home</Link>
                </div>
                <div className={"links2"}>
                    <Link className={"linkText"} to={"/booklist"}>Booklist</Link>
                </div>
                <h1>Online Bookstore</h1>

            <Switch>
                <Route exact path={"/"} component={Home}/>
                <Route exact path={"/booklist"} component={Booklist}/>
                <Route exact path={"/purchase"} component={Purchase}/>
            </Switch>
            </div>
        </Router>
    ),
    document.getElementById('root')
);
registerServiceWorker();
