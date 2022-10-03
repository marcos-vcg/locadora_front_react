import React from "react";
import { Form, Input } from "antd";



export default function InputText({

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
    type,

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
            <Input
                //value={value}
                placeholder={placeholder}

                disabled={disabled}
                readOnly={readOnly}
                style={style}
                size={size}

                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                //onSearch={onSearch}

                formatter={formatter}
                parser={parser}
                type={type}
            />
        </Form.Item>
    )
}



InputText.defaultProps = {

    placeholder: "",

    required: false,
    disabled: false,
    size: "large",

    type: "text",
    
};