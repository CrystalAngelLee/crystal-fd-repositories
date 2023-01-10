import React, {  FC, useCallback, useState } from 'react'
import styled from '@emotion/styled'
import classNames from 'classnames'
import { style } from '../Callapse.styles'
import { CollapseProps, StyledProps } from '../Collapse.types'

const Collapse: FC<CollapseProps> = ({className: prefixCls, header, children}) => {
    const [fold, setFold] = useState(false)
    const onFoldClick = useCallback(
        () => {
            setFold(!fold)
        },
        [fold],
    )
    const pannelCls = classNames(`${prefixCls}-panel`, {
        'active': !fold
    })
    return (
        <section className={prefixCls}>
            <nav className={`${prefixCls}-header`} onClick={onFoldClick}>{header}</nav>
            <div className={pannelCls}>
                {children}
            </div>
        </section>
    )
}

export default styled(Collapse)<StyledProps>`
${style}
`
