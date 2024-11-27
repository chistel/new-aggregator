import React, {ChangeEvent, FormEvent, FunctionComponent, useCallback, useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthenticationCard from '../../components/AuthenticationCard';
import { AppDispatch, RootState } from '../../redux/store';
import InputError from "../../components/InputError";
import ErrorBanner from '../../components/ErrorBanner';
import SuccessBanner from '../../components/SuccessBanner';
import { resetPassword } from '../../redux/calls/Users/resetPassword';
import {clearUserError, clearValidationError} from "../../redux/reducers/authReducer";

const ResetPasswordPage: FunctionComponent = () => {
   const dispatch: AppDispatch = useDispatch();
   const location = useLocation();
   const navigate = useNavigate();
   const [formData, setFormData] = useState<{ password: string, password_confirmation: string}>({ password: '', password_confirmation: ''});

   const token = new URLSearchParams(location.search).get('token');
   const email = new URLSearchParams(location.search).get('email');

   const { loading, errors, error, successful } = useSelector((state: RootState) => state.auth)

   const handleRequest= useCallback((e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(resetPassword({...formData, email: email as string, token: token as string}));
   }, [dispatch, formData]);

   useEffect(() => {
      if (!loading && successful){
         setTimeout(() => {
            dispatch(clearValidationError());
            dispatch(clearUserError());

            navigate('/user/login');
         }, 3000);
      }
   }, [dispatch, loading, successful]);


   return (
      <AuthenticationCard>
         {!loading && error !== undefined && (
            <div className="my-3">
               <ErrorBanner>
                  <p className="text-base font-semibold">Error</p>
                  <p>{error.message}</p>
               </ErrorBanner>
            </div>
         )}
         {!loading && successful && (
            <div className="my-3">
               <SuccessBanner>
                  <p>Password reset was successful, you would be redirected to the login page in a few seconds</p>
               </SuccessBanner>
            </div>
         )}

         <form method="POST" onSubmit={handleRequest}>
            <div>
               <label htmlFor="password" className="block text-sm font-bold ml-1 dark:text-white">Password</label>
               <div>
                  <input type="password" id="password" name="password" placeholder="Password"
                         className="py-2 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                         required aria-describedby="email-error"
                         value={formData.password}
                         onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
               </div>
               {errors?.password && <InputError message={errors.password[0]}/>}
            </div>
            <div className="mt-3">
               <label htmlFor="password_confirmation" className="block text-sm font-bold ml-1 dark:text-white">Password</label>
               <div>
                  <input type="password" id="password_confirmation" name="password_confirmation" placeholder="Confirm password"
                         className="py-2 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                         required aria-describedby="email-error"
                         value={formData.password_confirmation}
                         onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
                  />
               </div>
               {errors?.password_confirmation && <InputError message={errors.password_confirmation[0]}/>}
            </div>
            <div className="flex items-center justify-end mt-4">
               <button type="submit"
                       className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Reset
                  password
               </button>
            </div>
         </form>
      </AuthenticationCard>
   );
};

export default ResetPasswordPage;
