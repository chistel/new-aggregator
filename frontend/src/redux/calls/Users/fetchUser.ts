import {AppDispatch} from "../../store";
import {clearUser, setUser} from "../../reducers/authReducer";
import apiClient from "../../../services/api";

export const fetchUser = () => async (dispatch: AppDispatch) => {
   try {
      const response = await apiClient.get(`${import.meta.env.VITE_APP_BACKEND_ADDRESS}/user`);
      dispatch(setUser(response.data.data));
   } catch (error) {
      dispatch(clearUser());
   }
};
