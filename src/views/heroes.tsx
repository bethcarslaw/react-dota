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
interface Props {
    filter: string | null
}

const Heroes: FunctionComponent<Props> = ({ filter }) => {
    const heroes = useSelector((state: RootState) =>
        state.heroState.heroes.filter((hero) =>
            filter
                ? hero.localized_name.toLocaleLowerCase().includes(filter)
                : hero
        )
    )
    const history = useHistory()
    return (
        <div className="react-dota__content rd-heroes-page">
            {filter && (
                <div className="rd-heroes-page__search-results">
                    <h2>
                        {heroes.length} Search Results for: {filter}
                    </h2>
                    <Link to="/heroes">Clear Search Criteria</Link>
                </div>
            )}
            <Grid>
                {heroes.map((hero) => (
                    <Card
                        key={hero.id}
                        image={`${process.env.PUBLIC_URL}/images/heroes/backgrounds/${hero.hero_id}.jpg`}
                        onClick={() => history.push(`/heroes/${hero.hero_id}`)}
                    >
                        <FlashCard
                            icon={`${process.env.PUBLIC_URL}/images/heroes/icons/${hero.hero_id}.png`}
                            title={hero.localized_name}
                        >
                            <img
                                src={
                                    normalizeAttribute(hero.primary_attr)?.icon
                                }
                                alt={
                                    normalizeAttribute(hero.primary_attr)?.name
                                }
                            />
                        </FlashCard>
                    </Card>
                ))}
            </Grid>
        </div>
    )
}

export default Heroes
