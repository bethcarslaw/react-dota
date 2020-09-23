import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import Grid from 'layout/grid-block/grid-block'
import Card from 'components/card/card'
import FlashCard from 'components/flash-card/flash-card'
import { useHistory } from 'react-router'
import { normalizeAttribute } from 'util/hero'
import { Link } from 'react-router-dom'
import './heroes.scss'
import { trackWindowScroll } from 'react-lazy-load-image-component'
import { HeroStats } from 'interfaces/hero'

interface CardProps {
    flashHeroes: HeroStats[]
    scrollPosition: number
}

const CardsWrapper: FunctionComponent<CardProps> = ({
    flashHeroes,
    scrollPosition,
}) => {
    const history = useHistory()
    return (
        <Grid>
            {flashHeroes.map((hero) => (
                <Card
                    key={hero.id}
                    image={`${process.env.PUBLIC_URL}/images/heroes/backgrounds/thumb/${hero.hero_id}.jpg`}
                    onClick={() => history.push(`/heroes/${hero.hero_id}`)}
                    scrollPosition={scrollPosition}
                >
                    <FlashCard
                        icon={`${process.env.PUBLIC_URL}/images/heroes/icons/${hero.hero_id}.png`}
                        title={hero.localized_name}
                    >
                        <div>
                            <img
                                src={
                                    normalizeAttribute(hero.primary_attr)?.icon
                                }
                                alt={
                                    normalizeAttribute(hero.primary_attr)?.name
                                }
                            />
                            <span>{hero.attack_type}</span>
                        </div>
                    </FlashCard>
                </Card>
            ))}
        </Grid>
    )
}

const Cards = trackWindowScroll(CardsWrapper)

interface Props {
    filter: string | null
}

const Heroes: FunctionComponent<Props> = ({ filter }) => {
    const heroes = useSelector((state: RootState) =>
        state.heroState.heroes.filter((hero) =>
            filter
                ? hero.localized_name
                      .toLocaleLowerCase()
                      .includes(filter.toLocaleLowerCase())
                : hero
        )
    )
    return (
        <div className="react-dota__content rd-heroes-page">
            {filter && (
                <div className="rd-heroes-page__search-results">
                    <h2>
                        {heroes.length} Search result
                        {heroes.length !== 1 ? 's' : ''} for: {filter}
                    </h2>
                    <Link to="/heroes">Clear Search Criteria</Link>
                </div>
            )}
            <Cards flashHeroes={heroes}></Cards>
        </div>
    )
}

export default Heroes
