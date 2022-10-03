import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Select from "../../components/SelectAnt";
import { Form, Col, Row } from "antd";
import CabecalhoForm from "../../components/CabecalhoForm";
import { ServiceFilme } from "../../services/filme"
import { CLIENT_URL } from "../../config";
import InputText from "../../components/InputText";
import { ServiceGenero } from "../../services/genero";


export default function LocacaoForm(props) {
    const [locacao, setLocacao] = useState([]);
    const [filme, setFilme] = useState([]);
    const [generosList, setGenerosList] = useState([])
    const { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();




    useEffect(() => {
        carregarDados()
    }, [id])

    useEffect(() => {
        form.setFieldsValue({
            cliente: locacao?.cliente?.nome,
            aluguel: locacao?.aluguel,
            devolucao: locacao?.devolucao,
            filmes: locacao?.filmes,
        });
    }, [locacao]);



    return (
        <Col span={24}>
            <Form layout={"vertical"} form={form} onFinish={onFinish}>
                <CabecalhoForm
                    title={id ? "Editar Locação" : "Nova Locação"}
                    onBack={"/locacao"}
                    onClickSalvar={() => form.submit()}
                />
                <br />
                <Row gutter={24}>
                    <Col span={16}>
                        <InputText
                            name="cliente"
                            label={"Cliente"}
                            placeholder={"Cliente"}>
                        </InputText>
                    </Col>
                    <Col span={8}>
                        <Select
                            name="genero"
                            label={"Genero"}
                            placeholder={"Genero"}
                            list={generosList}
                        >
                        </Select>
                    </Col>
                </Row>
                <br />
                <Row gutter={24}>
                    <Col span={24}>
                        <InputText
                            name="descricao"
                            label={"Descricao"}
                            placeholder={"Descricao"}>
                        </InputText>
                    </Col>
                </Row>
            </Form>
        </Col>
    )



    // Ação a ser executada quando clicar em enviar formulário
    async function onFinish(values) {

        // ajustes para chegar de forma adequada no back-end
        values.id = id
        values.genero = { "id": values.genero }


        if (id) {
            await ServiceFilme.editar(values).then(() => navigate(CLIENT_URL + "/locacao"));
        } else {
            await ServiceFilme.salvar(values).then(() => navigate(CLIENT_URL + "/locacao"));
        }
    }



    // Carregar as informações iniciais do formulário
    async function carregarDados() {

        await ServiceGenero.getTodos().then((response) => { setGenerosList(response?.data) })
        id && await ServiceFilme.prepararEditar(id).then((response) => { setFilme(response?.data) })
    }

}