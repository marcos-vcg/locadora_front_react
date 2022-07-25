import React from "react";
import { Form, Input } from "antd";

export default function InputText(props) {
    return (
        <Form.Item name={props.name}>
            <Input
                label={props.label}
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
        </Form.Item>
    )
}