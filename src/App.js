import {
  DesktopOutlined,
  FileOutlined,
  UserOutlined,
  TagsOutlined,
  SearchOutlined,
  SettingOutlined,
  PlayCircleOutlined
} from '@ant-design/icons';

import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "./styles/app.css"
import Rotas from './views/Rotas';


const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Telas', 'menu2', <DesktopOutlined />, [
    getItem('Gêneros', 'subMenu1', <Link to={"/genero"} ><TagsOutlined /></Link>),
    getItem('Filmes', 'subMenu2', <Link to={"/filme"} ><PlayCircleOutlined /></Link>),
  ]),
  getItem('Locação', 'menu1', <SearchOutlined />),
  getItem('Clientes', 'menu3', <UserOutlined />),
  getItem('Relatórios', 'menu4', <FileOutlined />),
  getItem('Configurações', 'menu5', <SettingOutlined />),
];




const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['']} defaultOpenKeys={['menu2']} mode="inline" items={items} />
      </Sider>

      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0 }}
        />
        <Content style={{ margin: '0 16px' }} >
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Locadora</Breadcrumb.Item>
            <Breadcrumb.Item>Filmes</Breadcrumb.Item>
          </Breadcrumb>

          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360, }}
          >
            <Rotas />
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }} >
          Created by Marcos Costa ©2022
        </Footer>

      </Layout>
    </Layout>
  );
};

export default App;