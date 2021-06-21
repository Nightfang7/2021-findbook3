import React, { useEffect, useContext } from 'react'
import { UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { StoreContext } from "../store"

function UserInfoNavbar(props) {
    const { state: { userSignin : { userInfo } } } = useContext(StoreContext);
    const history = useHistory();

    const goToProfile = () => {
        history.push("/login?redirect=profile");
    };
    useEffect(() => {
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }, [userInfo]);
  
    return (
        <>
            <nav onClick={goToProfile} style={{ ...props.style }} className="column-content header-cart-summary" >
                <p className="ham-nav-text">
                    {userInfo
                        ? `已登入帳號: ${userInfo.displayName}`
                        : `登入帳號`
                    }
                </p>
            </nav>
            
        </>
    )
}

export default UserInfoNavbar
