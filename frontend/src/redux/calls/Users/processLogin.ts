import { AppDispatch } from '../../store';
import { setUser, userError } from '../../reducers/authReducer';
import apiClient from '../../../services/api';
import { userLogin } from '../../action';

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
   } catch (err) {
      // if (err.response.status === 422) {
      //       setErrorMessage(error.response.data.message);
      // }
      dispatch(userError(err))
   }
}
