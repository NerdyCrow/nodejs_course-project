import React, {useContext, useEffect, useState} from 'react';
import {Button, Collapse, Form, Modal} from "react-bootstrap";
import {createBrands, getBrands} from "../../http/carAPI";
import {Context} from "../../index";

const CreateBrand = () => {
    const [value, setValue] = useState('');
    const {car} = useContext(Context)
    const addBrand = ()=>{
        const re = /^[a-zA-Zа-яА-Я0-9]{1,60}$/u
        if(re.test(String(value))) {
            createBrands({Name: value}).then(data => {
                    setValue('')
                getBrands().then(data => {
                    car.setBrand(data)
                })
                }
            )
        }
        else{alert("Проверьте правильность данных")}
    }

    return (

        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Введите бренд:</Form.Label>
                <Form.Control type="text" placeholder="Бренд" value={value}
                              onChange={e=>{setValue(e.target.value)}}
                />

            </Form.Group>
            <Button variant="primary"  onClick={addBrand}>
                Добавить
            </Button>
        </Form>

    );
};

export default CreateBrand;