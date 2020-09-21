import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { RootState } from 'store'
import './hero.scss'
import { hero_lore } from 'dotaconstants'
import Box from 'components/box/box'
import FlashCard from 'components/flash-card/flash-card'
import { normalizeAttribute } from 'util/hero'

interface RouteParams {
    id: string
}

const Hero = () => {
    const { id } = useParams<RouteParams>()
    const hero = useSelector((state: RootState) =>
        state.heroState.heroes.find((hero) => hero.hero_id === parseInt(id))
    )
    const history = useHistory()
    const lore = hero ? hero_lore[hero.name.replace('npc_dota_hero_', '')] : ''

    return (
        <div className="rd-hero-page">
            <div
                className="rd-hero-page__background"
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/images/heroes/backgrounds/${hero?.hero_id}.jpg)`,
                }}
            ></div>
            {hero && (
                <div className="rd-hero-page__content">
                    <Box
                        title={
                            <FlashCard
                                icon={`${process.env.PUBLIC_URL}/images/heroes/icons/${hero.hero_id}.png`}
                                title={hero.localized_name}
                            >
                                <img
                                    src={
                                        normalizeAttribute(hero.primary_attr)
                                            ?.icon
                                    }
                                    alt={
                                        normalizeAttribute(hero.primary_attr)
                                            ?.name
                                    }
                                />
                            </FlashCard>
                        }
                    >
                        <p>
                            {hero.roles.map((role) => (
                                <strong>{role} </strong>
                            ))}
                        </p>
                        <h3>Lore</h3>
                        <p>{lore}</p>
                        <button onClick={() => history.goBack()}>
                            Go back
                        </button>
                    </Box>
                </div>
            )}
        </div>
    )
}

export default Hero
