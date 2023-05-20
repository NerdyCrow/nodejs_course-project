import React, {useContext} from 'react';
import {Button, Container, Table} from "react-bootstrap";
import {deleteCar, getBodystyle, getCars} from "../../http/carAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const DeleteCar =observer( () => {
    const {car} = useContext(Context)

    const handleDelete = (ID) => {

            deleteCar(ID).then(data => {
                if (data == 1) {
                    alert('Успешно удалено')
                    getCars(null, null, null, null).then(data => {
                        car.setCar(data)
                    })

                }
            }).catch(
                e => {
                    if(e.response.data.message.e.name == 'SequelizeForeignKeyConstraintError'){
                        alert('Ошибка при удалении. Данный автомобиль забронирован пользователем. Свяжитесь с пользователем и обсудите ситуацию')}
                    else {alert('Возникла ошибка при удалении: ' + e.response.data.e.name)}
                }
            )

    }

    return (
        <Container style={{ height: '600px', overflow: 'auto' }}>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Id</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Year</th>
                <th>EngineType</th>
                <th>TransmissionType</th>
                <th>BodyStyle</th>
                <th>Color</th>
                <th>CarNumber</th>
                <th></th>

            </tr>
            </thead>
            <tbody>
            {car.cars.map((item) => (
                <tr key={item.ID}>
                    <td>{item.ID}</td>
                    <td>{item.Brand.Name}</td>
                    <td>{item.Model}</td>
                    <td>{item.Year}</td>
                    <td>{item.EngineType.Name}</td>
                    <td>{item.TransmissionType.Name}</td>
                    <td>{item.Body.Name}</td>
                    <td>{item.Color}</td>
                    <td>{item.CarNumber}</td>
                    <td><Button variant="danger" onClick={() => handleDelete(item.ID)}>Удалить</Button></td>
                </tr>
            ))}
            </tbody>
        </Table>
        </Container>
    );

})
export default DeleteCar;