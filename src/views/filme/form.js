import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Select from "../../components/SelectAnt/select";
import { Form, Col, Row } from "antd";
import CabecalhoForm from "../../components/CabecalhoForm/pageHeader";
import { ServiceFilme } from "../../services/filme"
import { CLIENT_URL } from "../../config";
import InputText from "../../components/ImputText/imputText";
import { ServiceGenero } from "../../services/genero";


export default function FilmeForm(props) {
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
            nome: filme?.nome,
            descricao: filme?.descricao,
            genero: filme?.genero?.id,
        });
    }, [filme]);



    return (
        <Col span={24}>
            <Form layout={"vertical"} form={form} onFinish={onFinish}>
                <CabecalhoForm
                    title={id ? "Editar Filme" : "Novo Filme"}
                    onBack={"/filme"}
                    onClickSalvar={() => form.submit()}
                />
                <br />
                <Row gutter={24}>
                    <Col span={16}>
                        <InputText
                            name="nome"
                            label={"Nome"}
                            placeholder={"Nome"}>
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
            await ServiceFilme.editar(values).then(() => navigate(CLIENT_URL + "/filme"));
        } else {
            await ServiceFilme.salvar(values).then(() => navigate(CLIENT_URL + "/filme"));
        }
    }



    // Carregar as informações iniciais do formulário
    async function carregarDados() {

        await ServiceGenero.getTodos().then((response) => { setGenerosList(response?.data) })
        id && await ServiceFilme.prepararEditar(id).then((response) => { setFilme(response?.data) })
    }

}