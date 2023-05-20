import React, {useContext} from 'react';
import {Button, Dropdown, Form} from "react-bootstrap";
import {deleteTransmissionType, getTransmissionType} from "../../http/carAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const DeleteTransmissionType =observer( () => {
    const {car} = useContext(Context)

    const dropTransmissionType = () => {
        if (car.selectedTransmissionType.ID) {
            deleteTransmissionType(car.selectedTransmissionType.ID).then(data => {
                if (data == 1) {
                    alert('Успешно удалено')
                    getTransmissionType().then(data => {
                        car.setTransmissionType(data)
                    })
                    car.setSelectedTransmissionType('')

                }
            }).catch(
                e => {
                    if(e.response.data.message.e.name == 'SequelizeForeignKeyConstraintError'){
                        alert('Ошибка при удалении. Удалите автомобиль с таким типом кпп и попробуйте снова')}
                    else {alert('Возникла ошибка при удалении: ' + e.response.data.e.name)}
                }
            )
        }
    }

    return (
        <Form>
            <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle>
                    {car.selectedTransmissionType.Name || "Выберите тип кузова"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {car.transmissionTypes?.map(en => <Dropdown.Item onClick={() => car.setSelectedTransmissionType(en)}
                                                         key={en.ID}>{en.Name}</Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>
            <Button variant="primary" onClick={dropTransmissionType}>Удалить
            </Button>
        </Form>

    );

})
export default DeleteTransmissionType;