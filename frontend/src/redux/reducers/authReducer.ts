import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types';

const initialState: AuthState = {
   user: null,
   token: null,
   loading: false,
   error: undefined,
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
      },
      userError: (state, {payload}) => {
         state.loading = false;
         state.error = payload;
      },
      clearUser(state) {
         state.loading = false;
         state.user = null;
         state.token = null;
         state.isAuthenticated = false;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase('@user/SavePreference', (state) => {
            state.loading = true;
            state.error = undefined;
         }).addCase('@user/Login', (state) => {
         state.loading = true;
         state.error = undefined;
      }).addCase('@user/Register', (state) => {
         state.loading = true;
         state.error = undefined;
      });
   },
});

export const { setUser, clearUser, userError } = actions;

export default reducer;
