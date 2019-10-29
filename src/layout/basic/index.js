import React,{ useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { getContext } from '../../context'
import { logoutService, userInfoService, loginService } from '../../service'
import menus from '../../config/page'
import { Layout, Menu, Icon, Avatar, Dropdown } from 'antd'
import './style.scss'

const { SubMenu } = Menu;
const { Header, Sider, Footer, Content } = Layout;

const BasicLayout = ({ children }) => {
    const { state, actions, dispatch } = getContext();
    const {loginInfo,usefInfo} = state;
    const { menukey } = state;
    const { updateOpenKey, updateSelectKey } = actions;
    const [ collapsed, setCollapse ] = useState(false);
    const history = useHistory();
        useEffect(()=>{
            if(!loginInfo.token){
                history.push('/login');
            }
        });
        useEffect(() => {
            userInfoService(dispatch,{id:loginInfo.user_id}).then(ret=>{
               const data = ret.data;
               if(data.error_code !== 0){
                   console.log(data);
               } 
            },err=>{
                console.log(err);
            })
        },[]); 
    const toggle =()=> {
        setCollapse(!collapsed);
    };
    const handleOpen = keys =>{
        updateOpenKey(keys);
    }
    const handleClick =({key})=>{
        updateSelectKey([ key]);
        for(let i of menus){
            if(i.key == key){
                history.push(i.path);
                break;      
            }
        }
    };
    const logout = e =>{
        e.preventDefault();
        logoutService(dispatch);
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <Link to="/info">个人中心</Link>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item>
                <a onClick={logout}>退出登录</a>
            </Menu.Item>
        </Menu>
    );
    return <Layout styleName="layout">
        <Sider styleName="side" trigger={null} breakpoint="lg" collapsible collapsed={collapsed} >
            <div styleName="logo" > Manage System </div>
            <Menu styleName="menu" theme="dark" mode="inline" 
                defaultOpenKeys={menukey.open} 
                defaultSelectedKeys={menukey.select} 
                onOpenChange={handleOpen}
                onClick={handleClick}
            >
                <Menu.Item key="1">
                    <Icon type="home" />
                    <span>首页</span>
                </Menu.Item>
                <SubMenu key="2" title={ <span> <Icon type="user" /> <span> 个人信息 </span></span> } >
                    <Menu.Item key="21">基本信息</Menu.Item>
                    <Menu.Item key="22">绑定新店铺</Menu.Item>
                </SubMenu>
                <SubMenu key="3" title={ <span> <Icon type="carry-out" /> <span> 活动管理 </span></span> } >
                    <Menu.Item key="31">发布活动</Menu.Item>
                    <Menu.Item key="32">活动详情</Menu.Item>
                    <Menu.Item key="33">订单详情</Menu.Item>
                </SubMenu>
                <SubMenu key="4" title={ <span> <Icon type="pay-circle" /> <span> 资金管理 </span></span> } >
                    <Menu.Item key="41">充值金币</Menu.Item>
                    <Menu.Item key="42">充值押金</Menu.Item>
                    <Menu.Item key="43">押金提现</Menu.Item>
                    <Menu.Item key="44">资金记录</Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
        <Layout styleName="layout">
            <Header styleName="header">
                <div styleName="left" onClick={toggle}><Icon styleName="trigger" type={collapsed ? 'menu-unfold' : 'menu-fold'} /></div>
                <Dropdown styleName="right" overlay={menu} placement="bottomRight">
                    <div>
                        <Avatar icon="user" />
                        <span> {loginInfo.username} </span>
                    </div>
                </Dropdown>
            </Header>
            <Content styleName="content"> 
                {children} 
            </Content>
            {/* <Footer styleName="footer">
                商家管理后台
            </Footer> */}
        </Layout>
    </Layout>
}

export default BasicLayout;