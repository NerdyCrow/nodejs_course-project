import React, {useContext, useEffect} from "react";
import { Container,Row,Col } from "react-bootstrap";
import Leftbar from "../components/LeftBar";
import TopBar from "../components/TopBar";
import CarList from "../components/CarList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {getBodystyle, getBrands, getCars, getEngineType, getTransmissionType} from "../http/carAPI";
import {check, login} from "../http/userAPI";
import ChatComponent from "../components/chatComponent";

const Rental = observer(() => {
const {car} = useContext(Context)
const {user} = useContext(Context)
const {wssock} = useContext(Context)
    useEffect( ()=>{
        getCars(null,null,null,null).then(data=>{
            car.setCar(data)

        })
        getBrands().then(data=>{
            car.setBrand(data)
        })
        getBodystyle().then(data=>{
            car.setBodyStylesType(data)
        })
        getTransmissionType().then(data=>{

            car.setTransmissionType(data)
        })
        getEngineType().then(data=>{
            car.setEngineType(data)
        })




    },[])
    useEffect(()=>{

        getCars(car.selectedBrand.ID,car.selectedBody.ID,car.selectedEngineType.ID,car.selectedTransmissionType.ID).then(data=>{

            car.setCar(data)
        })
    },[car.selectedBrand,car.selectedBody,car.selectedEngineType,car.selectedTransmissionType])
    return (
        <Container>
            <Row>   
            <Col md={3}>
                <Leftbar/>
            </Col>
                <Col md={9}> <TopBar />
                <CarList/>
                </Col>
          

            </Row>
            <ChatComponent/>
        </Container>
      
    )
});

export default Rental;
