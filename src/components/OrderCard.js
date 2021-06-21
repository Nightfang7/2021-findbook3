import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import GooglePayButton from '@google-pay/button-react';
import { savePaymentMethod } from "../action"
import { StoreContext } from "../store";

export default function OrderCard() {
   const { state: { cart, orderInfo: { loading } }, dispatch } = useContext(StoreContext);
   const { cartItems } = cart;
   const history = useHistory()
   const antIcon = <LoadingOutlined style={{ fontSize: 80, color: "#8183ff" }} spin />;

   const paymentRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: "CARD",
          parameters: {
            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            allowedCardNetworks: ["MASTERCARD", "VISA"]
          },
          tokenizationSpecification: {
            type: "PAYMENT_GATEWAY",
            parameters: {
              gateway: "example"
            }
          }
        }
      ],
      merchantInfo: {
        merchantId: "12345678901234567890",
        merchantName: "Demo Merchant"
      },
      transactionInfo: {
        totalPriceStatus: "FINAL",
        totalPriceLabel: "Total",
        totalPrice: String(cart.totalPrice),
        currencyCode: "USD",
        countryCode: "US"
      }
    };


   const placeOrderHandler = (values) => {
      console.log(values)
      savePaymentMethod(dispatch, values)
      history.push('/order');
   };

   const getTotalPrice = () => {
      return (cartItems.length > 0) ?
         cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
         : 0;
   }

   const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
   cart.itemsPrice = toPrice(
      cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
   );
   cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
   cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
   cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;


   return (
      <>
         {loading
            ? (
               <div className="spinner-wrap">
                  <Spin indicator={antIcon} className="spinner" />
               </div>
            ) : (
               <Row className="content-summary-card" gutter={[24, 24]}>
                  <Col
                     className = "bg-summary-card"
                     xs={{ span: 20, offset: 2 }}
                     lg={{ span: 9, offset: 4 }}
                  >
                     <div className="card card-body">
                     <h2 style={{ color: '#253237', fontWeight:'bold', fontSize:'25px' }}>購買的商品</h2>
                        {cartItems.length === 0 ? (
                           <div>購物清單是空的喔!</div>
                        ) : (
                           cartItems.map(item => (
                              <li key={item.id} className="cart-item">
                                 <div className="cart-image">
                                    <img src={item.image} alt={item.name} />
                                 </div>
                                 <div className="cart-item-content">
                                    <div className="cart-name">{item.name}</div>
                                    <div className="product-qty">
                                    數量: {item.qty}
                                    </div>
                                 </div>
                                 <div className="cart-item-end">
                                    <div className="cart-price">
                                    NT.{item.price * item.qty}
                                    </div>
                                 </div>

                              </li>
                           ))
                        )}
                        <div className="cart-total-price-wrap">
                           總額:
                           <div className="cart-total-price">NT. {getTotalPrice()}</div>
                        </div>
                     </div>

                     <div className="line"></div>

                     <div className="card card-body">
                        <h2 style={{ color: '#253237' , fontWeight:'bold', fontSize:'25px'}}>購買資訊</h2>
                        <p>
                           <strong>姓名:&nbsp;</strong> {cart.shippingAddress.fullName} <br />
                           <strong>郵遞區號:&nbsp;</strong> {cart.shippingAddress.postalCode} <br />
                           <strong>地址:&nbsp;</strong> {cart.shippingAddress.city}{cart.shippingAddress.address}
                            
                        </p>
                     </div>

                     <div className="line"></div>

                     <div className="card card-body">
                        <h2 style={{ color: '#253237' , fontWeight:'bold', fontSize:'25px'}}>付費資訊</h2>
                        <p>
                           <strong>付款方式:</strong> {cart.paymentMethod}
                        </p>
                     </div>
                     

                  </Col>
                  <Col
                     xs={{ span: 22, offset: 1 }}
                     lg={{ span: 7, offset: 1 }}
                  >
                     <div className="card card-body bg-summary-card">
                     <h2 style={{ color: '#253237' , fontWeight:'bold', fontSize:'25px' }}>商品資訊</h2>
                     <div className="summmary-info">
                        <div>商品總額:</div>
                        <div>NT.{cart.itemsPrice}</div>
                     </div>
                     <div className="summmary-info">
                        <div>運費</div>
                        <div>NT.{cart.shippingPrice}</div>
                     </div>
                     <div className="line"></div>
                     <div className="summmary-info">
                        <div>
                        <strong>最後總額:</strong>
                        </div>
                        <div>
                        <strong>NT.{cart.totalPrice}</strong>
                        </div>
                     </div>
                        <GooglePayButton
                           className="btn-google"
                           environment="TEST"
                           buttonColor="black"
                           paymentRequest={paymentRequest}
                           onLoadPaymentData={paymentRequest => {
                              console.log('load payment data', paymentRequest);
                              history.push('/');
                           }}
                        />
                     </div>

                  </Col>
               </Row>

            )

         }
      </>


   );
}

