import React, { FunctionComponent } from 'react'
import './header.scss'

interface Props {
    left?: JSX.Element
    center?: JSX.Element
    right?: JSX.Element
    className?: string
}

const header: FunctionComponent<Props> = ({
    left,
    center,
    right,
    className,
}) => {
    return (
        <div className={`rd-header ${className || ''}`}>
            <div className="rd-header__section rd-header__left">{left}</div>
            <div className="rd-header__section rd-header__center">{center}</div>
            <div className="rd-header__section rd-header__right">{right}</div>
        </div>
    )
}

export default header
