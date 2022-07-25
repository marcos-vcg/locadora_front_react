import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Col, Button, Space, PageHeader, Popconfirm } from "antd";
import TabelaAnt from "../../components/TabelaAnt/TabelaAnt";
import { CLIENT_URL } from "../../config";
import { Link } from "react-router-dom";
import { ServiceGenero } from "../../services/genero";



export default function GeneroList() {
    const [entities, setEntities] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        carregaLista();
    }, []);



    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
        },
        {
            title: 'Ações',
            key: 'acao',
            render: (text, record) => (
                <Space size="middle">
                    <Button>
                        <Popconfirm
                            title={"Deseja mesmo excluir?"}
                            onConfirm={() => { deletar(record.id) }}
                        >
                            Deletar
                        </Popconfirm>
                    </Button>
                    <Button>
                        <Link to={prepararEditar(record.id)}>Editar</Link>
                    </Button>
                </Space>
            ),
        },
    ];




    return (
        <Col span={24}>
            <PageHeader
                title={"Lista de Generos"}
                extra={[
                    <Button
                        key="1"
                        type="primary"
                        onClick={() => navigate(CLIENT_URL + "/genero/form")}
                    >
                        Novo Genero
                    </Button>
                ]}
            />
            <TabelaAnt
                className={"tabela"}
                columns={columns}
                dataSource={entities?.length ? entities : []}
            />
        </Col>
    )



    async function carregaLista() {
        let response = await ServiceGenero.getTodos()
        setEntities(response.data)
    }

    async function deletar(id) {
        await ServiceGenero.deletar(id).then(() => carregaLista())
    }

    function prepararEditar(id) {
        return CLIENT_URL + "/genero/form/" + id
    }
}