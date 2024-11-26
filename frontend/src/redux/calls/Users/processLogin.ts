import { AppDispatch } from '../../store';
import { setUser, userError, userValidationError } from '../../reducers/authReducer';
import apiClient from '../../../services/api';
import { userLogin } from '../../action';
import { isAxiosError } from '../../../utils';

export const postUserLogin = (payload: { email: string, password: string }) => async (dispatch: AppDispatch) => {
   dispatch(userLogin())

   try {
      const { data } = await apiClient.post(`${import.meta.env.VITE_APP_BACKEND_ADDRESS}/user/login`, payload)

      sessionStorage.setItem('token', data.data.token)
      sessionStorage.setItem('user', JSON.stringify({
         uuid: data.data.uuid,
         email: data.data.email
      }))
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`;

      dispatch(setUser(data))
   } catch (error) {
      if (isAxiosError(error) && error.response?.status === 422) {
         dispatch(userValidationError(error.response.data))
      } else {
         dispatch(userError(error))
      }
   }
}
