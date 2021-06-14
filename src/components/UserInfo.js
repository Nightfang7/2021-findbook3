import React, { useEffect, useContext } from 'react'
import { UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { StoreContext } from "../store"

function UserInfo(props) {
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
        <div className="nav-column">
            <nav onClick={goToProfile} style={{ ...props.style }} className="column-content header-cart-summary" >
                
                {userInfo
                ? <i class="nav-icon fas fa-user fa-lg" />
                : <i class="nav-icon fas fa-user fa-lg" />

                }
                
                <div className="column column2">
                <p className="cart-summary-text">
                    {userInfo
                        ? `${userInfo.displayName}`
                        : `請登入`
                    }
                </p>
                </div>
            </nav>
        </div>
            
        </>
    )
}

export default UserInfo
