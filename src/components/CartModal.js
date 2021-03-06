import { Modal, Button, Select } from "antd";
import { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { StoreContext } from "../store"
import { addcartItem, removeCartItem, setProductDetail } from "../action";
const { Option } = Select;

export default function CartModal({isModalVisible, toggleModal}) {
   const { state: { cart: { cartItems } }, dispatch } = useContext(StoreContext);
   const history = useHistory();
   const handleCancel = () => toggleModal(!isModalVisible);

    const getTotalPrice = () => {
        return (cartItems.length > 0) ?
           cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
           : 0;
    }

    const checkoutHandler = () => {
      history.push("/login?redirect=shipping");
   }

    useEffect(()=>{
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
   }, [cartItems])

   return (
      <Modal 
         title="購物車" 
         visible={isModalVisible} 
         onCancel={handleCancel}
         footer={null}
      >
        {cartItems.length === 0 ? (
            <div>ㄛㄛ~購物車是空的</div>
         ) : (
            cartItems.map(item => (
               <li key={item.id} className="cart-item">
                  <Link to={`/product/${item.category}/${item.id}`}>
                     <div className="cart-image" onClick={()=>{
                        setProductDetail(dispatch, item.id, item.qty);
                        handleCancel();
                     }}>
                        <img src={item.image} alt={item.name} />
                     </div>
                  </Link>
                  
                  <div className="cart-item-content">
                     <div className="cart-name">{item.name}</div>
                     <div className="product-qty">
                        數量: {"   "}
                        <Select
                           defaultValue={item.qty}
                           value={item.qty}
                           className="select-style"
                           onChange={(qty) => addcartItem(dispatch, item, qty)}
                        >
                           {[...Array(item.countInStock).keys()].map((x) => (
                              <Option key={x + 1} value={x + 1}>
                                 {x + 1}
                              </Option>
                           ))}
                        </Select>
                     </div>
                  </div>
                  <div className="cart-item-end">
                     <div className="cart-item-delete" onClick={()=>removeCartItem(dispatch, item.id)}>
                        <p>X 取消商品</p>
                     </div>
                     <div className="cart-price">
                        NT.{item.price * item.qty}    
                     </div>
                     
                  </div>

               </li>
            ))
        )}
        <div className="cart-total-price-wrap">
           總金額
            <div className="cart-total-price">NT.{getTotalPrice()}</div>
        </div>
        <Button 
            className="cart-modal-btn" 
            type="primary"
            onClick={checkoutHandler}
        >
            <i class="fas fa-shopping-bag fa-lg" />
            <span style={{marginLeft: 12}}>準備結帳</span>
        </Button>
      </Modal>
   );
}