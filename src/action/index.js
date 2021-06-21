import {
    SET_STOREPAGE_TITLE,
    SET_STOREPAGE_CONTENT,
    SET_PRODUCTNAVBAR_ACTIVEITEM,
    ADD_CART_ITEM,
    REMOVE_CART_ITEM, 
    EMPTY_CART,
    SAVE_SHIPPING_ADDRESS,
    SAVE_PAYMENT_METHOD,
    SET_PRODUCT_DETAIL,
    BEGIN_PRODUCTS_FEED,
    SUCCESS_PRODUCTS_FEED,
    FAIL_PRODUCTS_FEED,
    BEGIN_PRODUCTS_REQUEST,
    SUCCESS_PRODUCTS_REQUEST,
    FAIL_PRODUCTS_REQUEST,
    BEGIN_LOGIN_REQUEST,
    SUCCESS_LOGIN_REQUEST,
    FAIL_LOGIN_REQUEST,
    REMEMBER_LOGIN,
    LOGOUT_REQUEST,
    BEGIN_REGISTER_REQUEST,
    SUCCESS_REGISTER_REQUEST,
    FAIL_REGISTER_REQUEST,
    BEGIN_UPDATE_USERINFO,
    SUCCESS_UPDATE_USERINFO,
    FAIL_UPDATE_USERINFO,
    BEGIN_ORDER_CREATE,
    SUCCESS_ORDER_CREATE,
    FAIL_ORDER_CREATE,
    RESET_ORDER_CREATE,
    BEGIN_ORDER_DETAILS,
    SUCCESS_ORDER_DETAILS,
    FAIL_ORDER_DETAILS,
    SUCCESS_ORDERLIST,
    FAIL_ORDERLIST,
    GET_ORDERLIST_BY_UID
} from "../util/constants"
import { 
    getProducts, 
    getProductById, 
    feedProducts,
    signInWithEmailPassword,
    registerWithEmailPassword,
    signOut,
    updateUserInfoApi, 
    getOrderById,
    getOrderByUser,
    addOrderApi
    
} from "../api";

export const addcartItem = (dispatch, product, qty) => {
    const item = {
        id: product.id,
        name: product.name1,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty,
    };
    dispatch({
        type: ADD_CART_ITEM,
        payload: item,
    });
};

export const removeCartItem = (dispatch, productId) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: productId,
    });
};

export const saveShippingAddress = (dispatch, shippingAddress) => {
    dispatch({
      type: SAVE_SHIPPING_ADDRESS,
      payload: shippingAddress,
    });
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
  }
  
export const savePaymentMethod = (dispatch, paymentMethod) => {
    dispatch({
      type: SAVE_PAYMENT_METHOD,
      payload: paymentMethod.paymentMethod,
    });
}

export const feedJSONToFirebase = async (dispatch) => {
    dispatch({ type: BEGIN_PRODUCTS_FEED });
    try {
      await feedProducts();
      dispatch({ type: SUCCESS_PRODUCTS_FEED });
    } catch (error) {
      console.log(error);
      dispatch({ type: FAIL_PRODUCTS_FEED, payload: error });
    }
  }

  export const setProductDetail = async (dispatch, productId, qty) => {
    dispatch({ type: BEGIN_PRODUCTS_REQUEST });
    try {
      const product = await getProductById(productId);
      if (qty === 0)
        dispatch({
          type: SET_PRODUCT_DETAIL,
          payload: {
            product,
          }
        })
      else
        dispatch({
          type: SET_PRODUCT_DETAIL,
          payload: {
            product,
            qty,
          }
        })    
      dispatch({ type: SUCCESS_PRODUCTS_REQUEST });
    } catch (error) {
      console.log(error);
      dispatch({ type: FAIL_PRODUCTS_REQUEST, payload: error });
    }
  }

export const setPage = async (dispatch, url, title) => {
    let products = [];
    dispatch({ type: BEGIN_PRODUCTS_REQUEST });
    dispatch({
      type: SET_STOREPAGE_TITLE,
      payload: title,
    });
    try {
      products = await getProducts(url);
      dispatch({
        type: SET_STOREPAGE_CONTENT,
        payload: { title, products },
      });
      dispatch({
        type: SET_PRODUCTNAVBAR_ACTIVEITEM,
        payload: url,
      });
      dispatch({ type: SUCCESS_PRODUCTS_REQUEST });
    } catch (error) {
      console.log(error);
      dispatch({ type: FAIL_PRODUCTS_REQUEST, payload: error });
    }
}

export const loginToFirebase = async (dispatch, userInfo) => {
    dispatch({ type: BEGIN_LOGIN_REQUEST });
    try {
      const user = await signInWithEmailPassword(userInfo.email, userInfo.password);
      dispatch({
        type: SUCCESS_LOGIN_REQUEST,
        payload: user.user.providerData[0],
      })
      return user;
    } catch (e) {
      dispatch({
        type: FAIL_LOGIN_REQUEST,
        payload: e.message
      })
      console.log(e)
      return null;
    }
  }

  export const rememberLoginUser = (dispatch, remember) => {
    dispatch({
      type: REMEMBER_LOGIN,
      payload: remember,
    })
  }
  
  export const registerToFirebase = async (dispatch, userInfo) => {
    dispatch({ type: BEGIN_REGISTER_REQUEST });
    try {
      const user = await registerWithEmailPassword(userInfo.email, userInfo.password, userInfo.name);
      console.log(user)
      dispatch({
        type: SUCCESS_REGISTER_REQUEST,
        payload: user.providerData[0],
      })
      return user;
    } catch (e) {
      dispatch({
        type: FAIL_REGISTER_REQUEST,
        payload: e.message
      })
      console.log(e)
      return null;
    }
  }

  export const updateUserInfo = async (dispatch, userInfo) => {
    dispatch({ type: BEGIN_UPDATE_USERINFO });
    try {
      const user = await updateUserInfoApi(
        userInfo.email,
        userInfo.password,
        userInfo.name
      );
      dispatch({
        type: SUCCESS_UPDATE_USERINFO,
        payload: user.providerData[0],
      });
    } catch (e) {
      dispatch({
        type: FAIL_UPDATE_USERINFO,
        payload: e.message,
      });
      console.log(e);
    }
  };
  
  export const logoutFromFirebase = async (dispatch) => {
    signOut();
    dispatch({ type: LOGOUT_REQUEST });
  }


  export const addOrdertoFirebase = async (dispatch, cart) => {
    dispatch({ type: BEGIN_ORDER_CREATE });
    try {
      const item = {
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      };    
      const orderInfo = await addOrderApi(item);
      dispatch({ 
        type: SUCCESS_ORDER_CREATE, 
        payload: orderInfo 
      });
      dispatch({ type: EMPTY_CART,})
      localStorage.setItem('orderInfo', JSON.stringify(orderInfo));
      localStorage.removeItem("cartItems");
      return orderInfo;
    } catch (error) {
      console.log(error);
      dispatch({ type: FAIL_ORDER_CREATE, payload: error });
      return null;
    }  
  
  
  };

  export const requestOrderDetail = async (dispatch, orderId) => {
    dispatch({ type: BEGIN_ORDER_DETAILS });
    try {
      const order = await getOrderById(orderId);
      dispatch({ 
        type: SUCCESS_ORDER_DETAILS,
        payload: order
      });
    } catch (error) {
      dispatch({ 
        type: FAIL_ORDER_DETAILS, 
        payload: error 
      });
    }
  }
  
  export const requestOrderID = async (dispatch) => {
    dispatch({ type: GET_ORDERLIST_BY_UID });
    try {
      const order = await getOrderByUser();
      dispatch({ 
        type: SUCCESS_ORDERLIST,
        payload: order
      });
    } catch (error) {
      dispatch({ 
        type: FAIL_ORDERLIST, 
        payload: error 
      });
    }
  }

  export const resetOrder = (dispatch) => {
    dispatch({ type: RESET_ORDER_CREATE });
  }
// export const setStorepageContent = (dispatch, title, products) => {
//     dispatch({
//         type: SET_STOREPAGE_CONTENT,
//         payload: {title, products},
//     });
// };


// export const setActiveProductNavbar = (dispatch, activeNavItem) => {
//     dispatch({
//       type: SET_PRODUCTNAVBAR_ACTIVEITEM,
//       payload: activeNavItem,
//     });
//   };