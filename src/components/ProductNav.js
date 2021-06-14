import React from 'react'
import { Menu } from 'antd';
import { 
    DesktopOutlined,
    PieChartOutlined,
    BookOutlined,
    RiseOutlined
} from '@ant-design/icons';
import ProductNavItems from './ProductNavItems';


export default function ProductNav() {
    const { SubMenu } = Menu;
    
    return (
        
        <Menu theme="dark"  mode="inline">
          
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <ProductNavItems to="/store" className="nav-item" activeClassName="nav-item--active">
              全部商品
            </ProductNavItems> 
          </Menu.Item>

          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <ProductNavItems to="/store/newest" className="nav-item" activeClassName="nav-item--active">
              最新上架
            </ProductNavItems>
          </Menu.Item>
        
          <SubMenu key="sub1" icon={<RiseOutlined />} title="熱烈推薦">
            <Menu.Item key="3">
              <ProductNavItems to="/store/topproduct" className="nav-item" activeClassName="nav-item--active">
                熱銷TOP
              </ProductNavItems>
            </Menu.Item>
            <Menu.Item key="4">店長推薦</Menu.Item>
          </SubMenu>
        
          <Menu.Item key="5" icon={<BookOutlined />}> 
            <ProductNavItems to="/store/taiwan" className="nav-item" activeClassName="nav-item--active">
              台灣漫畫
            </ProductNavItems>
          </Menu.Item>
        
          
          <Menu.Item key="6" icon={<BookOutlined />}>
            日本漫畫
          </Menu.Item>
            
        </Menu>
        
    );
}
