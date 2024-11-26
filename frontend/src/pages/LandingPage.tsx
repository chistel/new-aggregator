import React, { FunctionComponent } from 'react';
import AllArticle from '../components/Articles/AllArticle';

const LandingPage: FunctionComponent = () => {
   return (
      <>
         <div>
            <h1
               className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">Latest</h1>
            <AllArticle/>
         </div>
      </>
   );
};

export default LandingPage;
