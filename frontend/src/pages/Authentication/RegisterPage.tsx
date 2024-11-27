import React, {ChangeEvent, FormEvent, FunctionComponent, useCallback, useEffect, useState} from 'react';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { processRegister } from '../../redux/calls/Users/registerUser';
import InputError from "../../components/InputError";
import { clearValidationError, clearUserError } from '../../redux/reducers/authReducer';
import ErrorBanner from '../../components/ErrorBanner';
import AuthenticationCard from '../../components/AuthenticationCard';
import { Link } from 'react-router-dom';

const RegisterPage: FunctionComponent = () => {

   const dispatch: AppDispatch = useDispatch()
   const [formData, setFormData] = useState<{ email: string, password: string }>({email: '', password: ''});


   const { loading, errors, error } = useSelector((state: RootState) => state.auth);

   useEffect(() => {
      dispatch(clearValidationError());
      dispatch(clearUserError());
   }, [dispatch]);

   const handleRegistration = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(processRegister(formData));
   }

   const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   }, []);

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
            <form method="POST" onSubmit={handleRegistration}>
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
                  {errors?.password && <InputError message={errors.password[0]}/> }
               </div>
               <div className="flex items-center justify-end mt-4">
                  <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                     have an account?{" "}
                     <Link
                        className="text-red-600 hover:underline hover:underline-offset-4"
                        to="/user/login"
                     >
                        Login
                     </Link>
                  </div>
                  <button
                     className="ms-4 mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-3 text-white uppercase rounded text-xs tracking-wider disabled:bg-gray-400 disabled:cursor-not-allowed"
                     type="submit"
                     disabled={loading}
                  >
                     <span className={loading ? "opacity-50" : ""}>Register</span>
                  </button>
               </div>
            </form>
         </div>
      </AuthenticationCard>
   );
};

export default RegisterPage;
