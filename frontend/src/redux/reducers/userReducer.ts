import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User, UserState} from "../../types";


const initialState: UserState = {
   users: [],
   loading: false,
   error: null,
};

const {actions, reducer} = createSlice({
   name: 'users',
   initialState,
   reducers: {
      fetchUsersRequest: (state) => {
         state.loading = true;
         state.error = null;
      },
      fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
         state.loading = false;
         state.users = action.payload;
      },
      fetchUsersFailure: (state, action: PayloadAction<string>) => {
         state.loading = false;
         state.error = action.payload;
      },
      clearUsers: () => initialState,
   },
});

export const {fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure} = actions;

export default reducer;
