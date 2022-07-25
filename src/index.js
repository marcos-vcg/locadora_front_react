import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// CSS do AntDesign para fonts, tamanhos e outros padrões
import 'antd/dist/antd.css';

// configurações padrão de datas e textos do ingles para o portugues.
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';

// import para navegação ente as rotas do navegador
import history from "./services/history";
import { BrowserRouter } from "react-router-dom";



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ConfigProvider locale={ptBR}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>


);