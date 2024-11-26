import { AppDispatch } from '../../store';
import { clearUser, setUser, userError, userValidationError } from '../../reducers/authReducer';
import apiClient from '../../../services/api';
import { userSavePreference } from '../../action';
import { isAxiosError } from '../../../utils';

export const savePreference = (payload: { providers: string[], categories: string[] }) => async (dispatch: AppDispatch) => {
   dispatch(userSavePreference());
   try {
      const response = await apiClient.post(`${import.meta.env.VITE_APP_BACKEND_ADDRESS}/user/preferences`, payload);
      dispatch(setUser(response.data.data));
   } catch (error) {
      if (isAxiosError(error)) {
         if (error.response?.status === 422) {
            dispatch(userValidationError(error.response.data));
         }else if (error.response?.status === 401) {
             dispatch(clearUser())
         }
      } else {
         dispatch(userError(error))
      }
   }
};
