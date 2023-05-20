import React, {useContext, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {createEngineType, getEngineType, getTransmissionType} from "../../http/carAPI";
import {Context} from "../../index";

const CreateEngineType = () => {
    const [value, setValue] = useState('');
    const {car} = useContext(Context)
    const addEngineType = ()=>{
        const re = /^[a-zA-Zа-яА-Я0-9]{1,60}$/u
        if(re.test(String(value))) {
            createEngineType({Name: value}).then(data => {setValue('')
                getEngineType().then(data => {
                    car.setEngineType(data)
                })})
        }
        else{alert("Проверьте правильность данных")}

    }

    return (

        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Введите тип двигателя:</Form.Label>
                <Form.Control type="text" placeholder="тип двигателя" value={value}
                              onChange={e=>{setValue(e.target.value)}}
                />

            </Form.Group>
            <Button variant="primary"  onClick={addEngineType}>
                Добавить
            </Button>
        </Form>

    );
};

export default CreateEngineType;