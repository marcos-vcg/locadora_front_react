import moment from 'moment';



// CPF
export function formataCpfParaMostrarLista(cpf) {
    //retira os caracteres indesejados...
    cpf = cpf?.replace(/[^\d]/g, "");

    //realizar a formatação...
    return cpf?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}


// DATA
export function formataDataParaMostrarLista(data) {
    // Ajusta a data que vem do BD ("YYYY-MM-DD") para o formato que é mostrado na lista ("DD-MM-YYYY")
    return data ? new Date(moment(data))?.toLocaleDateString('pt-BR') : null;    // Transforma uma Date() para um formato de data local padrão do Brasil "DD/MM/AAAA"

}

export function formataDataParaEditarForm(data) {
    // Ajustar a data que vem do BD ("YYYY-MM-DD") para o formato que o Componente DatePicker aceita receber (moment())
    return data ? moment(data /* , "YYYY-MM-DD" */) : null;   // caso a data esteja fora desse padrão, deve especificar o formato que vem do BD

}


// CEP
export function formataCepParaMostrarLista(cep) {
    //retira os caracteres indesejados...
    cep = cep?.replace(/[^\d]/g, "");

    //realizar a formatação...
    return cep?.replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2-$3");
}


// TELEFONE
export function formataTelefoneParaMostrarLista(telefone) {
    //retira os caracteres indesejados...
    telefone = telefone?.replace(/[^\d]/g, "");

    //realizar a formatação...
    return telefone?.replace(/(\d{2})(\d{5})(\d{4})/, "($1)$2-$3");
}