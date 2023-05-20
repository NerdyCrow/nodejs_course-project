import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import { Card, ListGroup } from "react-bootstrap";
import {Form} from 'react-bootstrap'
import { FaEngine } from 'react-icons/fa';

const TopBar = observer(() => {
    const { car } = useContext(Context)
    return (
        <Form className="d-inline-flex mt-3" style={{ flexWrap: 'wrap' }}>
            {car.brands.map(brand =>
                <Card 
                    className="p-3 m-lg-1 "
                    style={{cursor: 'pointer'}}
                key={brand.ID}
                onClick={() =>{
                    if(brand.ID===car.selectedBrand.ID){car.setSelectedBrand([]);}
                    else{
                    car.setSelectedBrand(brand);}
                }}
                border = {brand.ID === car.selectedBrand.ID? 'primary':'light'}
                    text = {brand.ID === car.selectedBrand.ID? 'white':'dark'}
                    bg = {brand.ID === car.selectedBrand.ID? 'primary':'light'}
                >
                    {brand.Name}
                </Card>
            )}
        </Form>
    );
})
export default TopBar