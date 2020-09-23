import React, { FunctionComponent } from 'react'
import './offscreen-menu.scss'

interface Props {
    className?: string
}

const OffscreenMenu: FunctionComponent<Props> = ({ children, className }) => {
    return (
        <div className={`rd-offscreen-menu ${className || ''}`}>
            <div className="rd-offscreen-menu__wrapper">{children}</div>
        </div>
    )
}

export default OffscreenMenu
