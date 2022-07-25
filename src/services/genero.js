import api from "./api"



export const ServiceGenero = {

    getTodos: () => {
        return api.get("/genero");
    },

    prepararEditar: id => {
        return api.get(`/genero/${id}`);
    },

    salvar: (entity) => {
        return api.post(`/genero`, {
            ...entity
        })
    },

    deletar: id => {
        return api.delete(`/genero/${id}`);
    },

    editar: (entity) => {
        return api.put(`/genero/${entity.id}`, {
            ...entity
        })
    }
};