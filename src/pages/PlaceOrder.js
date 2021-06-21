import React from 'react'
import { Layout } from 'antd';
import AppHeader from "../components/Header"
import AppFooter from "../components/Footer"
import CheckoutSteps from '../components/CheckoutSteps';
import PlaceOrderCard from '../components/PlaceOrderCard';


const { Header, Content, Footer } = Layout;

function PlaceOrder() {
    return (
        <Layout>
            <Header className="layout-header">
             <AppHeader />
            </Header>
            <Content className="bg-login">
                <div className="shopping-title">
                    <h1>購物步驟</h1>
                </div>
                <CheckoutSteps step1 step2 step3 step4/>
                <PlaceOrderCard />
            </Content>
            <Footer className="layout-footer">
             <AppFooter/>  
            </Footer>      
        </Layout>
    )
}

export default PlaceOrder
