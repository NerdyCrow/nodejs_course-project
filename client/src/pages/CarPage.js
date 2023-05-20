import React, {useContext, useEffect, useState} from "react";
import {Col, Container, Image, Form, Row, Button, Card, Carousel} from "react-bootstrap"

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {useParams} from "react-router-dom";
import {createRenal, createRental, getCars, getOneCar} from "../http/carAPI";
import {Context} from "../index";


const CarPage = () => {
    const {user} = useContext(Context)
const [car,setCar] = useState([])
    const [startDate, setStartDate] = useState(null);
    const [startDate2, setStartDate2] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [endDate2, setEndDate2] = useState(null);
const {id} = useParams()

    useEffect((startDate,)=>{
    getOneCar(id).then(data=>{
        setCar(data)
        setStartDate2(Object(data.startDate))

        setEndDate2(Object(data.endDate)?.EndDate)
        console.log(Object(data.endDate)?.EndDate)

    })
    },[])

    const addRental = ()=>{
        console.log(startDate)
       createRental(startDate,endDate,user.user.id,id,car.car.PricePerDay).then(data=>{
     alert('Забронировано успешно')
    }).catch(e=>alert(e.response.data.message))
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={8}>
                    <Carousel variant="dark" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Carousel.Item style={{ height: "450px",borderRadius:"10px" }}>
                            <Image

                                className="d-block w-100 rounded-5"
                                src={process.env.REACT_APP_API_URL+'/'+ car?.car?.Image}
                                alt="Car"

                            />
                        </Carousel.Item>
                        <Carousel.Item style={{ height: "450px",borderRadius:"30px 30px 0px 0px",border:'1px solid lightgray' }}>
                            <div style={{ textAlign: "center",marginTop:"10px" }} >
                                <h2>Технические характеристики</h2>
                                <div className="mt-4">
                                <h5>Марка: {car?.car?.Brand?.Name ??""}</h5>
                                <h5>Тип двигателя: {car?.car?.EngineType?.Name??""}</h5>
                                <h5>Тип коробки передач: {car?.car?.TransmissionType?.Name??""}</h5>
                                <h5>Кузов: {car?.car?.Body?.Name??""}</h5>
                                <h5>Количесво мест: {car?.car?.Seats??""}</h5>
                                <h5>Цвет: {car?.car?.Color??""}</h5>
                                <h5>Модель: {car?.car?.Model??""}</h5>
                                <h5>Цена за день: {car?.car?.PricePerDay??""} б.р.</h5>
                                </div>

                            </div>
                        </Carousel.Item>

                    </Carousel>
                    <div style={{marginTop:"10px"}}>
                        <h2>Описание</h2>
                        <p>{car?.car?.Description}</p>
                    </div>
                </Col>

                <Col>

                    <Card
                    style={{border:'2px solid lightgray',padding:"5px"}}
                    > <h3>Бронирование</h3>
                        <Row className="d-flex  align-items-center justify-space-between">
                        <Col md={1}>
                            <DatePicker
                                className="m-lg-2 rounded"
                                minDate={endDate2==undefined? new Date():new Date(endDate2)}
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                todayButton="Сегодня"
                                isClearable={false}

                                dateFormat="dd/MM/yyyy"
                                placeholderText="Аренда с:"
                            />
                            <DatePicker
                                minDate={endDate2==undefined? new Date():new Date(endDate2)}
                                className="m-lg-2"
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                dateFormat="dd/MM/yyyy"
                                isClearable={false}


                                placeholderText="Аренда по:"
                            />
                        </Col>

                        </Row>
                        <Button className="mb-2" onClick={addRental} >Забронировать</Button>

                    </Card>

                </Col>

            </Row>
        </Container>
    )
}

export default CarPage;