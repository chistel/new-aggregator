// @ts-nocheck
/* eslint-disable */
import {configureStore} from '@reduxjs/toolkit';
import reducer from "./reducers";
import {thunk} from 'redux-thunk';
import {createLogger} from 'redux-logger';

const isDev = import.meta.env.MODE === 'development';

const logger = createLogger({
   collapsed: (getState, action, logEntry) => !logEntry.error,
   diff: true,
});

const middlewares: unknown[] = [thunk];

if (isDev) {
   middlewares.push(logger);
}
const store = configureStore({
   reducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         thunk: false, // Disable thunk since you are using epics
         serializableCheck: false, // Optional: adjust based on your needs
      }).concat(middlewares),
   devTools: isDev,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
