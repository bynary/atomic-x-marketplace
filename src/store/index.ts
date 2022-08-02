import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import profileReducer from 'store/profile/profileSlice'
import networkReducer from 'store/network/networkSlice'
import { loggingMiddleware } from './middleware'

export const store = configureStore({
  reducer: {
    network: networkReducer,
    profile: profileReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggingMiddleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;