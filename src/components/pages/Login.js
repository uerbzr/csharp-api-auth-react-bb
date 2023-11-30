import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper"

export const Login = () => {

     const navigate = useNavigate();
     const { login } = AuthData();
     const [ formData, setFormData ] = useReducer((formData, newItem) => { return ( {...formData, ...newItem} )}, {userName: "", password: ""})
     const [ errorMessage, setErrorMessage ] = useState(null)
     
     const doLogin = async (e) => {

          e.preventDefault()
          try {
               
               await login(formData.userName, formData.password)
               navigate("/account")

          } catch (error) {

               setErrorMessage(error)
               
          }
          
     }

     return (
          <>
          
          <form className="page"  onSubmit={doLogin}>
               <h2>Login page</h2>
               <div className="inputs">
                    <div className="input">
                         <input value={formData.userName} onChange={(e) => setFormData({userName: e.target.value}) } type="text" required/>
                    </div>
                    <div className="input">
                         <input value={formData.password} onChange={(e) => setFormData({password: e.target.value}) } type="password" required />
                    </div>
                    <div className="button">
                         <input value="Login" type="submit" />
                    </div>
                   
               </div>
          </form>
          {errorMessage ? <div className="error">{errorMessage}</div> : null }
                    </>       
     )
}