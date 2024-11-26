import React, {ChangeEvent, FormEvent, FunctionComponent, useCallback, useEffect, useState} from 'react';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { processRegister } from '../../redux/calls/Users/registerUser';
import InputError from "../../components/InputError";
import { clearValidationError } from '../../redux/reducers/authReducer';

const RegisterPage: FunctionComponent = () => {

   const dispatch: AppDispatch = useDispatch()
   const [formData, setFormData] = useState<{ email: string, password: string }>({email: '', password: ''});


   const { loading, errors } = useSelector((state: RootState) => state.auth);

   useEffect(() => {
      dispatch(clearValidationError());
   }, []);

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
      <div className="container h-full px-6 py-24">
         <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
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
               <div className="text-center md:text-left">
                  <button
                     className="w-full mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-3 text-white uppercase rounded text-xs tracking-wider disabled:bg-gray-400 disabled:cursor-not-allowed"
                     type="submit"
                     disabled={loading}
                  >
                     <span className={loading ? "opacity-50" : ""}>Register</span>
                  </button>
               </div>
            </form>
            <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
               have an account?{" "}
               <a
                  className="text-red-600 hover:underline hover:underline-offset-4"
                  href="/user/login"
               >
                  Login
               </a>
            </div>
         </div>
      </div>
   );
};

export default RegisterPage;
