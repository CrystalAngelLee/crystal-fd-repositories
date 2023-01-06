import React from 'react'
import { getCurTplConfig } from './configs'

const prefixCls = 'account-configs'

const AccountConfigs = () => {
  return (
    <div className={prefixCls}>
      {getCurTplConfig(20000, 13000).map((tpl) => {
        return (
          <div key={tpl.key} className={`${prefixCls}-line`}>
            <div className={`${prefixCls}-line-title`}>{tpl.name}</div>
            <div className={`${prefixCls}-line-account`}>{tpl.amount}</div>
            <div className={`${prefixCls}-line-child`}>
              {tpl.children?.map((child) => {
                return (
                  <div key={child.key}>
                    <div>{child.name}</div>
                    <div>{child?.location?.name}</div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AccountConfigs
