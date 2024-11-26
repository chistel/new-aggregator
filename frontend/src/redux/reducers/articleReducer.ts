import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, NewsState, TMeta } from '../../types';

const initialState: NewsState = {
   all: [],
   single: null,
   loading: false,
   error: undefined,
   meta: undefined,
};

const { reducer, actions } = createSlice({
   name: 'article',
   initialState,
   reducers: {
      fetchingArticle: (state) => {
         state.loading = true;
      },
      setArticles: (state, action: PayloadAction<{ data: Article[]; meta: TMeta }>) => {
         state.loading = false;
         state.all = action.payload.data;
         state.meta = action.payload.meta;
      },
      setArticle: (state, action: PayloadAction<Article>) => {
         state.loading = false;
         state.single = action.payload;
      },
      fetchingError: (state, {payload}) => {
         state.loading = false;
         state.error = payload;
      },
      clearArticle: () => initialState,
   },
   extraReducers: (builder) => {
      builder
         .addCase('@article/getAll', (state) => {
            state.loading = true;
            state.error = undefined;
         });
   },
});

export const { fetchingArticle, setArticles, setArticle, fetchingError, clearArticle } = actions;

export default reducer;
