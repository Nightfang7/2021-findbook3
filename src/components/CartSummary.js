import React, {useContext} from 'react'
import { Badge } from "antd";
import CartModal from "./CartModal";
import { StoreContext } from '../store';


function CartSummary() {

    const { state: { cart: { cartItems }} } = useContext(StoreContext)
    const [isModalVisible, setIsOpen] = React.useState(false)
    const toggleModal = () => setIsOpen(!isModalVisible);

    const count = (cartItems.length > 0)?
        cartItems.reduce((sum, item) => sum + item.qty, 0) : 0;

    return (
        <>
            <div className="nav-column">
                <nav onClick={toggleModal} className="column-content header-cart-summary" >
                    <Badge className="shopNum" count={count} style={{ color: '#FBFFF1', backgroundColor: '#E26D5C'}}>
                        <i class="fas fa-shopping-bag fa-lg" />
                    </Badge>
                    <div className="column column3"></div>         
                </nav>
            </div>
            
            <CartModal
                isModalVisible={isModalVisible}
                toggleModal={toggleModal}
            />
        </>
    )
}

export default CartSummary
