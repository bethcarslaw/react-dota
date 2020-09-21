import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { RootState } from 'store'
import './hero.scss'
interface RouteParams {
    id: string
}

const Hero = () => {
    const { id } = useParams<RouteParams>()
    const hero = useSelector((state: RootState) =>
        state.heroState.heroes.find((hero) => hero.hero_id === parseInt(id))
    )
    const history = useHistory()

    return (
        <div className="react-dota__content rd-hero-page">
            <div
                className="rd-hero-page__background"
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/images/heroes/backgrounds/${hero?.hero_id}.jpg)`,
                }}
            ></div>
            <div className="rd-hero-page__content">
                <h1>{hero?.localized_name}</h1>
                <button onClick={() => history.goBack()}>Go back</button>
            </div>
        </div>
    )
}

export default Hero
