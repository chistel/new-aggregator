import axios from 'axios';
import { AppDispatch } from '../../store';
import { fetchingError, setArticle, setArticles } from '../../reducers/articleReducer';
import { getArticle, getArticles } from '../../action';
import apiClient from '../../../services/api';

export const fetchArticles = (page: number = 1, keyword: string = '', date: string = '', provider: string | null = '') => async (dispatch: AppDispatch) => {
   dispatch(getArticles());
   try {
      const response = await apiClient.get(`${import.meta.env.VITE_APP_BACKEND_ADDRESS}/articles?page=${page}&keyword=${keyword}&date=${date}&provider=${provider}`);
      dispatch(setArticles(response.data));
   } catch (error: any) {
      dispatch(fetchingError(error.response?.data?.message || 'Failed to fetch articles'));
   }
};


export const fetchArticle = (articleId: string) => async (dispatch: AppDispatch) => {
   dispatch(getArticle());
   try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_ADDRESS}/articles/single/${articleId}`);
      dispatch(setArticle(response.data));
   } catch (error: any) {
      dispatch(fetchingError(error.response?.data?.message || 'Failed to fetch article'));
   }
};
