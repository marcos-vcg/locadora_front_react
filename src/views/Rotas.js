import React from "react"
import { Routes, Route } from "react-router-dom"
import { CLIENT_URL } from "../config";


import FilmeList from "./filme/list";
import FilmeForm from "./filme/form";
import GeneroForm from "./genero/form";
import GeneroList from "./genero/list";
import Home from "./home/home";




function Rotas() {
    return (
        <Routes>
            Pagina Inicial
            <Route exact path={"/"} element={<Home />} />



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
                path={CLIENT_URL + "/filme/form/:id"}
                element={<FilmeForm />}
            />
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
                path={CLIENT_URL + "/genero/form/:id"}
                element={<GeneroForm />}
            />

        </Routes>
    )
}

export default Rotas;