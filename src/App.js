import {
  DesktopOutlined,
  FormOutlined,
  FileOutlined,
  UserOutlined,
  TagsOutlined,
  SearchOutlined,
  SettingOutlined,
  PlayCircleOutlined
} from '@ant-design/icons';

import { Layout, Menu } from 'antd';
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
  getItem('Página Inicial', 'menu1', <Link to={"/"} ><DesktopOutlined /></Link>),
  getItem('Cadastros', 'menu2', <FormOutlined />, [
    getItem('Gêneros', 'subMenu1', <Link to={"/genero"} ><TagsOutlined /></Link>),
    getItem('Filmes', 'subMenu2', <Link to={"/filme"} ><PlayCircleOutlined /></Link>),
    getItem('Clientes', 'subMenu3', <Link to={"/cliente"} ><UserOutlined /></Link>),
  ]),
  getItem('Locação', 'menu3', <Link to={"/locacao"} ><SearchOutlined /></Link>),
  getItem('Relatórios', 'menu4', <Link to={"/relatorio"} ><FileOutlined /></Link>),
  getItem('Configurações', 'menu5', <Link to={"/config"} ><SettingOutlined /></Link>),
];




const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['']} defaultOpenKeys={['menu2']} mode="inline" items={items} selectable={false} />
      </Sider>

      <Layout className="site-layout">
        <Header
          // className="site-layout-background"
          style={{ padding: 0 }}
        />
        <Content className="site-layout-background" style={{ margin: '16px 16px' }} >
          <div style={{ padding: 24, minHeight: 360, }} >
            <Rotas />{/* Aqui será renderizado o componente da tela atual */}
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