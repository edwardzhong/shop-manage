import React,{ useState } from 'react'
import { Link } from 'react-router-dom'
import { getContext } from '../../context'
import paths from '../../config/menu'
import { Layout, Menu, Icon } from 'antd'
import './style.scss'

const { SubMenu } = Menu;
const { Header, Sider, Footer, Content } = Layout;

const BasicLayout = ({ history, children }) => {
    const { state, actions } = getContext();
    const { menukey } = state;
    const { updateOpenKey, updateSelectKey } = actions;
    const [ collapsed, setCollapse ] = useState(false);

    const toggle =()=>{
        setCollapse(!collapsed);
    };
    const handleClick =({key})=>{
        updateSelectKey({ keys:[ key] });
        history.push(paths[key]);
    }; 
    const handleChange = arr =>{
        updateOpenKey({ keys: arr });
    };

    return <Layout>
        <Sider styleName="side" trigger={null} breakpoint="lg" collapsible collapsed={collapsed} >
            <div styleName="logo" > Manage System </div>
            <Menu styleName="menu" theme="dark" mode="inline" 
                defaultOpenKeys={menukey.open} 
                defaultSelectedKeys={menukey.select} 
                onClick={handleClick} 
                onOpenChange={handleChange}
            >
                <Menu.Item key="1">
                    <Icon type="home" />
                    <span>首页</span>
                </Menu.Item>
                <SubMenu key="2" title={ <span> <Icon type="user" /> <span> 个人信息 </span></span> } >
                    <Menu.Item key="21">基本信息</Menu.Item>
                    <Menu.Item key="22">绑定新店铺</Menu.Item>
                </SubMenu>
                <SubMenu key="3" title={ <span> <Icon type="pay-circle" /> <span> 资金管理 </span></span> } >
                    <Menu.Item key="31">充值金币</Menu.Item>
                    <Menu.Item key="32">充值押金</Menu.Item>
                    <Menu.Item key="33">押金体现</Menu.Item>
                    <Menu.Item key="34">资金记录</Menu.Item>
                </SubMenu>

            </Menu>
        </Sider>
        <Layout>
            <Header styleName="header">
                <Icon styleName="trigger" type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={toggle} />
            </Header>
            <Content styleName="content"> 
                {children} 
            </Content>
            <Footer styleName="footer">
                <div>商家管理后台</div>
            </Footer>
        </Layout>
    </Layout>
}

export default BasicLayout;