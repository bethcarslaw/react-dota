import React, { FunctionComponent } from 'react'
import './chip.scss'

interface ChipProps {
    color?: string
    backgroundColor?: string
}

const Chip: FunctionComponent<ChipProps> = ({
    color,
    backgroundColor,
    children,
}) => {
    return (
        <span
            className="rd-chip"
            style={{ backgroundColor: backgroundColor, color: color }}
        >
            {children}
        </span>
    )
}

export default Chip
