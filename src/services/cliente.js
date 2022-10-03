import api from "./api"



export const ServiceCliente = {

    getTodos: () => {
        return api.get("/cliente");
    },

    prepararEditar: id => {
        return api.get(`/cliente/${id}`);
    },

    salvar: (entity) => {
        return api.post(`/cliente`, {
            ...entity
        })
    },

    deletar: id => {
        return api.delete(`/cliente/${id}`);
    },

    editar: (entity) => {
        return api.put(`/cliente`, {
            ...entity
        })
    }
};