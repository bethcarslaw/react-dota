import React, { FunctionComponent } from 'react'
import './box.scss'

interface BoxProps {
    title?: JSX.Element
}

const Box: FunctionComponent<BoxProps> = ({ title, children }) => {
    return (
        <div className="rd-box">
            {title && <div className="rd-box__title">{title}</div>}
            <div className="rd-box__content">{children}</div>
        </div>
    )
}

export default Box
