import React, { FunctionComponent } from 'react'
import './box.scss'

interface BoxProps {
    title?: JSX.Element
    className?: string
}

const Box: FunctionComponent<BoxProps> = ({ title, children, className }) => {
    return (
        <div className={`rd-box ${className}`}>
            {title && <div className="rd-box__title">{title}</div>}
            <div className="rd-box__content">{children}</div>
        </div>
    )
}

export default Box
