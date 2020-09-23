import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { RootState } from 'store'
import './hero-link.scss'

interface Props {
    id: number
}

const HeroLink: FunctionComponent<Props> = ({ id }) => {
    const hero = useSelector((state: RootState) =>
        state.heroState.heroes.find((hero) => hero.hero_id === id)
    )
    const history = useHistory()

    return (
        <div className="rd-hero-link">
            {hero && (
                <div onClick={() => history.push(`/heroes/${hero.hero_id}`)}>
                    <div className="rd-hero-link__image">
                        <img
                            src={`${process.env.PUBLIC_URL}/images/heroes/icons/${hero?.hero_id}.png`}
                            alt={hero.localized_name}
                        />
                    </div>
                    <div className="rd-hero-link__text">
                        {hero?.localized_name}
                    </div>
                </div>
            )}
        </div>
    )
}

export default HeroLink
