import React,{lazy,Suspense} from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { Provider } from './context'
import '../public/index.css'

// const lazyComponent = path => lazy(()=> import(`./page/${path}`));
// const home = lazyComponent('home')
// const info = lazyComponent('info')
// const bindshop = lazyComponent('bindshop')
// const activity = lazyComponent('activity')
// const order = lazyComponent('order')
// const publish = lazyComponent('publish')
// const login = lazyComponent('login')
// const register = lazyComponent('register')
// const protocal = lazyComponent('protocal')
// const help = lazyComponent('help')
// const getpass = lazyComponent('getpass')

import home from './page/home'
import info from './page/info'
import bindshop from './page/bindshop'
import activity from './page/activity'
import order from './page/order'
import publish from './page/publish'
import login from './page/login'
import register from './page/register'
import protocal from './page/protocal'
import help from './page/help'
import getpass from './page/getpass'
import chargecoin from './page/chargecoin'
import chargecash from './page/chargecash'
import cashout from './page/cashout'
import records from './page/records'


render(
    <Provider>
        <Router>
          {/* <Suspense fallback={<div>Loading...</div>}> */}
            <Switch>
                <Route exact path="/" component={home} /> */}
                <Route exact path="/info" component={info} />
                <Route exact path="/bindshop" component={bindshop} />
                <Route exact path="/activity" component={activity} />
                <Route exact path="/order" component={order} />
                <Route exact path="/publish" component={publish} />
                <Route exact path="/chargecoin" component={chargecoin} />
                <Route exact path="/chargecash" component={chargecash} />
                <Route exact path="/cashout" component={cashout} />
                <Route exact path="/records" component={records} />
                <Route path="/login" component={login} />
                <Route exact path="/register" component={register} />
                <Route exect path="/getpass" component={getpass} />
                <Route exact path="/help" component={help} />
                <Route exact path="/protocal" component={protocal} />
                <Redirect to="/"/>
            </Switch>
            {/* </Suspense> */}
        </Router>
    </Provider>,
    document.getElementById('root')
)