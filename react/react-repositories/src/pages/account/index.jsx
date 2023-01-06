import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import AccountConfigs from './components/AccountConfigs'
import './index.scss'

const prefixCls = 'account'

const Account = () => {
  return (
    <div className={prefixCls}>
      {/* <div>展示当前账本配置信息</div>
      <div>
        <AccountConfigs />
      </div>
      <div>展示当前月份资产配置信息</div>
      <div>当前消费统计</div>
      <div>展示当前资产统计</div> */}
      <div className={`${prefixCls}-container`}>
        <Outlet />
      </div>
      <div className={`${prefixCls}-navbar`}>
        <div className={`${prefixCls}-navbar-item`}>账单</div>
        <div className={`${prefixCls}-navbar-item`}>报表</div>
        <div className={`${prefixCls}-navbar-item`}>
          <Link to={'/mine'}>我的</Link>
        </div>
      </div>
    </div>
  )
}

export default Account
