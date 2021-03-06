import { createContext } from "react";
import useReducerWithThunk from 'use-reducer-thunk';
import products from "../json/products.json";
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
    LOGOUT_REQUEST,
    REMEMBER_LOGIN,
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

export const StoreContext = createContext();  
let cartItems = localStorage.getItem("cartItems")
? JSON.parse(localStorage.getItem("cartItems"))
: [];

const initialState = {
    page: {
       title: "全部商品",
       products,
    },
    producttype1:{
      products
    },
    producttype2:{
      products
    },
    productDetail: {
        product: {},
        qty: 1,
    },
    navBar: {
       activeItem: "/store",
    },
    cart: {
        cartItems:[],
        shippingAddress: localStorage.getItem('shippingAddress')
          ? JSON.parse(localStorage.getItem('shippingAddress'))
          : {},
        paymentMethod: 'Google',
    },
    orderInfo: { 
        loading: false,
        order: localStorage.getItem('orderInfo')
        ? JSON.parse(localStorage.getItem('orderInfo'))
        : { id: "" },
        success: false,
        error: null,
      },
    feedProducts: {
        loading: false,
        error: null,
    },
    requestProducts: {
        loading: false,
        error: null,
    },
    userSignin: {
        loading: false,
        userInfo: localStorage.getItem("userInfo")
          ? JSON.parse(localStorage.getItem("userInfo"))
          : null,
        error: "",
    },
    userRegister: {
        loading: false,
        userInfo: null,
        error: "",
    },
    searchOrderDetailByUid: {
      loading: false,
      order: [],
      error: null,
      tapOrNot:false
    },
 };

 function reducer(state, action){
     console.log(action)
     console.log(state)
     switch (action.type) {
        case SET_STOREPAGE_TITLE:
            return {
                ...state,
                page: {
                ...state.page,
                title: action.payload
                },
            };
        case SET_STOREPAGE_CONTENT:
          const allproducts = state.page.products;
          console.log( state.page.products)
          const producttype1 = allproducts.filter(product => product.category == "最新上架" )
          console.log( producttype1 )
          const producttype2 = allproducts.filter(product => product.category == "TOP熱銷" )
          console.log( producttype2 )
            return {
                ...state,
                page: action.payload,
                producttype1:{
                  products : producttype1
                },
                producttype2:{
                  products : producttype2
                }
            };
        case SET_PRODUCTNAVBAR_ACTIVEITEM:
            return {
                ...state,
                navBar: {
                    activeItem: action.payload
                }
            }
        case ADD_CART_ITEM:
            const item = action.payload;
            const product = state.cart.cartItems.find((x) => x.id === item.id);
            if (product) {
                cartItems = state.cart.cartItems.map((x) =>
                x.id === product.id ? item : x
                );
                return { ...state,  cart: { ...state.cart, cartItems } };
            }
            cartItems = [...state.cart.cartItems, item];
            return { ...state,  cart: { ...state.cart, cartItems } };
        case REMOVE_CART_ITEM:
            cartItems = state.cart.cartItems.filter((x) => x.id !== action.payload);
            return { ...state,  cart: { ...state.cart, cartItems } };
        case EMPTY_CART:
            cartItems = [];
            return { ...state, cart: { ...state.cart, cartItems }};
        case SAVE_SHIPPING_ADDRESS:
            console.log('action.payload.shippingAddress = ')
            console.log(action.payload)
            return { ...state, cart: { ...state.cart, shippingAddress: action.payload } };
        case SAVE_PAYMENT_METHOD:
            return { ...state, cart: { ...state.cart, paymentMethod: action.payload } };
        case SET_PRODUCT_DETAIL:
            return { ...state, productDetail: { ...state.productDetail, ...action.payload} };
        case BEGIN_PRODUCTS_REQUEST:
            return { ...state, requestProducts: { ...state.requestProducts, loading: true } }
        case SUCCESS_PRODUCTS_REQUEST:
            return { ...state, requestProducts: { ...state.requestProducts, loading: false } }
        case FAIL_PRODUCTS_REQUEST:
            return { ...state, requestProducts: { ...state.requestProducts, loading: false, error: action.payload } }
        case BEGIN_PRODUCTS_FEED:
            return { ...state, feedProducts: { ...state.feedProducts, loading: true } }
        case SUCCESS_PRODUCTS_FEED:
            return { ...state, feedProducts: { ...state.feedProducts, loading: false } }
        case FAIL_PRODUCTS_FEED:
            return { ...state, feedProducts: { ...state.feedProducts, loading: false, error: action.payload } }
        case BEGIN_LOGIN_REQUEST:
            return { ...state, userSignin: { ...state.userSignin, loading: true } };
        case SUCCESS_LOGIN_REQUEST:
            return {
              ...state,
              userSignin: {
                ...state.userSignin,
                loading: false,
                userInfo: action.payload,
                error: "",
              },
            };
        case FAIL_LOGIN_REQUEST:
            return {
              ...state,
              userSignin: {
                ...state.userSignin,
                loading: false,
                userInfo: null,
                error: action.payload,
              },
            };
        case BEGIN_UPDATE_USERINFO:
            return { ...state, userSignin: { ...state.userSignin, loading: true } };
        case SUCCESS_UPDATE_USERINFO:
            return {
              ...state,
              userSignin: {
                ...state.userSignin,
                loading: false,
                userInfo: action.payload,
                error: "",
              },
            };
        case FAIL_UPDATE_USERINFO:
            return {
              ...state,
              userSignin: {
                ...state.userSignin,
                loading: false,
                error: action.payload,
              },
            };
        case LOGOUT_REQUEST:
            cartItems = [];
            state.searchOrderDetailByUid.order=[];
            state.searchOrderDetailByUid.tapOrNot=false;
            return {
              ...state,
              cartItems,
              userSignin: {
                ...state.userSignin,
                userInfo: null,
              },
            };    
        case REMEMBER_LOGIN:
            return {
              ...state,
              userSignin: {
                ...state.userSignin,
                remember: action.payload,
              },
            };
        case BEGIN_REGISTER_REQUEST:
            return { 
              ...state, 
              userRegister: { ...state.userRegister, loading: true } 
            };
        case SUCCESS_REGISTER_REQUEST:
            return {
              ...state,
              userRegister: {
                ...state.userRegister,
                loading: false,
                userInfo: action.payload,
                error: "",
              },
              userSignin: {
                ...state.userSignin,
                userInfo: action.payload,
              }
            };
        case FAIL_REGISTER_REQUEST:
            return {
              ...state,
              userRegister: {
                ...state.userRegister,
                loading: false,
                userInfo: null,
                error: action.payload,
              },
            };
        case BEGIN_ORDER_CREATE:
            return { 
              ...state, 
              orderInfo: { 
                ...state.orderInfo, 
                loading: true, 
                success: false,
              } 
            };
        case SUCCESS_ORDER_CREATE:
            return {
              ...state,
              orderInfo: {
                ...state.orderInfo,
                loading: false,
                order: action.payload,
                success: true,
                error: null,
              },
            };
        case FAIL_ORDER_CREATE:
            return {
              ...state,
              orderInfo: {
                ...state.orderInfo,
                loading: false,
                order: {id:""},
                success: false,
                error: action.payload,
              },
            };
        case RESET_ORDER_CREATE:
          return {
            ...state,
            orderInfo: {
              ...state.orderInfo,
              loading: false,
              order: { id: "" },
              success: false,
            },
          };
        case BEGIN_ORDER_DETAILS:
          return {
            ...state,
            orderDetail: {
              ...state.orderDetail,
              loading: true,
            }
          };
        case SUCCESS_ORDER_DETAILS:
          return {
            ...state,
            orderDetail: {
              ...state.orderDetail,
              loading: false,
              order: action.payload,
            },
          };
        case FAIL_ORDER_DETAILS:
          return {
            ...state,
            orderDetail: {
              ...state.orderDetail,
              loading: false,
              error: action.payload,
            },
          };
          case GET_ORDERLIST_BY_UID:
          return{
            ...state,
            searchOrderDetailByUid: {
              ...state.searchOrderDetailByUid,
              loading: true,
              tapOrNot:true
          }
        };
        case FAIL_ORDERLIST:
          return{
            ...state,
            searchOrderDetailByUid: {
              ...state.searchOrderDetailByUid,
              loading: false,
              error:action.payload
          }
        };
          case SUCCESS_ORDERLIST:
            console.log("sucess")
            return {
              ...state,
          searchOrderDetailByUid: {
            ...state.searchOrderDetailByUid,
            loading: false,
            order: action.payload,
            error: null,
          }
        };
        default:
        return state;
    }
 }

export function StoreProvider(props) {
    const [state, dispatch] = useReducerWithThunk(reducer, initialState, "example");
    const value = { state, dispatch };
    return (
        <StoreContext.Provider value={value}>
            {props.children}
        </StoreContext.Provider>
    );
}