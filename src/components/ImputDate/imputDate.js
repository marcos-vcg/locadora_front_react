import React from "react";
import { DatePicker } from "antd";
import moment from 'moment';


export function DatePikerAnt(props) {
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
    return (

        <DatePicker
            name={props.name}
            defaultValue={moment('01/01/2021', dateFormatList[0])}
            format={dateFormatList}
        />

    )
}