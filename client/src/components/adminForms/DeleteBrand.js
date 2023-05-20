import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form} from "react-bootstrap";
import {deleteBrand, getBrands} from "../../http/carAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const DeleteBrand =observer( () => {

    const [value, setValue] = useState('');
    const {car} = useContext(Context)


    const dropBrand = () => {
        if(car.selectedBrand.ID) {
            deleteBrand(car.selectedBrand.ID).then(data => {
                if (data == 1) {
                    alert('Успешно удалено')
                    getBrands().then(data => {
                        car.setBrand(data)
                    })
                    car.setSelectedBrand('')

                }
            }).catch(
                e => {
                    if(e.response.data.message.e.name == 'SequelizeForeignKeyConstraintError'){
                        alert('Ошибка при удалении. Удалите автомобиль с таким брендом и попробуйте снова')}
                    else {alert('Возникла ошибка при удалении: ' + e.response.data.e.name)}
                }
            )
        }
    }

    return (
        <Form>
            <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle>
                    {car.selectedBrand.Name || "Выберите бренд"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {car.brands.map(en => <Dropdown.Item onClick={() => car.setSelectedBrand(en)}
                                                         key={en.ID}>{en.Name}</Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>
            <Button variant="primary" onClick={dropBrand}>Удалить
            </Button>
        </Form>

    );

})
export default DeleteBrand;