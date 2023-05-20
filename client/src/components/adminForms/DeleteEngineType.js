import React, {useContext} from 'react';
import {Button, Dropdown, Form} from "react-bootstrap";
import {deleteEngineType, getEngineType} from "../../http/carAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const DeleteEngineType =observer( () => {
    const {car} = useContext(Context)

    const dropEngineType = () => {
        if(car.selectedEngineType.ID) {
            deleteEngineType(car.selectedEngineType.ID).then(data => {
                if (data == 1) {
                    alert('Успешно удалено')
                    getEngineType().then(data => {
                        car.setEngineType(data)
                    })
                    car.setSelectedEngineType('')

                }
            }).catch(
                e => {
                    if(e.response.data.message.e.name == 'SequelizeForeignKeyConstraintError'){
                    alert('Ошибка при удалении. Удалите автомобиль с таким типом двигателя и попробуйте снова')}
                    else {alert('Возникла ошибка при удалении: ' + e.response.data.e.name)}
                }
            )
        }
    }

    return (
        <Form>
            <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle>
                    {car.selectedEngineType.Name || "Выберите тип двигателя"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {car.engineTypes?.map(en => <Dropdown.Item onClick={() => car.setSelectedEngineType(en)}
                                                         key={en.ID}>{en.Name}</Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>
            <Button variant="primary" onClick={dropEngineType}>Удалить
            </Button>
        </Form>

    );

})
export default DeleteEngineType;