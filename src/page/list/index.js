import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getContext } from '../../context'
import BasicLayout from '../../layout/basic'
import './style.scss'

const List = ({history}) => {
    const { state, actions } = getContext();
    const { user, list } = state;
    const { removeComment, addComment } = actions;
    const [visible, setVisible] = useState(false);
    const [rid, setRid] = useState('');
    const inputRef = useRef(null);

    const confirmHandle = () => {
        setVisible(false);
        removeComment(rid);
    }

    const cancelHandle = () => {
        setVisible(false);
    }

    const add = () => {
        const input = inputRef.current;
        const val = input.value.trim();
        if (!val) return;
        addComment({
            id: Math.round(Math.random() * 1000000),
            txt: val
        });
        input.value = '';
    }
    return <BasicLayout history={history}>
        list
    </BasicLayout>
}

export default List;