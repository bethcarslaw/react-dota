import React, { FunctionComponent } from 'react'
import Card from 'components/card/card'
import Grid from 'layout/grid-50-4/grid-50-4'
import FlashCard from 'components/flash-card/flash-card'
import { normalizeAttribute } from 'util/hero'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import _ from 'lodash'
import { useHistory } from 'react-router-dom'

const Home: FunctionComponent = () => {
    const heroes = useSelector((state: RootState) =>
        _.sampleSize(state.heroState.heroes, 5)
    )
    const history = useHistory()

    return (
        <Grid className="react-dota__content">
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

export default Home
