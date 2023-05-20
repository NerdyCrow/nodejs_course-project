import {observer} from "mobx-react-lite";
import React, {useContext} from "react";
import {Context} from "../index";
import {Card, ListGroup} from "react-bootstrap";
import { GiBoatEngine } from 'react-icons/gi';
const LeftBar = observer(() => {
    const {car} = useContext(Context)
    return (
        <div>
            <Card className="border-1 text-center mt-3">
                <h4 style={{fontFamily:"Comic Sans MS"}} className="mt-1">Тип кузова: </h4>
            <ListGroup>
                {car.bodystylesTypes.map(body =>
                    <ListGroup.Item
                        style={{cursor: 'pointer'}}
                        active={body.ID === car.selectedBody.ID}
                        onClick={() => {
                            if(body.ID===car.selectedBody.ID){car.setSelectedBody([]);}
                            else{
                            car.setSelectedBody(body);}
                        }}

                        key={body.ID}>
                        {body.Name}
                    </ListGroup.Item>
                )}
            </ListGroup>
            </Card>
            <Card className="border-1 text-center mt-1">
                <h4 style={{fontFamily:"Comic Sans MS"}} className="mt-1">Тип двигателя: </h4>
            <ListGroup className="mt-2">
                {car.engineTypes.map(etype =>
                    <ListGroup.Item
                        style={{cursor: 'pointer'}}
                        active={etype.ID === car.selectedEngineType.ID}
                        onClick={() => {
                            if(etype.ID===car.selectedEngineType.ID){car.setSelectedEngineType([]);}
                            else{
                                car.setSelectedEngineType(etype);}
                        }}

                        key={etype.ID}>
                        {etype.Name}
                    </ListGroup.Item>
                )}
            </ListGroup>
            </Card>
            <Card className="border-1 text-center mt-1">
                <h4 style={{fontFamily:"Comic Sans MS"}} className="mt-1">Тип кпп: </h4>
            <ListGroup className="mt-2">
                {car.transmissionTypes.map(ttype =>
                    <ListGroup.Item
                        style={{cursor: 'pointer'}}
                        active={ttype.ID === car.selectedTransmissionType.ID}
                        onClick={() => {

                            if(ttype.ID===car.selectedTransmissionType.ID){car.setSelectedTransmissionType([]);}
                            else{
                                car.setSelectedTransmissionType(ttype);}
                        }}
                        key={ttype.ID}>
                        {ttype.Name}
                    </ListGroup.Item>)}

            </ListGroup>
            </Card>
        </div>
    );

})
export default LeftBar