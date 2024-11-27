import { AppDispatch } from '../../store';
import { setUserSuccess, userError, userValidationError } from '../../reducers/authReducer';
import apiClient from '../../../services/api';
import { userPasswordResetRequest } from '../../action';
import { isAxiosError } from '../../../utils';
import { TError } from '../../../types';

export const passwordResetRequest = (payload: { email: string }) => async (dispatch: AppDispatch) => {
   dispatch(userPasswordResetRequest())

   try {
      const { data } = await apiClient.post(`${import.meta.env.VITE_APP_BACKEND_ADDRESS}/user/password-reset/request`, payload)

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
