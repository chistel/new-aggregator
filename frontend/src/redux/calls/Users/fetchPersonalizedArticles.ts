import axios from 'axios';
import { AppDispatch } from '../../store';
import {  userPersonalisedArticles } from '../../action';
import { fetchingUserArticlesError, setUserArticles } from '../../reducers/userArticleReducer';
import apiClient from '../../../services/api';

export const fetchPersonalizedArticles = (page: number = 1, keyword: string = '', date: string = '', provider: string | null = '') => async (dispatch: AppDispatch) => {
   dispatch(userPersonalisedArticles());
   try {
      const response = await apiClient.get(`${import.meta.env.VITE_APP_BACKEND_ADDRESS}/articles/personalized?page=${page}&keyword=${keyword}&date=${date}&provider=${provider}`);
      dispatch(setUserArticles(response.data));
   } catch (error: any) {
      dispatch(fetchingUserArticlesError(error.response?.data?.message || 'Failed to fetch articles'));
   }
};

