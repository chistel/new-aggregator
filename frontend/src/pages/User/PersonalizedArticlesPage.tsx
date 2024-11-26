import React, { FunctionComponent } from 'react';
import AllArticle from '../../components/Articles/AllArticle';
import { User } from '../../types';

interface IPersonalizedArticlesPageProps {
   user: User | null,
   isAuthenticated?: boolean,
   loading?: boolean,
}
const PersonalizedArticlesPage: FunctionComponent<IPersonalizedArticlesPageProps> = ({ user, isAuthenticated, loading }) => {
   return (
      <>
         <div>
            <h1
               className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">Personalised News</h1>
            <AllArticle type='personalized'/>
         </div>
      </>
   );
};

export default PersonalizedArticlesPage;
