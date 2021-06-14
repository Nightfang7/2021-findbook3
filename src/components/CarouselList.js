import React, { useContext } from 'react'
import { Row, Col, Spin  } from "antd";
import CarouselItem from './CarouselItem';
import { LoadingOutlined } from '@ant-design/icons';
import { StoreContext } from "../store";

function CarouselList({CarouselProducts}) {
    const { state: { requestProducts: { loading } } } = useContext(StoreContext);
    const antIcon = <LoadingOutlined style={{ fontSize: 80, color: "#E26D5C" }} spin />;
    return (
        <>
        {loading?
        (
            <div className="spinner-wrap">
                <Spin indicator={antIcon} className="spinner" />
            </div>
        ):(
            <Row justify="space-around" gutter={[16, 16]}>
                {CarouselProducts.map(product => (
                    <Col 
                    key={product.id} 
                    sm={{ span: 8 }}
                    md={{ span: 8 }}
                    lg={{ span: 6 }}
                    xl={{ span: 4 }}
                    >
                    <CarouselItem product={product} />
                    </Col>
                ))}
            </Row>
        )}
            
        </>
        
    )
}

export default CarouselList
