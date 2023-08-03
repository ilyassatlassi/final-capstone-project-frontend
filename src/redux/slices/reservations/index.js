import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api';

const initialState = {
  reservations: [],
  ready: false,
  errors: null,
};

const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async (_, thunkAPI) => {
    try {
      let auth = localStorage.getItem('auth');
      auth = JSON.parse(auth);

      const resp = await axios.get(
        `${api.RESERVATIONS_ENDPOINT}`,
        {
          headers: auth,
        },
      );
      if (resp.status === 200) {
        return resp.data;
      }
      return thunkAPI.rejectWithValue(resp.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  },
);

const addReservation = createAsyncThunk(
  'reservations/addReservation',
  async ({
    city,
    time,
    date,
    doctorId,
    userId,
  }, thunkAPI) => {
    try {
      let auth = localStorage.getItem('auth');
      auth = JSON.parse(auth);

      const resp = await axios.post(
        `${api.RESERVATIONS_ENDPOINT}`,
        {
          city,
          time,
          date,
          doctor_id: doctorId,
          user_id: userId,
        },
        {
          headers: auth,
        },
      );
      if (resp.status === 201) {
        return resp.data;
      }
      return thunkAPI.rejectWithValue(resp);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

const deleteReservation = createAsyncThunk(
  'reservations/deleteReservation',
  async ({
    id,
  }, thunkAPI) => {
    try {
      let auth = localStorage.getItem('auth');
      auth = JSON.parse(auth);

      const resp = await axios.delete(
        `${api.RESERVATIONS_ENDPOINT}/${id}`,
        {
          headers: auth,
        },
      );
      if (resp.status === 204) {
        return { success: true, id };
      }
      return { success: false };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchReservations.pending, (state) => ({
      ...state,
      ready: false,
    }));
    builder.addCase(fetchReservations.fulfilled, (state, { payload }) => ({
      ...state,
      reservations: payload,
      errors: null,
      ready: true,
    }));
    builder.addCase(fetchReservations.rejected, (state, { payload }) => ({
      ...state,
      reservations: [],
      errors: payload,
      ready: true,
    }));
    builder.addCase(addReservation.pending, (state) => ({
      ...state,
      ready: false,
    }));
    builder.addCase(addReservation.fulfilled, (state, { payload }) => ({
      ...state,
      reservations: [...state.reservations, payload],
      errors: null,
      ready: true,
    }));
    builder.addCase(addReservation.rejected, (state, { payload }) => ({
      ...state,
      errors: payload,
      ready: true,
    }));
    builder.addCase(deleteReservation.pending, (state) => ({
      ...state,
      ready: false,
    }));
    builder.addCase(deleteReservation.fulfilled, (state, { payload }) => ({
      ...state,
      reservations: state.reservations.filter((reservation) => reservation.id !== payload.id),
      errors: null,
      ready: true,
    }));
    builder.addCase(deleteReservation.rejected, (state, { payload }) => ({
      ...state,
      errors: payload,
      ready: true,
    }));
  },
});

export { fetchReservations, addReservation, deleteReservation };
export default reservationsSlice.reducer;
