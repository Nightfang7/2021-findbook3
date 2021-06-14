import React, { useContext } from 'react'
import { notification } from "antd"
import { StoreContext } from "../store"
import { ADD_CART_ITEM } from "../util/constants"

function ProductShoppingbag({ product, qty }) {
    const { dispatch } = useContext(StoreContext);

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
        dispatch({
          type: ADD_CART_ITEM,
          payload: {
            id: product.id,
            name: product.name1,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            qty,
          },
        });
     };
    return (
        <div className="product-shopbag" onClick={addToCart}>
            <i class="fas fa-shopping-bag fa-lg" />
        </div>
    )
}

export default ProductShoppingbag
