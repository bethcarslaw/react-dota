import React, { FunctionComponent } from 'react'
import './card.scss'
import { LazyLoadImage } from 'react-lazy-load-image-component'

interface CardProps {
    image: string
    onClick: any
    scrollPosition?: number
}

const Card: FunctionComponent<CardProps> = ({
    image,
    scrollPosition,
    children,
    onClick,
}) => {
    return (
        <div
            className={`rd-card ${!children ? 'rd-card--padded' : ''}`}
            onClick={onClick}
        >
            <div className="rd-card__background">
                <LazyLoadImage
                    src={image}
                    effect="opacity"
                    scrollPosition={scrollPosition}
                ></LazyLoadImage>
            </div>
            {children && <div className="rd-card__content">{children}</div>}
        </div>
    )
}

export default Card
