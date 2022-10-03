import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Select from "../../components/SelectAnt";
import { Form, Col, Row } from "antd";
import CabecalhoForm from "../../components/CabecalhoForm";
import { CLIENT_URL } from "../../config";
import InputText from "../../components/InputText";
import InputDate from "../../components/InputDate";
import { ServiceCliente } from "../../services/cliente";
import { ServiceLocalidades } from "../../services/externalsAPI/localidades";
import moment from 'moment';
import { formataDataParaEditarForm } from "../../util/formatacao"




export default function FilmeForm(props) {
    const [cliente, setCliente] = useState([]);
    const [estadosList, setEstadosList] = useState([])
    const [cidadesList, setCidadesList] = useState([])
    const { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();




    useEffect(() => {
        carregarDados()
    }, [id])




    useEffect(() => {
        form.setFieldsValue({
            nome: cliente?.nome,
            cpf: cliente?.cpf,
            telefone: cliente?.telefone,

            nascimento: cliente?.nascimento,
            //nascimento: moment(cliente?.nascimento, "YYYY-MM-DD"),


            //nascimento: moment('01/01/2021', "DD-MM-YYYY"),
            //nascimento: cliente?.nascimento,
            //nascimento: new Date(),
            cep: cliente?.cep,
            // estado: cliente?.estado?.id,
            // cidade: cliente?.cidade?.id,
            estado: cliente?.estado,
            cidade: cliente?.cidade,
            endereco: cliente?.endereco,
            complemento: cliente?.complemento,
        });
    }, [cliente]);





    return (
        <Col span={24}>
            <Form layout={"vertical"} form={form} onFinish={enviar}>
                <CabecalhoForm
                    title={id ? "Editar Cliente" : "Novo Cliente"}
                    onBack={"/cliente"}
                    onClickSalvar={() => form.submit()}
                />
                <br />
                <Row gutter={24}>
                    <Col span={12}>
                        <InputText
                            name="nome"
                            label={"Nome"}
                            placeholder={"Nome"}
                            required
                        >
                        </InputText>
                    </Col>
                    <Col span={6}>
                        <InputText
                            name="cpf"
                            label={"CPF"}
                            placeholder={"CPF"}
                            required
                        >
                        </InputText>
                    </Col>
                    <Col span={6}>
                        <InputText
                            name="telefone"
                            label={"Telefone"}
                            placeholder={"Telefone"}
                            required
                        >
                        </InputText>
                    </Col>
                </Row>
                <br />
                <Row gutter={24}>
                    <Col span={6}>
                        <InputDate
                            name="nascimento"
                            label={"Data de Nascimento"}
                            placeholder={"Data de Nascimento"}
                        >
                        </InputDate>
                    </Col>
                    <Col span={6}>
                        <InputText
                            name="cep"
                            label={"CEP"}
                            placeholder={"CEP"}
                        >
                        </InputText>
                    </Col>
                    <Col span={6}>
                        <Select
                            name="estado"
                            label={"Estado"}
                            placeholder={"Estado"}
                            list={estadosList}
                            onChange={carregarCidades}
                            required
                        >
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Select
                            name="cidade"
                            label={"Cidade"}
                            placeholder={"Cidade"}
                            list={cidadesList}
                            required
                        >
                        </Select>
                    </Col>
                </Row>
                <br />
                <Row gutter={24}>
                    <Col span={12}>
                        <InputText
                            name="endereco"
                            label={"Endereço"}
                            placeholder={"Endereço"}>
                        </InputText>
                    </Col>
                    <Col span={12}>
                        <InputText
                            name="complemento"
                            label={"Complemento"}
                            placeholder={"Complemento"}>
                        </InputText>
                    </Col>
                </Row>
            </Form>
        </Col>
    )





    async function carregarCidades(estadoId) {

        // Desmarca a Cidade Selecionada
        form.setFieldsValue({
            cidade: null,
        })

        await ServiceLocalidades.getAllMunicipiosDoEstado(estadoId).then((response) => {
            setCidadesList(response?.data)
        })
    }




    // Carregar as informações iniciais do formulário
    async function carregarDados() {

        await ServiceLocalidades.getAllEstados().then((response) => {
            setEstadosList(response?.data)
        })



        // Caso tenha um id busca no BD e preenche ele para editar
        if (id) {
            await ServiceCliente.prepararEditar(id).then((response) => {

                var clienteEditar = response?.data

                // Ajustar a data que vem do BD para o formato que o Componente DatePicker aceita receber
                clienteEditar.nascimento = formataDataParaEditarForm(clienteEditar.nascimento)
                carregarCidades(clienteEditar.estado)
                setCliente(clienteEditar)
            })

        }

    }



    // ajustes para os dados chegarem de forma adequada no back-end
    function prepararValues(values) {
        values.id = id
        // values.estado = { "id": values.estado }
        // values.cidade = { "id": values.cidade }
        console.log("DADOS", values)

        return values
    }



    // Ação a ser executada quando clicar em enviar formulário
    async function enviar(values) {

        values = prepararValues(values)


        if (id) {
            await ServiceCliente.editar(values).then(() => navigate(CLIENT_URL + "/cliente"));
        } else {
            await ServiceCliente.salvar(values).then(() => navigate(CLIENT_URL + "/cliente"));
        }
    }





}