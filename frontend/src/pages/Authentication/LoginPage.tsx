import React, { ChangeEvent, FunctionComponent, useCallback, useEffect, useState } from 'react';
import { postUserLogin } from '../../redux/calls/Users/processLogin';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import InputError from '../../components/InputError';
import { clearUserError, clearValidationError } from '../../redux/reducers/authReducer';
import ErrorBanner from '../../components/ErrorBanner';
import AuthenticationCard from '../../components/AuthenticationCard';
import { Link } from 'react-router-dom';

const LoginPage: FunctionComponent = () => {
   const dispatch: AppDispatch = useDispatch()
   const [formData, setFormData] = useState<{ email: string, password: string }>({email: '', password: ''});

   const {loading, errors, error} = useSelector((state: RootState) => state.auth);

   useEffect(() => {
      dispatch(clearValidationError());
      dispatch(clearUserError());
   }, [dispatch]);

   const handleLogin = () => {
      dispatch(postUserLogin(formData));
      setFormData({email: '', password: ''})
   }

   const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setFormData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   }, []);

   // useEffect(() => {
   //    if (loading){
   //       setFormData({ email: '', password: '' })
   //    }
   // }, [loading]);

   return (
      <AuthenticationCard>
         {!loading && error !== undefined && (
            <div className="my-3">
               <ErrorBanner>
                  <p className="text-base font-semibold">Login Error</p>
                  <p>{error.message}</p>
               </ErrorBanner>
            </div>
         )}
         <div>
            <div>
               <input
                  className="text-base text-black w-full px-4 py-2 border border-solid border-gray-300 rounded"
                  type="text"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
               />
               {errors?.email && <InputError message={errors.email[0]}/>}
            </div>
            <div>
               <input
                  className="text-base text-black w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                  type="password"
                  required
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
               />
               {errors?.password && <InputError message={errors.password[0]}/>}
            </div>
            <div className="flex items-center justify-end mt-4">
               <Link
                  className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
                  to="/user/forget-password"
               >
                  Forgot Password?
               </Link>
               <button
                  className="ms-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider disabled:bg-gray-400 disabled:cursor-not-allowed"
                  type="submit"
                  onClick={handleLogin}
                  disabled={loading}
               >
                  {loading && (
                     <span className="absolute inset-0 flex items-center justify-center">
                      <svg
                         className="w-5 h-5 text-white animate-spin"
                         xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24"
                      >
                        <circle
                           className="opacity-25"
                           cx="12"
                           cy="12"
                           r="10"
                           stroke="currentColor"
                           strokeWidth="4"
                        ></circle>
                        <path
                           className="opacity-75"
                           fill="currentColor"
                           d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                    </span>
                  )}
                  <span className={loading ? "opacity-50" : ""}>Login</span>
               </button>
            </div>
         </div>
      </AuthenticationCard>
   );
};

export default LoginPage;
