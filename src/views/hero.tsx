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
                    <div className="row">
                        <div className="col-xs-12 col-md-6 col-lg-4">
                            <Box
                                title={
                                    <FlashCard
                                        icon={`${process.env.PUBLIC_URL}/images/heroes/icons/${hero.hero_id}.png`}
                                        title={hero.localized_name}
                                    >
                                        <div>
                                            <img
                                                src={
                                                    normalizeAttribute(
                                                        hero.primary_attr
                                                    )?.icon
                                                }
                                                alt={
                                                    normalizeAttribute(
                                                        hero.primary_attr
                                                    )?.name
                                                }
                                            />
                                            <span>{hero.attack_type}</span>
                                        </div>
                                    </FlashCard>
                                }
                            >
                                <h3>Roles</h3>
                                <ul className="rd-list">
                                    {hero.roles.map((role) => (
                                        <li
                                            key={role}
                                            className="rd-list__item"
                                        >
                                            {role}
                                        </li>
                                    ))}
                                </ul>
                                <h3>Lore</h3>
                                <p>{lore}</p>
                                <button onClick={() => history.goBack()}>
                                    Go back
                                </button>
                            </Box>
                        </div>
                        <div className="col-xs">
                            <div className="row">
                                <div className="col-xs-12 col-md-6">
                                    <Box title={<h2>Hero Attributes</h2>}>
                                        <div className="row">
                                            <div className="col-xs-6 col-md-4">
                                                <h4>Base Health</h4>
                                                {hero.base_health}
                                            </div>
                                            <div className="col-xs-6 col-md-4">
                                                <h4>Base Health Regen</h4>
                                                {hero.base_health_regen || 0}
                                            </div>
                                            <div className="col-xs-6 col-md-4">
                                                <h4>Base Mana</h4>
                                                {hero.base_mana}
                                            </div>
                                            <div className="col-xs-6 col-md-4">
                                                <h4>Base Mana Regen</h4>
                                                {hero.base_mana_regen}
                                            </div>
                                            <div className="col-xs-6 col-md-4">
                                                <h4>Base Armour</h4>
                                                {hero.base_armour || 0}
                                            </div>
                                            <div className="col-xs-6 col-md-4">
                                                <h4>Magic Resistance</h4>
                                                {hero.base_mr}
                                            </div>
                                        </div>
                                    </Box>
                                </div>
                                <div className="col-xs-12 col-md-6">
                                    <Box
                                        title={<h2>Pick Distribution</h2>}
                                    ></Box>
                                </div>
                                <div className="col-xs-12">
                                    <Box
                                        title={<h2>Win Rate by Rank</h2>}
                                    ></Box>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Hero
