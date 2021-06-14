import React from 'react'
import { Layout } from 'antd';
import AppHeader from "../components/Header"
import AppFooter from "../components/Footer"
import ProfileCard from '../components/ProfileCard';



const { Header, Content, Footer } = Layout;

function profile() {
    return (
        <Layout>
            <Header className="layout-header">
             <AppHeader />
            </Header>
            <Content className="layout-content">
             <ProfileCard />
            </Content>
            <Footer className="layout-footer">
             <AppFooter/>  
            </Footer>      
        </Layout>
    )
}

export default profile
