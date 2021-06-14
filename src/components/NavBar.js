import React, {useState}  from 'react'
import HamMenu from './HamMenu';
import { Link } from "react-router-dom";
import { Drawer } from "antd";
import CartSummary from './CartSummary';
import UserInfo from './UserInfo';

function NavBar() {
    const [isOnTouch, setIsOnTouch] = useState(false);
    const handleCloseDrawer = () => setIsOnTouch(false);
    return (
        <div>
            <HamMenu
                onClick={() => setIsOnTouch(!isOnTouch)}
                isOnTouch={isOnTouch}
            />
            <div className="nav-bar collapse-mobile">
                <div className="nav-column">
                    <a href="#" className="column-content">
                        <i class="nav-icon fas fa-search fa-lg" />
                        <div className="column column1"></div>
                    </a>
                    
                </div>
                <UserInfo />
                {/* <div className="nav-column">
                    <a href="#" className="column-content">
                        <i class="nav-icon fas fa-user fa-lg" />
                        <div className="column column2"></div>
                    </a>
                </div> */}
                <CartSummary />
                {/* <div className="nav-column">
                    <a href="#" className="column-content">
                        <CartSummary />
                        <div className="column column3"></div>
                    </a>
                </div> */}
            </div>
            <Drawer
                title=" "
                placement={"top"}
                closable={false}
                onClose={handleCloseDrawer}
                visible={isOnTouch}
                key={"top"}
                height={400}
                zIndex={99}
                bodyStyle={{ backgroundColor: "#253237" }}
                headerStyle={{ backgroundColor: "#253237", color: "#FBFFF1", height: "0.8rem", padding: "0", borderBottom: "0"}}
            >
                <Link onClose={handleCloseDrawer} to="/about">
                    <div>
                        關於
                    </div>
                </Link>
                <Link onClose={handleCloseDrawer} to="/store">
                    <div>
                        全部商品
                    </div>
                </Link>
                <Link onClose={handleCloseDrawer} to="/feeder">
                    <div>
                        JSONFEED
                    </div>
                </Link>
            </Drawer>
        </div>
    )
}

export default NavBar
