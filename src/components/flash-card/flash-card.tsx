import React, { FunctionComponent } from 'react'
import './flash-card.scss'

interface FlashCardProps {
    icon: string
    title: string
}

const FlashCard: FunctionComponent<FlashCardProps> = ({
    icon,
    title,
    children,
}) => {
    return (
        <div className="rd-flash-card">
            <div
                className="rd-flash-card__icon"
                style={{ backgroundImage: `url(${icon})` }}
            ></div>
            <div className="rd-flash-card__title">
                <h3>{title}</h3>
                {children && <span>{children}</span>}
            </div>
        </div>
    )
}

export default FlashCard
