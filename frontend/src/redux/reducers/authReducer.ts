import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types';

const initialState: AuthState = {
   user: null,
   token: null,
   loading: false,
   error: undefined,
   errors: null,
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
      userValidationError: (state, {payload}) => {
         state.loading = false;
         state.errors = payload.errors;
      },
      userError: (state, {payload}) => {
         state.loading = false;
         state.error = payload;
      },
      clearValidationError(state) {
         state.errors = null;
      },
      clearUser(state) {
         state.loading = false;
         state.user = null;
         state.token = null;
         state.isAuthenticated = false;
         state.errors = null;
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
      });
   },
});

export const { setUser, clearUser, userError, userValidationError, clearValidationError } = actions;

export default reducer;
