import { AppDispatch } from '../../store';
import { setUser, userError } from '../../reducers/authReducer';
import apiClient from '../../../services/api';
import { userRegister } from '../../action';

export const processRegister = (payload: { email: string, password: string }) => async (dispatch: AppDispatch) => {
   dispatch(userRegister())

   try {
      const { data } = await apiClient.post(`${import.meta.env.VITE_APP_BACKEND_ADDRESS}/user/register`, payload)

      sessionStorage.setItem('token', data.data.token);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`;

      dispatch(setUser(data))
   } catch (err) {
      // if (err.response.status === 422) {
      //       setErrorMessage(error.response.data.message);
      // }
      dispatch(userError(err))
   }
}
