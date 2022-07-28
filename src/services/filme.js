import api from "./api"



export const ServiceFilme = {

    getTodos: () => {
        return api.get("/filme")
    },

    prepararEditar: id => {
        return api.get(`/filme/${id}`);
    },

    salvar: (entity) => {
        return api.post(`/filme`, {
            ...entity
        })
    },

    deletar: id => {
        return api.delete(`/filme/${id}`);
    },

    editar: (entity) => {
        return api.put(`/filme`, {
            ...entity
        })
    }

};