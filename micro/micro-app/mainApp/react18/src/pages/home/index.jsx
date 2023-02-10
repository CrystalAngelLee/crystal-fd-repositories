import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import microApp from '@micro-zoe/micro-app'
import { themeStyle, siderStyle } from './constance'

const prefixCls = 'main-react-home'
const { Content, Sider } = Layout

function getItem(label, key, children, type) {
  return {
    key,
    children,
    label,
    type,
  }
}

const MenuItems = [
  getItem('Vue3', '/vue3/'),
  getItem('React18', '/react18/'),
  getItem('Vue3Child', 'vue3_base', [
    getItem('about', '/vue3/about'),
    getItem('detail', '/vue3/detail'),
  ]),
  getItem('React18', 'react18_base', [
    getItem('about', '/react18/about'),
    getItem('detail11', '/react18/detail/11'),
    getItem('detail33', '/react18/detail/33'),
  ]),
]

function App() {
  const navigate = useNavigate()
  const [selectedKeys, setSelectedKeys] = useState([])

  useEffect(() => {
    function dataListener(data) {
      setSelectedKeys([`/react18${data.path}`])
    }
    function vue3Linstener(data) {
      setSelectedKeys([`/vue3${data.path}`])
    }

    microApp.addDataListener('react18', dataListener)
    microApp.addDataListener('vue3', vue3Linstener)

    return () => {
      // 解绑监听my-app子应用的函数
      microApp.removeDataListener('react18', dataListener)
      microApp.removeDataListener('vue3', vue3Linstener)
      // 清空所有监听appName子应用的函数
      microApp.clearDataListener('react18')
      microApp.clearDataListener('vue3')
    }
  }, [])

  const _onMenuClick = (e) => {
    navigate(e.key)
  }

  const _onMenuSelect = ({ key }) => {
    setSelectedKeys([key])
  }

  return (
    <div>
      <Layout hasSider>
        <Sider style={siderStyle}>
          <div className={`${prefixCls}-theme`} style={themeStyle}>
            <Link to="/" style={{ color: '#fff' }}>
              Demo
            </Link>
          </div>
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['/']}
            items={MenuItems}
            onClick={_onMenuClick}
            selectedKeys={selectedKeys}
            onSelect={_onMenuSelect}
          />
        </Sider>
        <Layout
          className="site-layout"
          style={{
            marginLeft: 200,
          }}
        >
          <Content
            style={{
              margin: '24px 16px 0',
              overflow: 'initial',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default App
