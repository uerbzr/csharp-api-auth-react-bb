import { createContext, useContext, useState, useEffect } from "react"
import { RenderHeader } from "../components/structure/Header";
import { RenderMenu, RenderRoutes } from "../components/structure/RenderNavigation";
import { jwtDecode } from "jwt-decode";
import Cookies from 'universal-cookie';
import { Navigate } from "react-router-dom";
const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);


export const AuthWrapper = () => {
     console.log('call persist?')
     const API_URL = process.env.REACT_APP_API_URL
     const API_LOGIN = process.env.REACT_APP_API_LOGIN_ROUTE
     const cookies = new Cookies();
     const [ user, setUser ] = useState({name: "", isAuthenticated: false})

     console.log('isAuthenticated',user.isAuthenticated)
     
     
    
     const persistLogin = () => {
          const token = cookies.get('jwt_authorization')
          console.log('token', token)
          if(token)
          {
               const decoded = jwtDecode(token);   
               console.log(decoded)    
               setUser({name: decoded.username, email: decoded.email, firstname: decoded.firstname, lastname: decoded.lastname, exp: decoded.exp, isAuthenticated:true});
          }
     }
   
     if(!user.isAuthenticated)
     {
          persistLogin()
     }


     const login = (userName, password) => {

          // Make a call to the authentication API to check the username
          
          return new Promise((resolve, reject) => {

               const payload = {
                    "username":userName,
                    "password":password
               }
               console.log( API_URL )
               fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_API_LOGIN_ROUTE, {
                    method: 'POST',
                    body: JSON.stringify(payload),        
                    headers: {
                       'Content-type': 'application/json; charset=UTF-8',
                    },
                 })
                    .then((res) => res.json())   
                    .then((res) => {
                      const user = jwtDecode(res.data);       
                      setUser({name: user.username, email: user.email, firstname: user.firstname, lastname: user.lastname, exp: user.exp, isAuthenticated:true});
                      //console.log('user', user)
                      cookies.set('jwt_authorization', res.data, {
                        expires: new Date(user.exp * 1000), 
                      });
                      
                      resolve("success")
                    })      
                    .catch((err) => {
                       console.log(err.message);
                       console.log(err);
                       reject("Incorrect password")
                    });
              
               
          })
          
          
     }
     const logout = () => {

          console.log('logout')
          setUser({...user, isAuthenticated: false})
          cookies.remove('jwt_authorization')
          //setUser({...null, isAuthenticated: false})

         
          return(

               <Navigate to="/" replace={true} />
          )
         
     }


     return (
          
               <AuthContext.Provider value={{user, login, logout}}>
                    <>
                         <RenderHeader />
                         <RenderMenu />
                         <RenderRoutes />
                    </>
                    
               </AuthContext.Provider>
          
     )

}