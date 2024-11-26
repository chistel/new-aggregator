import { AppDispatch } from '../../store';
import { clearUser, setUser } from '../../reducers/authReducer';
import apiClient from '../../../services/api';
import { userSavePreference } from '../../action';

export const savePreference = (payload: { providers: string[], categories: string[] }) => async (dispatch: AppDispatch) => {
   dispatch(userSavePreference());
   try {
      const response = await apiClient.post(`${import.meta.env.VITE_APP_BACKEND_ADDRESS}/user/preferences`, payload);
      dispatch(setUser(response.data.data));
   } catch (error) {
      dispatch(clearUser());
   }
};
