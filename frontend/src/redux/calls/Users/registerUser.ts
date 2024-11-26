import { AppDispatch } from '../../store';
import { setUser, userError, userValidationError } from '../../reducers/authReducer';
import apiClient from '../../../services/api';
import { userRegister } from '../../action';
import { isAxiosError } from '../../../utils';
import {TError} from "../../../types";

export const processRegister = (payload: { email: string, password: string }) => async (dispatch: AppDispatch) => {
   dispatch(userRegister())

   try {
      const { data } = await apiClient.post(`${import.meta.env.VITE_APP_BACKEND_ADDRESS}/user/register`, payload)

      sessionStorage.setItem('token', data.data.token);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`;

      dispatch(setUser(data))
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
