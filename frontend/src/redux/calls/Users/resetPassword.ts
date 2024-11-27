import { AppDispatch } from '../../store';
import { setUserSuccess, userError, userValidationError } from '../../reducers/authReducer';
import apiClient from '../../../services/api';
import { userResetPassword } from '../../action';
import { isAxiosError } from '../../../utils';
import { TError } from '../../../types';

export const resetPassword = (payload: { email: string, token: string, password: string, password_confirmation: string }) => async (dispatch: AppDispatch) => {
   dispatch(userResetPassword())

   try {
      const { data } = await apiClient.post(`${import.meta.env.VITE_APP_BACKEND_ADDRESS}/user/password-reset/change`, payload)

      dispatch(setUserSuccess(data))
   } catch (error) {
      if (isAxiosError(error)) {
         if (error.response?.status === 422) {
            dispatch(userValidationError(error.response.data));
         }else {
            dispatch(userError(error.response?.data as TError));
         }
      }
   }
}
