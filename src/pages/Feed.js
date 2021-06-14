import { Layout } from 'antd';
import AppHeader from "../components/Header"
import AppFooter from "../components/Footer"
import Feeder from '../components/Feeder';

const { Header, Content, Footer } = Layout;

function Feed() {
    
    return (
      <Layout>
        <Header className="layout-header">
          <AppHeader />
        </Header>
        <Content className="layout-content">
          <Feeder />
        </Content>
        <Footer className="layout-footer">
          <AppFooter/>  
        </Footer>      
      </Layout>
    );
  }

  export default Feed;