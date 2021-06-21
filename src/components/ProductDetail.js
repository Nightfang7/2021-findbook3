import React, { useState, useContext } from 'react'
import { Row, Col, Spin } from "antd";
import { Select, Rate } from 'antd';
import AddToCart from './AddToCart';
import { LoadingOutlined } from '@ant-design/icons';
import { StoreContext } from "../store"
import { setProductDetail } from "../action";
import { Image } from 'antd';

const { Option } = Select;
const desc = [ '1', '2', '3', '4', '5'];

function ProductDetail() {
    const { state: { productDetail: { product, qty} , requestProducts: { loading } }, dispatch } = useContext(StoreContext);
    const antIcon = <LoadingOutlined style={{ fontSize: 80, color: "#E26D5C" }} spin />;
    //const [qty, setQty] = useState(product.countInStock > 0 ? 1 : 0);
    const [value, setValue] = useState(3);
    //const handlechangeStar = value => setValue(value);
    
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
                    <Col className="product-image-info"
                        lg={{ span: 8, offset: 4}}
                    >
                        <div className="product-image">
                            <img
                                className="product-image-big"
                                src={product.image}
                                alt={product.name1}
                            />
                        </div>
                        <div >
                            <Row gutter={[6,6]}>
                                <Col className="gutter-row" lg={{span:6}} sm={{ span: 12}}>
                                    <Image className="product-image-reading"
                                            width={80}
                                            src={product.image1}
                                        />
                                </Col>
                                <Col className="gutter-row" lg={{span:6}} sm={{ span: 12}}>
                                    <Image className="product-image-reading"
                                            width={80}
                                            src={product.image2}
                                        />
                                </Col>
                                <Col className="gutter-row" lg={{span:6}} sm={{ span: 12}}>
                                    <Image className="product-image-reading"
                                            width={80}
                                            src={product.image3}
                                        />
                                </Col>
            
                            </Row>
                            
                            

                        </div>
                            
                    </Col>
                    <Col
                        lg={{ span: 8 , offset: 1}} sm={{ span: 12}}
                    >
                        <div className="product-info--detail">
                            <h2>
                                {product.name1}{product.name2}
                            </h2>
                            <div className="product-info--wrap">
                                <h3>作者: {product.author}</h3>
                            </div>
                            <div className="product-price-wrap">
                                <p className="product-price product-price--large">
                                    NT.{product.price}
                                </p>
                                <p className="product-status">
                                    狀態: {product.countInStock > 0 ? "有庫存" : "暫時缺貨"}
                                </p>
                                <div className="product-detail-info">
                                    <div>
                                        <p>{product.bookinfo1}</p>
                                        <p>{product.bookinfo2}</p>
                                        <p>{product.bookinfo3}</p>
                                        <p>{product.bookinfo4}</p>
                                        <p>{product.bookinfo5}</p>
                                        <p>{product.bookinfo6}</p>
                                    </div>
                                </div>
                                
                                <div className="product-shop">
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
                                    <p className="product-money">
                                        總金額: {product.price * qty}
                                    </p>
                                    

                                </div>                                      
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
