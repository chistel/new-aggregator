import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchUser } from '../redux/calls/Users/fetchUser';

const useAuth = () => {
   const dispatch: AppDispatch = useDispatch();
   const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

   useEffect(() => {
      if (!isAuthenticated || (isAuthenticated && !user)) {
         dispatch(fetchUser());
      }
   }, [isAuthenticated, dispatch]);

   return {user, isAuthenticated, loading};
};

export default useAuth;
