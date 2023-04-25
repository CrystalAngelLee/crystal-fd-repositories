import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { SideBar } from './config'
import './index.scss'

const { Header, Content, Sider } = Layout
const prefixCls = 'react-main'

const Main = () => {
  const navigate = useNavigate()
  const onMenuClick = ({ key }) => {
    navigate(key)
  }
  return (
    <Layout className={prefixCls}>
      <Header className={`${prefixCls}-header`}>
        <h1>Crystal の React Demo</h1>
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            theme="dark"
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={SideBar}
            onClick={onMenuClick}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              overflow: 'auto',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Main
