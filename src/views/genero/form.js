import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import InputText from "../../components/ImputText/imputText";
import { Form, Col, Row } from "antd";
import CabecalhoForm from "../../components/CabecalhoForm/pageHeader";
import { ServiceGenero } from "../../services/genero"
import { CLIENT_URL } from "../../config";


export default function GeneroForm() {

    const { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [genero, setGenero] = useState({
        nome: ""
    });

    const { nome } = genero;

    const onInputChange = (e) => {
        setGenero({ ...genero, [e.target.name]: e.target.value })
    }



    useEffect(() => {
        getModel()
    }, [id])

    useEffect(() => {
        form.setFieldsValue({
            nome: genero?.nome,
        });
    }, [genero]);



    return (
        <Col span={24}>
            <Form layout={"vertical"} form={form} onFinish={onFinish}>
                <CabecalhoForm
                    title={id ? "Editar Genero" : "Novo Genero"}
                    onBack={"/genero"}
                    onClickSalvar={handleSubmit}
                />
                <br />
                <Row gutter={24}>
                    <Col span={24}>
                        <InputText
                            name="nome"
                            label={"Nome"}
                            placeholder={"Nome"}
                            value={nome}
                            onChange={(e) => onInputChange(e)}>
                        </InputText>
                    </Col>
                </Row>
            </Form>
        </Col>
    )


    async function onFinish(values) {
        console.log("values", values)
        if (id) {
            values.id = id
            await ServiceGenero.editar(values).then(() => navigate(CLIENT_URL + "/genero"));
        } else {
            await ServiceGenero.salvar(values).then(() => navigate(CLIENT_URL + "/genero"));
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        form.submit()
    }


    async function getModel() {

        if (id) {
            let response = await ServiceGenero.prepararEditar(id);
            console.log(response)
            setGenero(response?.data)
        }

    }

}