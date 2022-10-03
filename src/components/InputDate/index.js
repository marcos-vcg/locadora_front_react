import React from "react";
import { Form, DatePicker } from "antd";
import locale from 'antd/es/date-picker/locale/pt_BR';
import moment from 'moment';


export default function InputDate({
    name,
    label,
    placeholder,
    message,
    help,

    required,
    disabled,
    readOnly,
    style,
    size,

    onChange,
    onFocus,
    onBlur,
    onSearch,



    format,
    defaultValue,
    disabledDate,

}) {


    return (
        <Form.Item
            name={name}
            // value={moment(name, "YYYY-MM-DD")}
            label={label}
            help={help}         // Substitui a message do required
            rules={[
                {
                    required: required,
                    message
                }
            ]}
        >
            <DatePicker
                
                
                placeholder={placeholder}

                disabled={disabled}
                style={style}
                size={size}

                onChange={onChange}

                disabledDate={disabledDate}
                defaultValue={defaultValue}
                //defaultValue={moment('01/01/2021', format)}
                locale={locale}
                format={format}

            />
        </Form.Item>

    )
}


InputDate.defaultProps = {
    placeholder: "",

    disabled: false,
    size: "large",

    //format: "YYYY-MM-DD"
    format: "DD/MM/YYYY"
};