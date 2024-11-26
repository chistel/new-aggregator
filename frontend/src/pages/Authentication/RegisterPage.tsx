import React, {FunctionComponent} from "react";

const RegisterPage: FunctionComponent = () => {
   return (
      <div className="container h-full px-6 py-24">
         <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <input
               className="text-base w-full px-4 py-2 border border-solid border-gray-300 rounded"
               type="text"
               placeholder="Email Address"
            />
            <input
               className="text-base w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
               type="password"
               placeholder="Password"
            />
            <div className="text-center md:text-left">
               <button
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-3 text-white uppercase rounded text-xs tracking-wider"
                  type="submit"
               >
                  Register
               </button>
            </div>
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
