import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { CLIENT_URL } from "../config";


import GeneroForm from "./genero/form";
import GeneroList from "./genero/list";
import FilmeList from "./filme/list";
import FilmeForm from "./filme/form";
import ClienteList from "./cliente/list";
import ClienteForm from "./cliente/form";
import LocacaoForm from "./locacao/form";
import LocacaoList from "./locacao/list";
import Home from "./home/home";




function Rotas() {
  return (
    <Routes>
      {/* Pagina Inicial */}
      <Route exact path={"/"} element={<Home />} />



      {/* Gênero */}
      <Route
        exact
        path={CLIENT_URL + "/genero"}
        element={<GeneroList />}
      />
      <Route
        exact
        path={CLIENT_URL + "/genero/form"}
        element={<GeneroForm />}
      />
      <Route
        exact
        path={CLIENT_URL + "/genero/form/:id"}
        element={<GeneroForm />}
      />



      {/* Filme */}
      <Route
        exact
        path={CLIENT_URL + "/filme"}
        element={<FilmeList />}
      />
      <Route
        exact
        path={CLIENT_URL + "/filme/form"}
        element={<FilmeForm />}
      />
      <Route
        exact
        path={CLIENT_URL + "/filme/form/:id"}
        element={<FilmeForm />}
      />



      {/* Cliente */}
      <Route
        exact
        path={CLIENT_URL + "/cliente"}
        element={<ClienteList />}
      />
      <Route
        exact
        path={CLIENT_URL + "/cliente/form"}
        element={<ClienteForm />}
      />
      <Route
        exact
        path={CLIENT_URL + "/cliente/form/:id"}
        element={<ClienteForm />}
      />



      {/* Locação */}
      <Route
        exact
        path={CLIENT_URL + "/locacao"}
        element={<LocacaoList />}
      />
      <Route
        exact
        path={CLIENT_URL + "/locacao/form"}
        element={<LocacaoForm />}
      />
      <Route
        exact
        path={CLIENT_URL + "/locacao/form/:id"}
        element={<LocacaoForm />}
      />



      {/* Pagina Default -> Rotas Desconhecidas */}
      <Route
        path="*"
        element={<Navigate to="/" />}
      />

    </Routes>
  )
}

export default Rotas;