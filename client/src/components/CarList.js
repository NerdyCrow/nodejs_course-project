import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import { Card, ListGroup } from "react-bootstrap";
import {Row} from 'react-bootstrap'
import CarItem from "./CarItem"

const CarList = observer(() => {
    const { car } = useContext(Context)
    return (
        <Row className="d-flex">
            {car.cars.map(car =>

                    <CarItem key={car.ID} car={car}/>

              
            )}
        </Row>
    );
})
export default CarList 