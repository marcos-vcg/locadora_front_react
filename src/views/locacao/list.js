import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Col, Button, Space, PageHeader, Popconfirm } from "antd";
import TabelaAnt from "../../components/TabelaAnt";
import { CLIENT_URL } from "../../config";
import { Link } from "react-router-dom";
import { ServiceFilme } from "../../services/filme";



export default function FilmeList() {
    const [filmes, setFilmes] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        carregaLista();
    }, []);



    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
        },
        {
            title: 'Descricao',
            dataIndex: 'descricao',
            key: 'descricao',
        },
        {
            title: 'Genero',
            dataIndex: 'genero',
            key: 'genero',
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
                title={"Lista de Locações"}
                onBack={() => navigate(CLIENT_URL + "/")}
                extra={[
                    <Button
                        key="1"
                        type="primary"
                        onClick={() => navigate(CLIENT_URL + "/locacao/form")}
                    >
                        Nova Locacao
                    </Button>
                ]}
            />
            <TabelaAnt
                className={"tabela"}
                columns={columns}
                dataSource={filmes?.length ? filmes : []}
            />
        </Col>
    )



    async function carregaLista() {
        await ServiceFilme.getTodos().then((response) => {

            // Percorre a lista e troca os objetos por somente seus nomes
            response.data.map((filme) => {
                filme.genero = filme.genero.nome

                return filme
            })

            setFilmes(response.data)
        });


    }

    async function deletar(id) {
        await ServiceFilme.deletar(id).then(() => carregaLista())
    }

    function prepararEditar(id) {
        return CLIENT_URL + "/locacao/form/" + id
    }
}