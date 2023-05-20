import React, {useContext} from 'react';
import {Container} from "react-bootstrap";
import CreateBrand from "../components/adminForms/CreateBrand";
import CreateCar from "../components/adminForms/CreateCar";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import CreateTransmissionType from "../components/adminForms/CreateTransmissionType";
import CreateBodyStyle from "../components/adminForms/CreateBodyStyle";
import CreateEngineType from "../components/adminForms/CreateEngineType";
import DeleteBrand from "../components/adminForms/DeleteBrand";
import {getBodystyle, getBrands, getCars, getEngineType, getTransmissionType} from "../http/carAPI";
import {Context} from "../index";
import DeleteBodyStyle from "../components/adminForms/DeleteBodyStyle";
import DeleteTransmissionType from "../components/adminForms/DeleteTransmissionType";
import DeleteEngineType from "../components/adminForms/DeleteEngineType";
import DeleteCar from "../components/adminForms/DeleteCar";
import EditCar from "../components/adminForms/EditCar";
import UsersRental from "../components/UsersComponents/UsersRental";
import Account from "../components/UsersComponents/Account";

const Admin = () => {
    const {car} = useContext(Context)

    const handleTabSelect = (key) => {

        if (key === 'delBrand') {
            getBrands().then(data => {
                car.setBrand(data)
            })
        }
        if (key === 'delTransmissionType') {
            getTransmissionType().then(data => {
                car.setTransmissionType(data)
            })
        }
        if (key === 'delBodyStyle') {
            getBodystyle().then(data => {
                car.setBodyStylesType(data)
            })
        }
        if (key === 'delEngineType') {
            getEngineType().then(data => {
                car.setEngineType(data)
            })
        }
        if (key === 'delCar' || key==='editCar') {

            getCars(null,null,null,null).then(data => {
                car.setCar(data)

            })
        }


    }
    return (
        <Container className="d-flex flex-column">

            <Tab.Container defaultActiveKey="brand" onSelect={handleTabSelect}>
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="booked">Мои брони</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="account">Аккаунт</Nav.Link>
                            </Nav.Item>


                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="booked">
                                <UsersRental/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="account">
                                <Account/>
                            </Tab.Pane>

                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

        </Container>
    )
}

export default Admin;