import { useContext } from "react"; 
import { Layout } from 'antd';
import AppHeader from "../components/Header"
import AppFooter from "../components/Footer"
import Homecontent from "../components/Homecontent";


const { Header, Content, Footer } = Layout;

function Home() {
    //const { state: { page: { products} } } = useContext(StoreContext);
    return (
      <Layout>
        <Header className="layout-header">
          <AppHeader />
        </Header>
        <Content className="layout-content">
          <Homecontent />
        </Content>
        <Footer className="layout-footer">
          <AppFooter/>  
        </Footer>      
      </Layout>
    );
  }

  export default Home;
