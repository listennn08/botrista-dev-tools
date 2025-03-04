import { configureStore } from '@reduxjs/toolkit'
import versionReducer from './features/version-slice'

export const store = configureStore({
  reducer: {
    version: versionReducer,
  },
})
