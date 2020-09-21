import React from 'react'
import './header.scss'

interface Props {
    left?: JSX.Element
    center?: JSX.Element
    right?: JSX.Element
}

const header = (props?: Props) => {
    return (
        <div className="rd-header">
            <div className="rd-header__section rd-header__left">
                {props && props.left}
            </div>
            <div className="rd-header__section rd-header__center">
                {props && props.center}
            </div>
            <div className="rd-header__section rd-header__right">
                {props && props.right}
            </div>
        </div>
    )
}

export default header
