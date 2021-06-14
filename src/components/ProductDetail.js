import React, { useState, useContext } from 'react'
import { Row, Col, Spin } from "antd";
import { Select, Rate } from 'antd';
import AddToCart from './AddToCart';
import { LoadingOutlined } from '@ant-design/icons';
import { StoreContext } from "../store"
import { setProductDetail } from "../action";

const { Option } = Select;
const desc = [ '1', '2', '3', '4', '5'];

function ProductDetail() {
    const { state: { productDetail: { product, qty} , requestProducts: { loading } }, dispatch } = useContext(StoreContext);
    const antIcon = <LoadingOutlined style={{ fontSize: 80, color: "#E26D5C" }} spin />;
    //const [qty, setQty] = useState(product.countInStock > 0 ? 1 : 0);
    const [value, setValue] = useState(3);
    const handlechangeStar = value => setValue(value);
    
    return (
        <div className="detail-container">
            <div className="prodoct-title-content">
                <span className="product-title">
                    <i class="fas fa-angle-right title-icon"></i>
                    商品資訊
                </span>
                
            </div>
            {loading?
            (
                <div className="spinner-wrap">
                    <Spin indicator={antIcon} className="spinner" />
                </div>
            ):(
                <Row className="productdetail" >
                    <Col
                        lg={{ span: 8, offset: 2 }}
                    >
                        <img
                            className="product-image"
                            src={product.image}
                            alt={product.name1}
                        />    
                    </Col>
                    <Col
                        lg={{ span: 12 }}
                    >
                        <div className="product-info--detail">
                            <h1>
                                {product.name1}{product.name2}
                            </h1>
                            <div className="product-info--wrap">
                                <h2>作者 {}</h2>
                                <h2>收藏量 </h2>
                                <span>
                                    <Rate tooltips={desc} onChange={handlechangeStar} value={value} />
                                    {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
                                </span>
                            </div>
                            <div className="product-price-wrap">
                                <p className="product-price product-price--large">
                                    NT.{product.price}
                                </p>
                                <p className="product-status">
                                    狀態: {product.countInStock > 0 ? "有庫存" : "暫時缺貨"}
                                </p>
                                <p className="product-qty">
                                    數量: {"   "}
                                    <Select 
                                        defaultValue={qty} 
                                        className="select-style"
                                        onChange={val => setProductDetail(dispatch, product.id, val)}
                                    >
                                        {[...Array(product.countInStock).keys()].map((x) => (
                                            <Option key={x + 1} value={x + 1}>
                                            {x + 1}
                                            </Option>
                                        ))}
                                    </Select>
                                </p>
                                <p className="product-qty">
                                    總金額: {product.price * qty}
                                </p>      
                                <AddToCart />         
                            </div>
                        </div>
                    </Col>
                </Row>
            )}
            
        </div>
        
    )
}

export default ProductDetail
