import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import userReducer from './slices/user';
import doctorsReducer from './slices/doctors';
import reservationsReducer from './slices/reservations';

export default configureStore({
  reducer: {
    user: userReducer,
    doctors: doctorsReducer,
    reservations: reservationsReducer,
  },
  middleware: [thunk, createLogger()],
});
