import React, { ChangeEvent, FormEvent, FunctionComponent, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthenticationCard from '../../components/AuthenticationCard';
import { AppDispatch, RootState } from '../../redux/store';
import InputError from "../../components/InputError";
import { passwordResetRequest } from '../../redux/calls/Users/passwordResetRequest';
import ErrorBanner from '../../components/ErrorBanner';
import SuccessBanner from '../../components/SuccessBanner';

const ForgetPasswordPage: FunctionComponent = () => {
   const dispatch: AppDispatch = useDispatch()
   const [formData, setFormData] = useState<{ email: string}>({email: ''});

   const { loading, errors, error, successful } = useSelector((state: RootState) => state.auth)

   const handleRequest= useCallback((e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(passwordResetRequest(formData));
   }, [dispatch, passwordResetRequest, formData]);


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
                  <p>Password reset request was successful, please check your email address to proceed with resetting your password</p>
               </SuccessBanner>
            </div>
         )}
         <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Forgot your password? No problem. Just let us know your email address and we will email you a password reset
            link that will allow you to choose a new one.
         </div>
         <form method="POST" onSubmit={handleRequest}>
            <div>
               <label htmlFor="email" className="block text-sm font-bold ml-1 mb-2 dark:text-white">Email
                  Address</label>
               <div>
                  <input type="email" id="email" name="email" placeholder="Email address"
                         className="py-2 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                         required aria-describedby="email-error"
                         value={formData.email}
                         onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
               </div>
               {errors?.email && <InputError message={errors.email[0]}/>}
            </div>
            <div className="flex items-center justify-end mt-4">
               <button type="submit"
                       className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                  Email Password Reset Link
               </button>
            </div>
         </form>
      </AuthenticationCard>
   );
};

export default ForgetPasswordPage;
