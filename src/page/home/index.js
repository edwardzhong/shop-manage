import React from 'react'
import { Link } from 'react-router-dom'
import BasicLayout from '../../layout/basic'
import { getContext } from '../../context'
import './style.scss'

const Home = ({ history }) => {
    const { state, actions } = getContext();
    
    return <BasicLayout history={history}>
        <div>home</div>
    </BasicLayout>
}

export default Home;