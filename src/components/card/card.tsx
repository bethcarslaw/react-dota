import React, { FunctionComponent } from 'react'
import './card.scss'

interface CardProps {
    image: string
    onClick: any
}

const Card: FunctionComponent<CardProps> = ({ image, children, onClick }) => {
    return (
        <div
            className={`rd-card ${!children ? 'rd-card--padded' : ''}`}
            onClick={onClick}
        >
            <div
                className="rd-card__background"
                style={{ backgroundImage: `url(${image})` }}
            ></div>
            {children && <div className="rd-card__content">{children}</div>}
        </div>
    )
}

export default Card
