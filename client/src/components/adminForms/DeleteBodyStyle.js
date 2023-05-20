import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form} from "react-bootstrap";
import {deleteBodyStyle, getBodystyle} from "../../http/carAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const DeleteBodyStyle =observer( () => {
    const [value, setValue] = useState('');
    const {car} = useContext(Context)

    const dropBodyStyle = () => {
        if(car.selectedBody.ID) {
            deleteBodyStyle(car.selectedBody.ID).then(data => {
                if (data == 1) {
                    alert('Успешно удалено')
                    getBodystyle().then(data => {
                        car.setBodyStylesType(data)
                    })
                    car.setSelectedBody('')

                }
            }).catch(
                e => {
                    if(e.response.data.message.e.name == 'SequelizeForeignKeyConstraintError'){
                        alert('Ошибка при удалении. Удалите автомобиль с таким типом кузова и попробуйте снова')}
                    else {alert('Возникла ошибка при удалении: ' + e.response.data.e.name)}
                }
            )
        }
    }

    return (
        <Form>
            <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle>
                    {car.selectedBody.Name || "Выберите тип кузова"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {car.bodystylesTypes.map(en => <Dropdown.Item onClick={() => car.setSelectedBody(en)}
                                                         key={en.ID}>{en.Name}</Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>
            <Button variant="primary" onClick={dropBodyStyle}>Удалить
            </Button>
        </Form>

    );

})
export default DeleteBodyStyle;