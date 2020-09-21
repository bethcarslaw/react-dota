import React, { FunctionComponent } from 'react'
import './grid-50-4.scss'

interface GridProps {
    className: string
}

const grid: FunctionComponent<GridProps> = ({ children, className }) => {
    return (
        <div className={`rd-grid-50-4 ${className}`}>
            {React.Children.map(children, (Child) => {
                return <div className="rd-grid-50-4__item">{Child}</div>
            })}
        </div>
    )
}

export default grid
