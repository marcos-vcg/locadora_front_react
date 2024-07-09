import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Col, Button, Space, PageHeader, Popconfirm } from "antd";
import TabelaAnt from "../../components/TabelaAnt";
import { CLIENT_URL } from "../../config";
import { Link } from "react-router-dom";
import { ServiceCliente } from "../../services/cliente";
import { ServiceLocalidades } from "../../services/externalsAPI/localidades";
import { formataCpfParaMostrarLista, formataTelefoneParaMostrarLista, formataDataParaMostrarLista, formataCepParaMostrarLista } from "../../util/formatacao";



export default function GeneroList() {
  const [clientes, setClientes] = useState([]);
  let [estados, setEstados] = useState([])
  const navigate = useNavigate();


  // Carrega os estados ao abrir pela primeira vez
  useEffect(() => {
    carregarEstados();
  }, []);

  // Carrega a lista sempre que atualizar os estados
  useEffect(() => {
    carregarLista();
  }, [estados]);



  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      align: 'center',
    },
    // {
    //     title: 'Telefone',
    //     dataIndex: 'telefone',
    //     key: 'telefone',
    //     align: 'center',
    // },
    {
      title: 'CPF',
      dataIndex: 'cpf',
      key: 'cpf',
      align: 'center',
    },
    // {
    //     title: 'Data Nascim.',
    //     dataIndex: 'nascimento',
    //     key: 'nascimento',
    //     align: 'center',
    // },
    // {
    //     title: 'CEP',
    //     dataIndex: 'cep',
    //     key: 'cep',
    //     align: 'center',
    // },
    {
      title: 'UF',
      dataIndex: 'estado',
      key: 'estado',
      align: 'center',
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
      align: 'center',
    },
  ];




  return (
    <Col span={24}>
      <PageHeader
        title={"Lista de Clientes"}
        onBack={() => navigate(CLIENT_URL + "/")}
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={() => navigate(CLIENT_URL + "/cliente/form")}
          >
            Novo Cliente
          </Button>
        ]}
      />
      <TabelaAnt
        className={"tabela"}
        columns={columns}
        dataSource={clientes}
      />
    </Col>
  )



  // Carrega todos os Estados
  async function carregarEstados() {
    await ServiceLocalidades.getAllEstados().then((response) => {
      setEstados(response.data)
    })
  }


  // Carrega a lista a ser preenchida na tabela
  async function carregarLista() {
    await ServiceCliente.getTodos().then(response => {
      let clientesList = response.data

      clientesList.map((cliente) => {
        cliente.cpf = formataCpfParaMostrarLista(cliente.cpf)
        cliente.telefone = formataTelefoneParaMostrarLista(cliente.telefone)
        cliente.nascimento = formataDataParaMostrarLista(cliente.nascimento)
        cliente.cep = formataCepParaMostrarLista(cliente.cep)
        cliente.estado = pegarNomeDoEstado(cliente.estado)
      })

      setClientes(clientesList)
    })

  }


  async function deletar(id) {
    await ServiceCliente.deletar(id).then(() => carregarLista())
  }


  function prepararEditar(id) {
    return CLIENT_URL + "/cliente/form/" + id
  }


  // Troca o id do estado pelo nome
  function pegarNomeDoEstado(id) {
    let nomeDoEstado = ""

    estados.map(estado => {
      if (estado.id == id) {
        nomeDoEstado = estado.nome;
      }
    })

    return nomeDoEstado
  }
}