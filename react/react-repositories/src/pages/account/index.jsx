import React from 'react'
import { Link, Outlet, redirect } from 'react-router-dom'
import './index.scss'
import { useEffect } from 'react'

const prefixCls = 'account'

const Account = () => {
  useEffect(() => {
    redirect('/mine')
  }, [])
  return (
    <div className={prefixCls}>
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
