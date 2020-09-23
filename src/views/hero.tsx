import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { RootState } from 'store'
import './hero.scss'
import { hero_lore } from 'dotaconstants'
import Box from 'components/box/box'
import FlashCard from 'components/flash-card/flash-card'
import { normalizeAttribute } from 'util/hero'
import {
    RadialChart,
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalBarSeries,
    makeWidthFlexible,
} from 'react-vis'
import TextTruncate from 'components/text-truncate/text-truncate'
import HeroAttribute from 'components/hero-attribute/hero-attribute'
import axios, { AxiosResponse } from 'axios'
import { HeroStats } from 'interfaces/hero'
import HeroLink from 'components/hero-link/hero-link'
import Loader from 'components/loader/loader'
import { LazyLoadImage } from 'react-lazy-load-image-component'

interface RouteParams {
    id: string
}

const FlexGraph = makeWidthFlexible(XYPlot)

const Hero = () => {
    const { id } = useParams<RouteParams>()
    const hero = useSelector((state: RootState) =>
        state.heroState.heroes.find((hero) => hero.hero_id === parseInt(id))
    )
    const [matchups, setMatchups] = useState<
        {
            hero_id: number
            wins: number
            games_played: number
        }[]
    >([])
    const lore = hero ? hero_lore[hero.name.replace('npc_dota_hero_', '')] : ''
    const totalGames = hero
        ? hero['1_pick'] +
          hero['2_pick'] +
          hero['3_pick'] +
          hero['4_pick'] +
          hero['5_pick'] +
          hero['6_pick'] +
          hero['7_pick'] +
          hero['8_pick']
        : 0
    const totalWins = hero
        ? hero['1_win'] +
          hero['2_win'] +
          hero['3_win'] +
          hero['4_win'] +
          hero['5_win'] +
          hero['6_win'] +
          hero['7_win'] +
          hero['8_win']
        : 0
    const totalLoss = totalGames - totalWins
    const calcWr = (wins: number, total: number) => (wins / total) * 100
    const winrate = calcWr(totalWins, totalGames).toFixed(2)
    const lossrate = calcWr(totalLoss, totalGames).toFixed(2)
    const sortedMatchups = matchups.sort(
        (a, b) =>
            calcWr(a.wins, a.games_played) - calcWr(b.wins, b.games_played)
    )
    const topMatchups = sortedMatchups.slice(0, 4)
    const worstMatchups = sortedMatchups.reverse().slice(0, 4)

    useEffect(() => {
        const fetchMatchups = async (hero: HeroStats) => {
            try {
                const res: AxiosResponse<any> = await axios.get(
                    `https://api.opendota.com/api/heroes/${hero.hero_id}/matchups`
                )

                setMatchups(res.data)
            } catch (e) {
                console.log(e.message)
            }
        }

        if (hero) {
            fetchMatchups(hero)
        }

        return function cleanup() {
            setMatchups([])
        }
    }, [hero])

    return (
        <div className="rd-hero-page">
            <div className="rd-hero-page__background">
                <LazyLoadImage
                    effect="opacity"
                    src={`${process.env.PUBLIC_URL}/images/heroes/backgrounds/${hero?.hero_id}.jpg`}
                ></LazyLoadImage>
            </div>
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
                                className="rd-margin--bottom"
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
                                <TextTruncate truncateAfter={280} text={lore} />
                            </Box>
                            <Box
                                className="rd-margin--bottom"
                                title={<h3>Primary Attribute Breakdown</h3>}
                            >
                                <div className="row">
                                    <div className="col-xs-4">
                                        <HeroAttribute
                                            type={'agi'}
                                            value={hero.base_agi}
                                            gain={hero.agi_gain}
                                            primary={
                                                hero.primary_attr === 'agi'
                                            }
                                        ></HeroAttribute>
                                    </div>
                                    <div className="col-xs-4">
                                        <HeroAttribute
                                            type={'str'}
                                            value={hero.base_str}
                                            gain={hero.str_gain}
                                            primary={
                                                hero.primary_attr === 'str'
                                            }
                                        ></HeroAttribute>
                                    </div>
                                    <div className="col-xs-4">
                                        <HeroAttribute
                                            type={'int'}
                                            value={hero.base_int}
                                            gain={hero.int_gain}
                                            primary={
                                                hero.primary_attr === 'int'
                                            }
                                        ></HeroAttribute>
                                    </div>
                                </div>
                            </Box>
                            <Box
                                className="rd-margin--bottom position--relative"
                                title={<h3>Best Versus</h3>}
                            >
                                <div className="row">
                                    {topMatchups.map((hero) => (
                                        <div
                                            className="col-xs-6 col-md-3"
                                            key={hero.hero_id}
                                        >
                                            <HeroLink
                                                id={hero.hero_id}
                                            ></HeroLink>
                                        </div>
                                    ))}

                                    {topMatchups.length < 1 && (
                                        <Loader></Loader>
                                    )}
                                </div>
                            </Box>
                            <Box
                                className="position--relative"
                                title={<h3>Worst Versus</h3>}
                            >
                                <div className="row">
                                    {worstMatchups.map((hero) => (
                                        <div
                                            className="col-xs-6 col-md-3"
                                            key={hero.hero_id}
                                        >
                                            <HeroLink
                                                id={hero.hero_id}
                                            ></HeroLink>
                                        </div>
                                    ))}

                                    {worstMatchups.length < 1 && (
                                        <Loader></Loader>
                                    )}
                                </div>
                            </Box>
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-8">
                            <div className="row">
                                <div className="col-xs-12 col-md-12 col-lg-6">
                                    <Box title={<h3>Hero Attributes</h3>}>
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
                                            <div className="col-xs-6 col-md-4">
                                                <h4>
                                                    Attack Range (
                                                    {hero.attack_type})
                                                </h4>
                                                {hero.attack_range}
                                            </div>
                                            <div className="col-xs-6 col-md-4">
                                                <h4>Projectile Speed</h4>
                                                {hero.projectile_speed}
                                            </div>
                                            <div className="col-xs-6 col-md-4">
                                                <h4>Attack Rate</h4>
                                                {hero.attack_rate}
                                            </div>
                                            <div className="col-xs-6 col-md-4">
                                                <h4>Movement Speed</h4>
                                                {hero.move_speed}
                                            </div>
                                            <div className="col-xs-6 col-md-4">
                                                <h4>Turn Rate</h4>
                                                {hero.turn_rate}
                                            </div>
                                            <div className="col-xs-6 col-md-4">
                                                <h4>Captains Mode Enabled</h4>
                                                {hero.cm_enabled ? 'Yes' : 'No'}
                                            </div>
                                        </div>
                                    </Box>
                                </div>
                                <div className="col-xs-12 col-md-12 col-lg-6">
                                    <Box
                                        title={<h3>Winrate {winrate}&#37;</h3>}
                                        className="text-align--center"
                                    >
                                        <RadialChart
                                            className="rd-pie-chart rd-margin-auto"
                                            data={[
                                                {
                                                    angle: totalLoss,
                                                    label: `Loss (${lossrate}%)`,
                                                    className:
                                                        'rd-pie-chart__slice',
                                                },
                                                {
                                                    angle: totalWins,
                                                    label: `Win (${winrate}%)`,
                                                    className:
                                                        'rd-pie-chart__slice',
                                                },
                                            ]}
                                            width={250}
                                            height={250}
                                            showLabels={true}
                                            labelsStyle={{
                                                fill: 'white',
                                            }}
                                        />
                                        {totalWins.toLocaleString()} wins out of{' '}
                                        {totalGames.toLocaleString()} public
                                        matches
                                    </Box>
                                </div>
                                <div className="col-xs-12">
                                    <Box title={<h3>Win Rate by Rank</h3>}>
                                        <FlexGraph
                                            margin={{ bottom: 70 }}
                                            xType="ordinal"
                                            height={400}
                                            yDomain={[40, 60]}
                                        >
                                            <HorizontalGridLines />
                                            <XAxis tickLabelAngle={-45} />
                                            <YAxis />
                                            <VerticalBarSeries
                                                data={[
                                                    {
                                                        x: 'Herald',
                                                        y: calcWr(
                                                            hero['1_win'],
                                                            hero['1_pick']
                                                        ),
                                                    },
                                                    {
                                                        x: 'Guardian',
                                                        y: calcWr(
                                                            hero['2_win'],
                                                            hero['2_pick']
                                                        ),
                                                    },
                                                    {
                                                        x: 'Crusader',
                                                        y: calcWr(
                                                            hero['3_win'],
                                                            hero['3_pick']
                                                        ),
                                                    },
                                                    {
                                                        x: 'Archon',
                                                        y: calcWr(
                                                            hero['4_win'],
                                                            hero['4_pick']
                                                        ),
                                                    },
                                                    {
                                                        x: 'Legend',
                                                        y: calcWr(
                                                            hero['5_win'],
                                                            hero['5_pick']
                                                        ),
                                                    },
                                                    {
                                                        x: 'Ancient',
                                                        y: calcWr(
                                                            hero['6_win'],
                                                            hero['6_pick']
                                                        ),
                                                    },
                                                    {
                                                        x: 'Divine',
                                                        y: calcWr(
                                                            hero['7_win'],
                                                            hero['7_pick']
                                                        ),
                                                    },
                                                    {
                                                        x: 'Immortal',
                                                        y: calcWr(
                                                            hero['8_win'],
                                                            hero['8_pick']
                                                        ),
                                                    },
                                                ]}
                                            />
                                        </FlexGraph>
                                    </Box>
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
