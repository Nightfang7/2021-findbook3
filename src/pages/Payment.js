import React from 'react'
import { Layout } from 'antd';
import AppHeader from "../components/Header"
import AppFooter from "../components/Footer"
import CheckoutSteps from '../components/CheckoutSteps';
import PaymentMethodCard from '../components/PaymentMethodCard';


const { Header, Content, Footer } = Layout;

function Payment() {
    return (
        <Layout>
            <Header className="layout-header">
             <AppHeader />
            </Header>
            <Content className="bg-login">
                <CheckoutSteps step1 step2 step3/>
                <PaymentMethodCard />
            </Content>
            <Footer className="layout-footer">
             <AppFooter/>  
            </Footer>      
        </Layout>
    )
}

export default Payment
