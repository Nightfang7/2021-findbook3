import React, {useContext} from 'react'
import { Badge } from "antd";
import CartModal from "./CartModal";
import { StoreContext } from '../store';


function CartSummaryNavbar() {

    const { state: { cart: { cartItems }} } = useContext(StoreContext)
    const [isModalVisible, setIsOpen] = React.useState(false)
    const toggleModal = () => setIsOpen(!isModalVisible);

    const count = (cartItems.length > 0)?
        cartItems.reduce((sum, item) => sum + item.qty, 0) : 0;

    return (
        <>
            <nav onClick={toggleModal} className="point">
                <p className="ham-nav-text">購物車</p>       
            </nav>
            
            <CartModal
                isModalVisible={isModalVisible}
                toggleModal={toggleModal}
            />
        </>
    )
}

export default CartSummaryNavbar
