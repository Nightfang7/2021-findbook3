import React from 'react'
import { Layout } from 'antd';
import AppHeader from "../components/Header"
import AppFooter from "../components/Footer"
import CheckoutSteps from '../components/CheckoutSteps';
import ShippingAddressCard from '../components/ShippingAddressCard';

const { Header, Content, Footer } = Layout;

function Shipping() {
    return (
        <Layout>
        <Header className="layout-header">
            <AppHeader />
        </Header>
        <Content className="layout-content">
            <CheckoutSteps step1 step2></CheckoutSteps>
            <ShippingAddressCard />
        </Content>
        <Footer className="layout-footer">
            <AppFooter/>  
        </Footer>      
    </Layout>
    )
}

export default Shipping
