import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { Provider } from './context'
import Home from './page/home'
import Login from './page/login'
import Register from './page/register'
import Protocal from './page/protocal'
import Help from './page/help'
import GetPass from './page/getpass'
import '../public/index.css'

render(
    <Provider>
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/getpass" component={GetPass} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/help" component={Help} />
                <Route exact path="/protocal" component={Protocal} />
                <Redirect to="/"/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
)