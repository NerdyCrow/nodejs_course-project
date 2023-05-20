import React, {useContext, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {createTransmissionType, getTransmissionType} from "../../http/carAPI";
import {Context} from "../../index";

const CreateTransmissionType = () => {
    const [value, setValue] = useState('');
    const {car} = useContext(Context)
    const addTransmissionType = () => {
        const re = /^[a-zA-Zа-яА-Я0-9]{1,60}$/u
        if (re.test(String(value))) {
            createTransmissionType({Name: value}).then(data => {
                setValue('')
                getTransmissionType().then(data => {
                    car.setTransmissionType(data)
                })
            })
        } else {
            alert("Проверьте правильность данных")
        }

    }

    return (

        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Введите тип трансмиссии:</Form.Label>
                <Form.Control type="text" placeholder="тип трансмиссии" value={value}
                              onChange={e => {
                                  setValue(e.target.value)
                              }}
                />

            </Form.Group>
            <Button variant="primary" onClick={addTransmissionType}>
                Добавить
            </Button>
        </Form>

    );
};

export default CreateTransmissionType;