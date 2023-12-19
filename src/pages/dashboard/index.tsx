import React, { useState, useEffect } from 'react'
import {
  ExpandOutlined,
  MessageOutlined,
  BulbOutlined
} from '@ant-design/icons'
import { Layout, Breadcrumb } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import './index.less'

const { Sider } = Layout
const routes = [
  { key: 'flight', name: '航班管理' },
  { key: 'hotel', name: '酒店管理' },
  { key: 'bus', name: '巴士管理' },
  { key: 'user', name: '用户管理' },
  { key: 'reverse', name: '预约管理' }
]

const DashBoard: React.FC = () => {
  const [Bread, setBread] = useState<string>('航班管理')

  const navigate = useNavigate()
  const handleLInk = (item: { key: string; name: string }): void => {
    const { key, name } = item
    setBread(name)
    navigate('/home/' + key, { replace: true })
  }

  useEffect(() => {
    const url = new URL(location.href)
    const pathname = url.pathname // 获取 pathname 属性
    const routename = pathname.split('/').pop() // 获取最后一个 / 分隔的字符串
    routes.forEach((route) => {
      if (route.key === routename) {
        setBread(route.name)
      }
    })
  }, [location.href])

  return (
    <div className="home">
      <Layout>
        <Sider
          trigger={null}
          collapsible
          style={{ height: '100vh', backgroundColor: 'white' }}
        >
          <div className="demo-logo-vertical" />
          <div className="slide">
            <div className="slide-title">
              <img src="/public/metting.png" alt="" style={{ width: '22px' }} />
              <span>旅行预订系统</span>
            </div>
            <div className="img"></div>
            <ul>
              {routes.map((item) => (
                <li
                  key={item.key}
                  onClick={() => {
                    handleLInk(item)
                  }}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </Sider>
        <Layout>
          <div className="header">
            <Breadcrumb
              items={[
                {
                  title: '旅行预订系统'
                },
                {
                  title: Bread
                }
              ]}
              style={{ fontSize: '18px', cursor: 'pointer' }}
            />
            <div className="right">
              <ExpandOutlined />
              <MessageOutlined className="message" />
              <BulbOutlined className="idea" />
            </div>
          </div>
          <div className="main">
            <Outlet />
          </div>
        </Layout>
      </Layout>
    </div>
  )
}

export default DashBoard
