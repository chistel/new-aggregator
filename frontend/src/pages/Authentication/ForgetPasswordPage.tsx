import React,  {ChangeEvent, FunctionComponent, useCallback, useState } from 'react';
import { postUserLogin } from '../../redux/calls/Users/processLogin';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';

const ForgetPasswordPage: FunctionComponent = () => {
   const dispatch: AppDispatch = useDispatch()
   const [formData, setFormData] = useState<{ email: string}>({email: ''});
   const [errors, setErrors] = useState({});

   const { loading } = useSelector((state: RootState) => state.user)

   const handleRequest = () => {
      // dispatch(postUserLogin(formData));
      setFormData({email: ''})
   }


   return (
      <div className="container h-full px-6 py-24">
         <div
            className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
            <div className="p-4 sm:p-7">
               <div className="text-center">
                  <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                     Remember your password?
                     <a className="text-blue-600 decoration-2 hover:underline font-medium" href="#">
                        Login here
                     </a>
                  </p>
               </div>

               <div className="mt-5">
                  <form>
                     <div className="grid gap-y-4">
                        <div>
                           <label htmlFor="email" className="block text-sm font-bold ml-1 mb-2 dark:text-white">Email
                              address</label>
                           <div className="relative">
                              <input type="email" id="email" name="email"
                                     className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                     required aria-describedby="email-error"/>
                           </div>
                           <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email
                              address so we can get back to you</p>
                        </div>
                        <button type="submit"
                                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Reset
                           password
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>

      </div>
   );
};

export default ForgetPasswordPage;
