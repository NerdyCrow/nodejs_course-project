import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Spinner, Table} from "react-bootstrap";
import {createBodystyle, deleteRental, deleteRentalAdmin, getAllRentals, getUserRentals} from "../../http/carAPI";
import {Context} from "../../index";
import Image from "react-bootstrap/Image";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {PROFILE_ROUTE} from "../../utils/consts";
import {check} from "../../http/userAPI";

const UsersRental = observer(() => {
    const {user} = useContext(Context)
    const [car,setCar] = useState([])
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [paymentAmount, setPaymentAmount] = useState(0)
    const [ID, setId] = useState()
    const [loading,setLoading] = useState(true)


    const navigate = useNavigate()
    const dropRental = (ID) => {
        deleteRentalAdmin(ID).then(data => {
            if (data == 1) {
                alert('Бронь успешно отменена')


                    setPaymentAmount(0)
                getAllRentals().then(data => {
                    setCar(data)

                })


            }
        })
    }
    useEffect(() => {

        getAllRentals().then(data => {
            setCar(data)

        }).finally(()=>{setLoading(false)})
    }, [])
    if(loading){
        return <Spinner animation={"grow"}/>
    }

    return (

        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Email пользователя</th>
                <th>Начало аренды</th>
                <th>Конец аренды</th>
                <th>Бренд</th>
                <th>Модель</th>
                <th>Тип кузова</th>
                <th>Номер авто</th>
                <th>Изображение</th>
                <th>Итого</th>
                <th></th>

            </tr>
            </thead>
            <tbody>
            {car.map((item) => (
                <tr key={item.ID}>
                    {<td>{item.User.Email}</td>}
                    {<td>{item.StartDate}</td>}
                    {<td>{item.EndDate}</td>}
                    {<td>{item.Car.Brand.Name}</td>}
                    {<td>{item.Car.Model}</td>}
                    {<td>{item.Car.Body.Name}</td>}
                    {<td>{item.Car.CarNumber}</td>}
                    {<td><Image
                        className="d-block w-100 rounded-3"
                        style={{objectFit: 'cover', height: 100}}
                        src={process.env.REACT_APP_API_URL + '/' + item.Car.Image}

                    /></td>}
                    {<td>{item.PaymentAmount} бел. руб.</td>}
                    {<td><Button variant="danger" onClick={() => dropRental(item.UserID)}>Удалить бронь</Button></td>}
                </tr>
            ))}
            </tbody>
                    </Table>

                    );
                });

                export default UsersRental;