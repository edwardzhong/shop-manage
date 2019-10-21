import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { Provider } from './context'
import Home from './page/home'
import List from './page/list'
import Login from './page/login'
import Register from './page/register'
import Protocal from './page/protocal'
import Help from './page/help'
import GetPass from './page/getpass'
import '../public/index.css'

render(pug`
    Provider
        Router
            Switch
                Route(exact path="/" component=Home)
                Route(exact path="/list" component=List)
                Route(exact path="/login" component=Login)
                Route(exact path="/register" component=Register)
                Route(exact path="/getpass" component=GetPass)
                Route(exact path="/help" component=Help)
                Route(exact path="/protocal" component=Protocal)
                Route(render=() => Redirect(to="/login"))
    `,
    document.getElementById('root')
)