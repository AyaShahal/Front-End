import React from 'react';
import Adminsignin from '../../Component/Admin-signin/admin-signin'
import { UserProvider } from '../../Component/UserProvider';
function Adminlogin() {
    return (
        <div>
            <UserProvider>
            <Adminsignin/>
            </UserProvider>
        </div>
    );
}

export default Adminlogin;