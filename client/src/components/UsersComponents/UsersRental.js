import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Table} from "react-bootstrap";
import {createBodystyle, deleteRental, getUserRentals} from "../../http/carAPI";
import {Context} from "../../index";
import Image from "react-bootstrap/Image";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {PROFILE_ROUTE} from "../../utils/consts";

const UsersRental = observer(() => {
    const {user,car} = useContext(Context)
    const [carr,setCar] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [paymentAmount, setPaymentAmount] = useState(0)
    const [ID, setId] = useState()
    const navigate = useNavigate()
    const dropRental = () => {
        deleteRental(ID).then(data => {
            if (data == 1) {
                alert('Бронь успешно отменена')

navigate(PROFILE_ROUTE)
                    setPaymentAmount(0)

                    // carr.map(el=> {

                    // })


            }
        })
    }
    useEffect(() => {
        getUserRentals(user.user.id).then(data => {
            car.setUserRental(data)
            const {Car} = data;
            setCar(Car)
            setStartDate(data.StartDate)
            setEndDate(data.EndDate)
            setId(data.UserID)
                setPaymentAmount(data.PaymentAmount)



        })
    }, [])

    return (

        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Начало аренды</th>
                <th>Конец аренды</th>
                <th>Бренд</th>
                <th>Модель</th>
                <th>Тип кузова</th>
                <th>Количество мест</th>
                <th>Тип КПП</th>
                <th>Тип двигателя</th>
                <th>Номер авто</th>
                <th>Изображение</th>
                <th>Итого</th>
                <th></th>

            </tr>
            </thead>
            <tbody>
            <tr>
                {paymentAmount ? <td>{startDate}</td> : ''}
                {paymentAmount ? <td>{endDate}</td> : ''}
                {paymentAmount ? <td>{carr?.Brand?.Name}</td> : ''}
                {paymentAmount ? <td>{carr?.Model}</td> : ''}
                {paymentAmount ? <td>{carr?.Body?.Name}</td> : ''}
                {paymentAmount ? <td>{carr?.Seats}</td> : ''}
                {paymentAmount ? <td>{carr?.TransmissionType?.Name}</td> : ''}
                {paymentAmount ? <td>{carr?.EngineType?.Name}</td> : ''}
                {paymentAmount ? <td>{carr?.CarNumber}</td> : ''}
                {paymentAmount ? <td> <Image
                            className="d-block w-100 rounded-3"
                            style={{objectFit: 'cover', height: 100}}
                            src={process.env.REACT_APP_API_URL + '/' + carr?.Image}

                        />

                    </td>:''}
                {paymentAmount?  <td>{paymentAmount}</td>: ''}
                {paymentAmount?  <td> <Button onClick={dropRental}>Отменить бронь</Button> </td>: ''}
                    </tr>
                    </tbody>
                    </Table>

                    );
                });

                export default UsersRental;