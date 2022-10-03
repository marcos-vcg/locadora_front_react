import React from "react";
import { Table } from 'antd';



export default function TabelaAnt({
    columns,
    dataSource,
    actions,
}) {

    // Atribui uma key unica igual ao ID pra cada linha da tabela para evitar WARNINGS
    dataSource.map(data => {
        data.key = data.id
    })


        
    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            actions={actions}
        />
    )
}



// TabelaAnt.defaultProps = {
//     columns: [],
//     dataSource: [],
//     actions: [],
// };