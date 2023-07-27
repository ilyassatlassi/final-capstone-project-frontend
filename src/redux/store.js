import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user';
import doctorsReducer from './slices/doctors';
import reservationsReducer from './slices/reservations';

export default configureStore({
  reducer: {
    user: userReducer,
    doctors: doctorsReducer,
    reservations: reservationsReducer,
  },
});
