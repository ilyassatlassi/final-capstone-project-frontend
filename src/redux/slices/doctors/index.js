import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api';

const initialState = {
  doctors: [],
  Doctor: {},
  ready: false,
  errors: null,
};
const fetchDoctors = createAsyncThunk(
  'doctors/fetchDoctors',
  async (_, thunkAPI) => {
    try {
      let auth = localStorage.getItem('auth');
      auth = JSON.parse(auth);

      const resp = await axios.get(
        `${api.DOCTORS_ENDPOINT}`,
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

const fetchDoctor = createAsyncThunk(
  'doctors/fetchDoctor',
  async ({
    id,
  }, thunkAPI) => {
    try {
      let auth = localStorage.getItem('auth');
      auth = JSON.parse(auth);

      const resp = await axios.get(
        `${api.DOCTORS_ENDPOINT}/${id}`,
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

const addDoctor = createAsyncThunk(
  'doctors/addDoctor',
  async ({
    image,
    name,
    specialization,
    consultationFee,
    hospital,
    availability,
    description,
    facebook,
    twitter,
    instagram,
  }, thunkAPI) => {
    try {
      let auth = localStorage.getItem('auth');
      auth = JSON.parse(auth);

      const resp = await axios.post(
        `${api.DOCTORS_ENDPOINT}`,
        {
          name,
          image,
          specialization,
          consultation_fee: consultationFee,
          hospital,
          availability,
          description,
          facebook,
          twitter,
          instagram,
        },
        {
          headers: auth,
        },
      );
      if (resp.status === 201) {
        return resp.data.data;
      }
      return thunkAPI.rejectWithValue(resp.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

const deleteDoctor = createAsyncThunk(
  'doctors/deleteDoctor',
  async ({
    id,
  }, thunkAPI) => {
    try {
      let auth = localStorage.getItem('auth');
      auth = JSON.parse(auth);

      const resp = await axios.delete(
        `${api.DOCTORS_ENDPOINT}/${id}`,
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

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDoctors.pending, (state) => ({
      ...state,
      ready: false,
    }));
    builder.addCase(fetchDoctors.fulfilled, (state, { payload }) => ({
      ...state,
      doctors: payload,
      errors: null,
      ready: true,
    }));
    builder.addCase(fetchDoctors.rejected, (state, { payload }) => ({
      ...state,
      Doctors: [],
      errors: payload,
      ready: true,
    }));
    builder.addCase(fetchDoctor.pending, (state) => ({
      ...state,
      ready: false,
    }));
    builder.addCase(fetchDoctor.fulfilled, (state, { payload }) => ({
      ...state,
      Doctor: payload,
      errors: null,
      ready: true,
    }));
    builder.addCase(fetchDoctor.rejected, (state, { payload }) => ({
      ...state,
      Doctor: {},
      errors: payload,
      ready: true,
    }));
    builder.addCase(addDoctor.pending, (state) => ({
      ...state,
      ready: false,
    }));
    builder.addCase(addDoctor.fulfilled, (state, { payload }) => ({
      ...state,
      doctors: [...state.doctors, payload],
      errors: null,
      ready: true,
    }));
    builder.addCase(addDoctor.rejected, (state, { payload }) => ({
      ...state,
      errors: payload,
      ready: true,
    }));
    builder.addCase(deleteDoctor.pending, (state) => ({
      ...state,
      ready: false,
    }));
    builder.addCase(deleteDoctor.fulfilled, (state, { payload }) => ({
      ...state,
      doctors: state.doctors.filter((doctor) => doctor.id !== payload.id),
      errors: null,
      ready: true,
    }));
    builder.addCase(deleteDoctor.rejected, (state, { payload }) => ({
      ...state,
      errors: payload,
      ready: true,
    }));
  },
});

export {
  fetchDoctors, addDoctor, deleteDoctor, fetchDoctor,
};
export default doctorsSlice.reducer;
