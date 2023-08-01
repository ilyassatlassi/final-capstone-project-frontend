import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/user';
import doctorsReducer from './slices/doctors';
import reservationsReducer from './slices/reservations';

const persistConfig = {
  key: 'user',
  storage,
};

export const store = configureStore({
  reducer: {
    user: persistReducer(persistConfig, userReducer),
    doctors: doctorsReducer,
    reservations: reservationsReducer,
  },
  middleware: [thunk, createLogger()],
});

export const persistor = persistStore(store);
