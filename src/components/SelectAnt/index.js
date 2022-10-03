import React from "react"
import { Form, Select } from 'antd';


const { Option } = Select;


export default function SelectAnt({

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

    list,
    multiple,
    showArrow,
    showSearch,
    allowClear,

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
        // initialValue={"Valor Default"}

        >
            <Select
                placeholder={placeholder}

                disabled={disabled}
                // readOnly={readOnly}
                style={style}
                size={size}


                onChange={onChange}
                // onFocus={onFocus}
                onBlur={onBlur}
                // onSearch={onSearch}

                showArrow={true}
                showSearch={true}
                allowClear={allowClear}
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                mode={multiple ? "multiple" : ""}
            >
                {list.map(registro => (
                    <Option
                        key={registro.id}
                        value={registro.id}
                        disabled={registro.disabled ? registro.disabled : false}
                    >
                        {registro.nome}
                    </Option>
                ))}
            </Select>
        </Form.Item>
    )
}


SelectAnt.defaultProps = {

    placeholder: null,

    required: false,
    disabled: false,
    size: "large",

    onChange: null,

    showArrow: true,
    showSearch: true,
    allowClear: false,
    multiple: false,

};