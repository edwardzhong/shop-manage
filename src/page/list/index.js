import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getContext } from '../../context'
import BasicLayout from '../../layout/basic'
import './style.scss'

const List = ({history}) => {
    const { state, actions } = getContext();

    return <BasicLayout history={history}>
        list
    </BasicLayout>
}

export default List;