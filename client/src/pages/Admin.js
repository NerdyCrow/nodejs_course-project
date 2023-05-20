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
import {deleteRentalAdmin, getBodystyle, getBrands, getCars, getEngineType, getTransmissionType} from "../http/carAPI";
import {Context} from "../index";
import DeleteBodyStyle from "../components/adminForms/DeleteBodyStyle";
import DeleteTransmissionType from "../components/adminForms/DeleteTransmissionType";
import DeleteEngineType from "../components/adminForms/DeleteEngineType";
import DeleteCar from "../components/adminForms/DeleteCar";
import EditCar from "../components/adminForms/EditCar";
import UsersRentalAdmin from "../components/adminForms/UsersRentalAdmin";

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
            getBrands().then(data => {
                car.setBrand(data)
            })
            getBodystyle().then(data => {
                car.setBodyStylesType(data)
            })
            getTransmissionType().then(data => {

                car.setTransmissionType(data)
            })
            getEngineType().then(data => {
                car.setEngineType(data)
            })
        }
        if (key === 'car') {
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
                                <Nav.Link eventKey="brand">Добавить бренд</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="delBrand">Удалить бренд</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="transmission">Добавить кпп</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="delTransmissionType">Удалить кпп</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="body">Добавить кузов</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="delBodyStyle">Удалить кузов</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="engine">Добавить тип двигателя</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="delEngineType">Удалить тип двигателя</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="car">Добавить автомобиль</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="delCar">Удалить автомобиль</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="editCar">Редактировать автомобиль</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="usersRentals">Брони</Nav.Link>
                            </Nav.Item>

                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="brand">
                                <CreateBrand/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="delBrand">
                                <DeleteBrand/>
                            </Tab.Pane>

                            <Tab.Pane eventKey="transmission">
                                <CreateTransmissionType/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="delTransmissionType">
                                <DeleteTransmissionType/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="body">
                                <CreateBodyStyle/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="delBodyStyle">
                                <DeleteBodyStyle/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="engine">
                                <CreateEngineType/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="delEngineType">
                                <DeleteEngineType/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="car">
                                <CreateCar/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="delCar">
                                <DeleteCar/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="editCar">
                                <EditCar car = {car}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="usersRentals">
                                <UsersRentalAdmin/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

        </Container>
    )
}

export default Admin;