import React,  {ChangeEvent, FunctionComponent, useCallback, useState } from 'react';
import { postUserLogin } from '../../redux/calls/Users/processLogin';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';

const LoginPage: FunctionComponent = () => {
   const dispatch: AppDispatch = useDispatch()
   const [formData, setFormData] = useState<{ email: string, password: string }>({email: '', password: ''});
   const [errors, setErrors] = useState({});

   const { loading } = useSelector((state: RootState) => state.user)

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
      <div className="container h-full px-6 py-24">
         <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <input
               className="text-base w-full px-4 py-2 border border-solid border-gray-300 rounded"
               type="text"
               placeholder="Email Address"
               value={formData.email}
               onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <input
               className="text-base w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
               type="password"
               placeholder="Password"
               value={formData.password}
               onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <div className="mt-4 flex justify-between font-semibold text-base">
               <a
                  className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
                  href="#"
               >
                  Forgot Password?
               </a>
            </div>
            <div className="text-center md:text-right">
               <button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider disabled:bg-gray-400 disabled:cursor-not-allowed"
                  type="submit"
                  onClick={handleLogin}
                  disabled={loading}
               >
                  { loading && (
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
                  <span className={loading ? "opacity-0" : ""}>Login</span>
               </button>
            </div>
            <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
               Don't have an account?{" "}
               <a
                  className="text-red-600 hover:underline hover:underline-offset-4"
                  href="/user/register"
               >
                  Register
               </a>
            </div>
         </div>
      </div>
   );
};

export default LoginPage;
