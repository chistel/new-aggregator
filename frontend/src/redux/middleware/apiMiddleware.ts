import axios, {AxiosRequestConfig} from 'axios';
import {Action, Dispatch, MiddlewareAPI} from 'redux';
import {User} from "../../types";

export type TData = User;

interface ApiAction {
   type: string;
   payload: {
      url: string;
      method: 'get' | 'post' | 'put' | 'delete';
      data?: Record<string, unknown> | FormData | Record<string, unknown>[];
      headers?: Record<string, string>;
      onStart?: string;
      onSuccess?: string;
      onError?: string;
   };
}

const apiMiddleware = <Payload>(storeAPI: MiddlewareAPI) => (next: Dispatch<Action>) => async (action: ApiAction) => {
   if (action.type !== 'api/callBegan') return next(action);
   // if (!action.meta || !action.meta.api) {
   //     return next(action);
   // }

   const {dispatch, getState} = storeAPI;

   const {url, method, data, onSuccess, onError} = action.payload;

   try {
      const token = getState().auth.token;
      const response = await axios({
         url: `${process.env.VITE_APP_BACKEND_ADDRESS}${url}`,
         method,
         data,
         headers: {Authorization: `Bearer ${token}`},
      } as AxiosRequestConfig);

      if (onSuccess) {
         dispatch({type: onSuccess, payload: response.data});
      }
   } catch (error: unknown) {
      if (error instanceof Error) {
         if (onError) {
            dispatch({type: onError, payload: error.message});
         }
      } else {
         if (onError) {
            dispatch({type: onError, payload: 'An unknown error occurred.'});
         }
      }
   }
};

export default apiMiddleware;
