import React from 'react';
import Register from '../../Component/Register/Register';
import { UserProvider } from "../../Component/UserProvider";
function Signup() {
    return (
        <div>
             <UserProvider>
            <Register/>
            </UserProvider>
        </div>
    );
}

export default Signup;