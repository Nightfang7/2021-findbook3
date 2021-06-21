import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Button } from "antd";
import { addOrdertoFirebase } from "../action"
import { StoreContext } from "../store";

export default function PlaceOrderCard() {
  const { state: { cart, orderInfo: { success, order } }, dispatch } = useContext(StoreContext);
  const { cartItems } = cart;
  const history = useHistory()

  const placeOrderHandler = () => {
    addOrdertoFirebase(dispatch, cart)
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
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice;

  useEffect(() => {
    if(success) {
      history.push(`/order/${order.id}`);
    }
  }, [success]);

  return (
    <Row gutter={[24, 24]} className="content-summary-card"> 
      <Col
        xs={{ span: 20, offset: 2 }}
        lg={{ span: 9, offset: 3 }}
        className = "bg-summary-card"
      >
        <div className="card card-body">
          <h2 style={{ color: '#253237', fontWeight:'bold', fontSize:'25px' }}>購買的商品</h2>
          {cartItems.length === 0 ? (
            <div>沒有商品訂單!</div>
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
            <div className="cart-total-price">NT.{getTotalPrice()}</div>
          </div>
        </div>

        <div className="line"></div>

        <div className="card card-body">
          <h2 style={{ color: '#253237' , fontWeight:'bold', fontSize:'25px'}}>購買資訊</h2>
          <p>
            <strong>姓名:</strong> {cart.shippingAddress.fullName} <br />
            <strong>地址: </strong> {cart.shippingAddress.address},
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  ,{cart.shippingAddress.country}
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
      <Col className="summary-info-right"
        xs={{ span: 20, offset: 2 }}
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
          <Button
            className="primary-btn"
            block
            type="primary"
            onClick={placeOrderHandler}
          >
            <p>完成訂單</p>
         </Button>
        </div>

      </Col>
    </Row>

  );
}

