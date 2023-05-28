import React from 'react';
import { UserProvider } from "../../Component/UserProvider";
import User from '../../Component/User-profile/user-profile'

function profile() {
    return (
        <div>
          <UserProvider>
          <User/>
          </UserProvider>
        </div>
    );
}

export default profile;