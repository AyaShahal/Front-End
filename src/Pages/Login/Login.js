import React from 'react';
import Signin from '../../Component/Signin/Signin';
import { UserProvider } from "../../Component/UserProvider";
function Login() {
    return (
        <div>
              <UserProvider>
        <Signin/>
        </UserProvider>
        </div>
    );
}

export default Login;