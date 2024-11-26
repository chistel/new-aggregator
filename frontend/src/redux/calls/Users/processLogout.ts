import { AppDispatch } from '../../store';
import apiClient from '../../../services/api';
import { clearUser } from '../../reducers/authReducer';
import { AxiosError } from 'axios';

export const processLogout = () =>  async (dispatch: AppDispatch) => {

   try {
      await apiClient.delete(`${import.meta.env.VITE_APP_BACKEND_ADDRESS}/user/logout`);
      sessionStorage.clear();
      dispatch(clearUser());
   } catch (error: unknown) {
      if (error instanceof AxiosError) {
         console.error('API Error:', error.response?.data || error.message);
      }
      throw error;
   }
}
