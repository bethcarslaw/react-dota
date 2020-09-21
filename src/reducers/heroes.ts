import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from 'store'
import { HeroStats } from 'interfaces/hero'
import axios, { AxiosResponse } from 'axios'

interface HeroState {
    heroes: HeroStats[]
    fetchingHeroes: boolean
}

const initialState: HeroState = {
    heroes: [],
    fetchingHeroes: false,
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
    },
})

export const { setHeroes, setFetchingHeroes } = heroSlice.actions

// Async Actions

export const getHeroStats = (): AppThunk => async (dispatch) => {
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

// Selectors
export const selectHeroes = (state: RootState) => state.heroState.heroes
export const selectFetchingHeroes = (state: RootState) =>
    state.heroState.fetchingHeroes

export default heroSlice.reducer
