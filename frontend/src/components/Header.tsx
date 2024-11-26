import { FunctionComponent, useCallback, useMemo } from 'react';
import MobileNav from './MobileNav'
import headerNavLinks from '../data/headerNavLinks';
import { User } from '../types';
import { useDispatch } from "react-redux";
import { processLogout } from '../redux/calls/Users/processLogout';
import { AppDispatch } from '../redux/store';
import { Link, useNavigate } from 'react-router-dom';

interface IHeaderProps {
   user?: User | null,
   isAuthenticated?: boolean,
   loading?: boolean,
}

const Header: FunctionComponent<IHeaderProps> = ({user, isAuthenticated, loading}) => {
   const dispatch: AppDispatch = useDispatch();
   const nav = useNavigate();
   console.log('user', user);
   console.log('isAuthenticated', isAuthenticated);

   const logout = useCallback(() => {
      dispatch(processLogout());
      //nav('/');
   },[processLogout]);

   const headerLinks = useMemo(() => {
      return headerNavLinks
         .filter((link) => ((isAuthenticated === true && ['Setting', 'Personalised News'].includes(link.title)) || (isAuthenticated === false && ['Register', 'Login'].includes(link.title))) && link.href !== '/');
   }, [isAuthenticated, headerNavLinks]);
   let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-6 sticky top-0 z-50'

   return (
      <header className={headerClass}>
         <Link to="/">
            <div className="flex items-center justify-between text-white font-bold uppercase">
               News Aggregator
            </div>
         </Link>
         <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
            <div
               className="no-scrollbar hidden max-w-40 items-center space-x-4 overflow-x-auto sm:flex sm:space-x-6 md:max-w-72 lg:max-w-96">
               {headerLinks.map((link) => {
                  return (
                     <Link
                        key={link.title}
                        to={link.href}
                        className="block font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
                     >
                        {link.title}
                     </Link>
                  );
               })}
               {isAuthenticated === true && (
                  <form onClick={logout}>
                     <button type="button" className="block font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400">
                        Logout
                     </button>
                  </form>
               )}
            </div>
            <MobileNav user={user} isAuthenticated={isAuthenticated} loading={loading} onLogout={logout}/>
         </div>

      </header>
   )
}

export default Header
