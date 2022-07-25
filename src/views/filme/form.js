import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Select from "../../components/SelectAnt/select";
import { Form, Col, Row } from "antd";
import CabecalhoForm from "../../components/CabecalhoForm/pageHeader";
import { ServiceFilme } from "../../services/filme"
import { CLIENT_URL } from "../../config";
import { DatePikerAnt } from "../../components/ImputDate/imputDate";
import InputText from "../../components/ImputText/imputText";


export default function FilmeForm(props) {
    const [entityInstance, setEntityInstance] = useState([]);
    const [generoList, setGeneroList] = useState([])
    const [categoriaList, setCategoriaList] = useState([])
    const { id } = props.match.params;
    const [form] = Form.useForm();
    const navigate = useNavigate();


    useEffect(() => {
        getModel()
    }, [id])

    useEffect(() => {
        form.setFieldsValue({
            nome: (entityInstance || {}).nome,
            genero: (entityInstance || {}).genero,
            categoria: (entityInstance || {}).categoria,
        });
    }, [entityInstance]);



    return (
        <Col span={20}>
            <Form layout={"vertical"} form={form} onFinish={onFinish}>
                <CabecalhoForm
                    title={id ? "Editar Filme" : "Novo Filme"}
                    onBack={"/filme"}
                    onClickSalvar={handleSubmit}
                />
                <br />
                <Row gutter={24}>
                    <Col span={24}>
                        <InputText
                            name="nome"
                            label={"Nome"}
                            placeholder={"Nome"}>
                        </InputText>
                    </Col>
                </Row>
                <br />
                <Row gutter={24}>
                    <Col span={8}>
                        <Select
                            name="genero"
                            label={"Genero"}
                            placeholder={"Genero"}
                            list={generoList}
                        >
                        </Select>
                    </Col>
                    <Col span={8}>
                        <Select
                            name="categoria"
                            label={"Categoria"}
                            placeholder={"Categoria"}
                            list={categoriaList}
                        >
                        </Select>
                    </Col>
                    <Col span={7}>
                        <DatePikerAnt
                            name="lancamento"
                            label={"Data de Lancamento"}>
                        </DatePikerAnt>
                    </Col>
                </Row>
            </Form>
        </Col>
    )


    async function onFinish(values) {
        console.log("values", values)
        if (id) {
            values.id = id
            await ServiceFilme.editar(values).then(() => navigate(CLIENT_URL + "/filme"));
        } else {
            await ServiceFilme.salvar(values).then(() => navigate(CLIENT_URL + "/filme"));
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        form.submit()
    }


    async function getModel() {
        let response
        if (id) {
            response = await ServiceFilme.prepararEditar(id)
        }
        console.log("response", response)
        console.log("generoList", response.data.generoList)
        setGeneroList(response.data.generoList)
        setCategoriaList(response.data.categoriaList)
        setEntityInstance(response.data.entityInstance)
    }

}