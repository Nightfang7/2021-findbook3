import React, { useContext } from 'react'
import { Row, Col, Spin } from "antd";
import ProductItem from './ProductItem';
import { LoadingOutlined } from '@ant-design/icons';
import { StoreContext } from "../store";

function ProductList() {
    const { state: {page: { products, title }, requestProducts: { loading } } } = useContext(StoreContext);
    const antIcon = <LoadingOutlined style={{ fontSize: 80, color: "#E26D5C" }} spin />;
    console.log(products)
    console.log(title)
    return (
        <div>
            <div className="prodoct-title-content">
                <span className="product-title">
                    <i class="fas fa-angle-right title-icon"></i>
                    {title}
                </span>
            </div>
            {loading?
            (
                <div className="spinner-wrap">
                    <Spin indicator={antIcon} className="spinner" />
                </div>
            ):(
                <Row className="productlist" justify="start" gutter={[32, 32]}>
                    {products.map(product => (
                        <Col 
                        key={product.id} 
                        sm={{ span: 12 }}
                        md={{ span: 8 }}
                        lg={{ span: 8 }}
                        xl={{ span: 6 }}
                        xxl={{ span: 4 }}
                        >
                        <ProductItem product={product} />
                        </Col>
                    ))}
                </Row>
            )}
            
        </div>
        
    )
}

export default ProductList
