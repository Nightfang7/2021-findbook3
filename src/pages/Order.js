import React, { useContext } from 'react'
import { Layout } from 'antd';
import AppHeader from "../components/Header"
import AppFooter from "../components/Footer"
import OrderHeader from "../components/OrderHeader"
import OrderCard from "../components/OrderCard"
import { StoreContext } from '../store';

const { Header, Content, Footer } = Layout;

function Order( { match } ) {
    const { state: { orderInfo } } = useContext(StoreContext);

    return (
        <Layout>
            <Header className="layout-header">
             <AppHeader />
            </Header>
            <Content className="bg-login">
                <OrderHeader title={`Order: ${match.params.orderId}`} />
                <OrderCard order={orderInfo} />
            </Content>
            <Footer className="layout-footer">
             <AppFooter/>  
            </Footer>      
        </Layout>
    )
}

export default Order
