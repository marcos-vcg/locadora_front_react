import React from "react";
import { Table } from 'antd';



export default function TabelaAnt(props) {
    return (
        <Table
            columns={props.columns}
            dataSource={props.dataSource}
            actions={props.actions}
        />
    )
}