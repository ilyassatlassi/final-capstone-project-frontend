import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api';

const initialState = {
  user: {},
  signedIn: false,
  error: null,
  loading: false,
};

const register = createAsyncThunk(
  'user/register',
  async ({
    name, nickname, email, password, role, image,
  }, thunkAPI) => {
    try {
      const resp = await axios.post(
        `${api.REGISTRATION_ENDPOINT}`,
        {
          name, nickname, email, password, role, image,
        },
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      if (resp.status === 200) {
        const auth = {
          'access-token': resp.headers['access-token'],
          'token-type': resp.headers['token-type'],
          expiry: resp.headers.expiry,
          uid: resp.headers.uid,
          client: resp.headers.client,
        };

        localStorage.setItem('auth', JSON.stringify(auth));
        return resp.data.data;
      }
      return thunkAPI.rejectWithValue(resp.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  },
);

const login = createAsyncThunk(
  'user/login',
  async ({
    email, password,
  }, thunkAPI) => {
    try {
      const resp = await axios.post(
        `${api.LOGIN_ENDPOINT}`,
        {
          email, password,
        },
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      if (resp.status === 200) {
        const auth = {
          'access-token': resp.headers['access-token'],
          'token-type': resp.headers['token-type'],
          expiry: resp.headers.expiry,
          uid: resp.headers.uid,
          client: resp.headers.client,
        };

        localStorage.setItem('auth', JSON.stringify(auth));
        return resp.data.data;
      }
      return thunkAPI.rejectWithValue(resp.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  },
);

const authenticate = createAsyncThunk(
  'user/autenticate',
  async (_, thunkAPI) => {
    try {
      let auth = localStorage.getItem('auth');
      auth = JSON.parse(auth);

      const resp = await axios.get(
        `${api.CURRENT_USER_ENDPOINT}`,
        {
          headers: auth,
        },
      );
      if (resp.status === 200 || auth) {
        console.log(resp.status, auth);
        return resp.data;
      }
      return thunkAPI.rejectWithValue(resp);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(register.fulfilled, (_, { payload }) => ({
      user: { payload },
      signedIn: true,
      loading: false,
      error: null,
    }));
    builder.addCase(register.rejected, (_, { payload }) => ({
      user: {},
      signedIn: false,
      loading: false,
      error: payload,
    }));
    builder.addCase(login.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(login.fulfilled, (_, { payload }) => ({
      user: payload,
      signedIn: true,
      loading: false,
      error: null,
    }));
    builder.addCase(login.rejected, (_, { payload }) => ({
      user: {},
      signedIn: false,
      loading: false,
      error: payload,
    }));
    builder.addCase(authenticate.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(authenticate.fulfilled, (_, { payload }) => ({
      user: payload,
      signedIn: true,
      loading: false,
      error: null,
    }));
    builder.addCase(authenticate.rejected, (_, { payload }) => ({
      user: {},
      signedIn: false,
      loading: false,
      error: payload,
    }));
  },
});

export {
  register,
  login,
  authenticate,
};

export default userSlice.reducer;
