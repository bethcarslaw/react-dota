import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import heroReducer from 'reducers/heroes'
//import counterReducer from 'reducers/counter'
//import reducer from 'reducers'

export const store = configureStore({
    reducer: {
        heroState: heroReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
