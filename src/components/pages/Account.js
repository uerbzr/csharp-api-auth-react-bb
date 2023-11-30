import { AuthData } from "../../auth/AuthWrapper"

export const Account = () => {

     const { user } = AuthData();

     return (
          <div className="page">
               <h2>Your Account</h2>
               <p>Username: {user.name}</p>
               <p>Email: {user.email}</p>
               <p>Fullname: {user.firstname} {user.lastname}</p>
          </div>
     )
}