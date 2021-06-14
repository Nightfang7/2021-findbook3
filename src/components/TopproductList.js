import React, { useContext } from 'react'
import { Row, Col, Spin } from "antd";
import TopproductItems from './TopproductItems';
import { LoadingOutlined } from '@ant-design/icons';
import { StoreContext } from "../store";


function TopproductList( {TopProduct} ) {

    const { state: { page: { products }, requestProducts: { loading } } } = useContext(StoreContext);
    const antIcon = <LoadingOutlined style={{ fontSize: 80, color: "#E26D5C" }} spin />;

    return (
        <div className="topproduct-container">
            <div className="topproduct-title-container">
                <div className="topproduct-title">
                    TOP熱銷
                </div>
                <span className="title-line"></span>
            </div>
            {loading
            ?(
                <div className="spinner-wrap">
                    <Spin indicator={antIcon} className="spinner" />
                </div>
            ):(
                <Row className="topproductcard-container" justify="space-around" gutter={[16, 16]}>
                    {TopProduct.map(product => (
                        <Col 
                        key={product.id} 
                        sm={{ span: 12 }}
                        md={{ span: 12 }}
                        lg={{ span: 8 }}
                        xl={{ span: 4 }}
                        >
                        <TopproductItems product={product} />
                        </Col>
                    ))}
                    </Row>
            )}
            
            <div className="topproduct-title-container">
                <span className="title-line"></span>
            </div>
            
        </div>
        
    )
}

export default TopproductList
