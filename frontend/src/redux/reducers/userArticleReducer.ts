import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, TMeta, UserNewsState } from '../../types';

const initialState: UserNewsState = {
   all: [],
   loading: false,
   error: undefined,
   meta: undefined,
};

const { reducer, actions } = createSlice({
   name: 'userArticle',
   initialState,
   reducers: {
      setUserArticles: (state, action: PayloadAction<{ data: Article[]; meta: TMeta }>) => {
         state.loading = false;
         state.all = action.payload.data;
         state.meta = action.payload.meta;
      },
      fetchingUserArticlesError: (state, {payload}) => {
         state.loading = false;
         state.error = payload;
      },
      clearUserArticle: () => initialState,
   },
   extraReducers: (builder) => {
      builder
         .addCase('@user/PersonalisedArticles', (state) => {
            state.loading = true;
            state.error = undefined;
         });
   },
});

export const { setUserArticles, fetchingUserArticlesError, clearUserArticle } = actions;

export default reducer;
