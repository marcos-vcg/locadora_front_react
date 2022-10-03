import React from "react";
import { Form, InputNumber } from "antd";



export function InputNumberAnt({

    value,
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

    formatter,
    parser,
    min,
    max,
    precision,

}) {
    return (
        <Form.Item
            name={name}
            label={label}
            help={help}         // Substitui a message do required
            rules={[
                {
                    required: required,
                    message
                }
            ]}
        >
            <InputNumber
                //value={value}
                placeholder={placeholder}

                disabled={disabled}
                readOnly={readOnly}
                style={style}
                size={size}                 // Tamanho da Caixa de Imput

                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                //onSearch={onSearch}

                formatter={formatter}
                parser={parser}
                min={min}
                max={max}
                precision={precision}       // Numero de Casas Decimais
            />
        </Form.Item>
    );
}



InputNumberAnt.defaultProps = {

    placeholder: "",

    required: false,
    disabled: false,
    size: "large"
    
};