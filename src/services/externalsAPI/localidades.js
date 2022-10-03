import axios from "axios";



const SERVER_URL = "https://servicodados.ibge.gov.br/api/v1/localidades"


const api = axios.create({
    baseURL: SERVER_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});



export const ServiceLocalidades = {


    getAllEstados: () => {
        return api.get("/estados?orderBy=nome").then(response => {
            response.data = response.data.map(estado => ({
                id: estado.id,
                nome: estado.nome,
            }));

            return response
        });
    },

    getEstado: id => {
        return api.get(`/estados/${id}`);
    },

    getAllMunicipiosDoEstado: id => {
        return api.get(`/estados/${id}/municipios?orderBy=nome`).then(response => {
            response.data = response.data.map(municipio => ({
                id: municipio.id,
                nome: municipio.nome,
            }));

            return response
        });
    },

    getMunicipio: id => {
        return api.get(`/municipios/${id}`);
    },


};