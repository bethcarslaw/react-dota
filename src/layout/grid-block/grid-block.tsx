import React, { FunctionComponent } from 'react'
import './grid-block.scss'

interface GridProps {
    className?: string
}

const grid: FunctionComponent<GridProps> = ({ children, className }) => {
    return (
        <div className={`rd-grid-block ${className}`}>
            {React.Children.map(children, (Child) => {
                return <div className="rd-grid-block__item">{Child}</div>
            })}
        </div>
    )
}

export default grid
