import {useDispatch} from "react-redux";
// import { userHasLoggedIn } from "./actions/userAction";
import {Navigate, Route, Routes} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SectionContainer from "./components/SectionContainer";
import RegisterPage from "./pages/Authentication/RegisterPage";
import LoginPage from "./pages/Authentication/LoginPage";
import useAuth from "./hooks/useAuth";
import SettingsPage from "./pages/User/SettingsPage";
import PersonalizedArticlesPage from "./pages/User/PersonalizedArticlesPage";

function App() {
   const dispatch = useDispatch()
   const {user, isAuthenticated, loading} = useAuth();

   return (
      <>
         <SectionContainer>
            <Header user={user} isAuthenticated={isAuthenticated} loading={loading}/>
            <main className="mb-auto">
               <Routes>
                  <Route path="/" element={<LandingPage/>}/>
                  <Route path="user/register" element={
                     !isAuthenticated ? (
                        <RegisterPage/>
                     ) : (
                        <Navigate replace to={"/"}/>
                     )
                  }/>
                  <Route path="user/login" element={
                     !isAuthenticated ? (
                        <LoginPage/>
                     ) : (
                        <Navigate replace to={"/"}/>
                     )
                  }/>
                  <Route path="user/settings" element={
                     isAuthenticated === true ? (
                        <SettingsPage user={user} isAuthenticated={isAuthenticated} loading={loading}/>
                     ) : (
                        <Navigate replace to={"/"}/>
                     )
                  }/>

                  <Route path="article/personalised" element={
                     isAuthenticated === true ? (
                        <PersonalizedArticlesPage user={user} isAuthenticated={isAuthenticated} loading={loading}/>
                     ) : (
                        <Navigate replace to={"/"}/>
                     )
                  }/>

                  {/*{ !isAuthenticated &&*/}
                  {/*   (*/}
                  {/*      <>*/}
                  {/*         <Route path="user/register" element={<RegisterPage/>}/>*/}
                  {/*         <Route path="user/login" element={<LoginPage/>}/>*/}
                  {/*      </>*/}
                  {/*   )*/}
                  {/*}*/}
               </Routes>
            </main>
            <Footer/>
         </SectionContainer>
      </>

   );
}

export default App;
