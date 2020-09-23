import React, { FunctionComponent } from 'react'
import './burger.scss'

interface Props {
    onClick?: Function
    active: boolean
}

const Burger: FunctionComponent<Props> = ({ onClick, active }) => {
    const handleClick = () => {
        return onClick ? onClick() : false
    }

    return (
        <div
            className={`rd-burger ${active ? 'rd-burger--active' : ''}`}
            onClick={handleClick}
        >
            <span></span>
        </div>
    )
}

export default Burger
