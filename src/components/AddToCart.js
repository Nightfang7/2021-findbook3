import React, { useEffect, useContext } from 'react'
import { Button, notification } from "antd"
import { StoreContext } from "../store"
import { addcartItem } from "../action";

export default function AddToCart() {
    const { state: { cart: cartItems, productDetail: { product, qty } }, dispatch } = useContext(StoreContext);

    const openNotification = () => {
        notification.open({
            message: '購物車資訊',
            description:
                `已將數量 ${qty} 的「 ${product.name1} 」加入購物車。`,
            onClick: () => {
                console.log('Notification Clicked!');
            },
            placement: 'bottomRight',
        });
    };

    const addToCart = () => {
        openNotification();
        addcartItem(dispatch, product, qty);

     };

     useEffect(()=>{
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      }, [cartItems])

    return (
        <Button type="primary" className="btn-tocar" onClick={addToCart} >
            加入購物車
        </Button>
    )
}
