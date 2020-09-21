import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from 'store'
import { HeroStats } from 'interfaces/hero'
import axios, { AxiosResponse } from 'axios'

interface HeroState {
    heroes: HeroStats[]
    fetchingHeroes: boolean
    filter: string
}

const initialState: HeroState = {
    heroes: [],
    fetchingHeroes: false,
    filter: '',
}

export const heroSlice = createSlice({
    name: 'hero',
    initialState,
    reducers: {
        setHeroes: (state, action: PayloadAction<HeroStats[]>) => {
            state.heroes = action.payload
        },
        setFetchingHeroes: (state, action: PayloadAction<boolean>) => {
            state.fetchingHeroes = action.payload
        },
        setHeroFilter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload
        },
    },
})

export const { setHeroes, setFetchingHeroes, setHeroFilter } = heroSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getHeroStats = (): AppThunk => async (dispatch) => {
    console.log('Getting Hero Stats')
    try {
        dispatch(setFetchingHeroes(true))
        const heroesRes: AxiosResponse<HeroStats[]> = await axios.get(
            'https://api.opendota.com/api/heroStats'
        )
        dispatch(setHeroes(heroesRes.data))
        dispatch(setFetchingHeroes(false))
    } catch (e) {
        console.log(e.message)
    }
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectHeroes = (state: RootState) => state.heroState.heroes
export const selectFetchingHeroes = (state: RootState) =>
    state.heroState.fetchingHeroes
export const filteredHeroes = (state: RootState) =>
    state.heroState.heroes.filter((hero) =>
        hero.localized_name.includes(state.heroState.filter)
    )

export default heroSlice.reducer
