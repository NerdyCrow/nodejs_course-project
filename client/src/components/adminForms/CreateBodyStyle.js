import React, {useContext, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {createBodystyle, getBodystyle} from "../../http/carAPI";
import {Context} from "../../index";

const CreateBodyStyle = () => {
    const {car} = useContext(Context)
    const [value, setValue] = useState('');

    const addBodyStyle = () => {
        const re = /^[a-zA-Zа-яА-Я0-9]{1,60}$/u
        if (re.test(String(value))) {
            createBodystyle({Name: value}).then(data => {
                setValue('')
            })
            getBodystyle().then(data => {
                car.setBodyStylesType(data)
            })
        } else {
            alert("Проверьте правильность данных")
        }

    }

    return (

        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Введите тип кузова:</Form.Label>
                <Form.Control type="text" placeholder="тип кузова" value={value}
                              onChange={e => {
                                  setValue(e.target.value)
                              }}
                />

            </Form.Group>
            <Button variant="primary" onClick={addBodyStyle}>
                Добавить
            </Button>
        </Form>

    );
};

export default CreateBodyStyle;