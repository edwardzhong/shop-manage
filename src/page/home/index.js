import React from 'react'
import { Link } from 'react-router-dom'
import BasicLayout from '../../layout/basic'
import { getContext } from '../../context'
import './style.scss'

const Home = ({ history }) => {
    const { state, actions } = getContext();
    const { user } = state;
    const { updateName, updateEmail } = actions;

    const changeName = (e) => {
        updateName({ name: e.target.value });
    }

    const changeEmail = (e) => {
        updateEmail({ email: e.target.value });
    }
    
    return pug`
    BasicLayout(history=history)    
        div(styleName="form") home    
    `
}

export default Home;