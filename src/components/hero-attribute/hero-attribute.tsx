import React, { FunctionComponent } from 'react'
import { normalizeAttribute } from 'util/hero'
import './hero-attribute.scss'

interface Props {
    type: any
    value: number
    gain: number
    primary: boolean
}

const HeroAttribute: FunctionComponent<Props> = ({
    type,
    value,
    gain,
    primary,
}) => {
    const attribute = normalizeAttribute(type)

    return (
        <div
            className={`rd-hero-attribute ${
                primary ? 'rd-hero-attribute--primary' : ''
            }`}
        >
            <img src={attribute?.icon} alt={attribute?.name} />
            <div className="rd-hero-attribute__content">
                <h4 className="rd-hero-attribute__title">{attribute?.name}</h4>
                <strong>{value}</strong> <span>(+{gain})</span>
            </div>
        </div>
    )
}

export default HeroAttribute
