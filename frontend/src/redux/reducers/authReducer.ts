import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types';

const initialState: AuthState = {
   user: null,
   token: null,
   loading: false,
   error: undefined,
   errors: null,
   updated: false,
   successful: false,
   isAuthenticated: sessionStorage.getItem('token') !== null,
};

const { actions, reducer } = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setUser(state, action: PayloadAction<User>) {
         state.user = action.payload;
         state.loading = false;
         state.isAuthenticated = true;
         state.errors = null;
      },
      setUpdated(state) {
         state.updated = true;
      },
      setUserSuccess: (state, {payload}) => {
         state.loading = false;
         state.errors = null;
         state.successful = true;
      },
      userValidationError: (state, {payload}) => {
         state.loading = false;
         state.errors = payload.errors;
         state.successful = false;
      },
      userError: (state, {payload}) => {
         state.loading = false;
         state.error = payload;
         state.successful = false;
      },
      clearValidationError(state) {
         state.errors = null;
         state.successful = false;
      },
      clearUserError(state) {
         state.error = undefined;
         state.successful = false;
      },
      clearUser(state) {
         state.loading = false;
         state.user = null;
         state.token = null;
         state.isAuthenticated = false;
         state.errors = null;
         state.successful = false;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase('@user/SavePreference', (state) => {
            state.loading = true;
            state.error = undefined;
            state.errors = null;
         }).addCase('@user/Login', (state) => {
         state.loading = true;
         state.error = undefined;
         state.errors = null;
      }).addCase('@user/Register', (state) => {
         state.loading = true;
         state.error = undefined;
         state.errors = null;
      }).addCase('@user/PasswordResetRequest', (state) => {
         state.loading = true;
         state.error = undefined;
         state.errors = null;
      });
   },
});

export const { setUser, setUpdated, setUserSuccess, clearUser, userError, clearUserError, userValidationError, clearValidationError } = actions;

export default reducer;
