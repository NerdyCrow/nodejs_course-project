import React, {useState} from "react";
import {Col, Card} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useNavigate} from "react-router-dom"
import {CAR_ROUTE} from "../utils/consts"

const CarItem = ({car}) => {
    const [isHover,setIsHover] = useState(false)
    const navigate = useNavigate()
    return (
        <Col
            md={3}
            className="mt-3"

            onClick={() => {
                navigate(CAR_ROUTE + '/' + car.ID)
            }}

        >
            <Card style={{width: 210, cursor: 'pointer',transform: isHover ? 'translateY(-15px)' : 'translateY(0)',
                boxShadow: isHover ? '4px 6px 10px rgba(0, 0, 0, 0.2)' : 'none',transition: 'transform 0.2s ease-in-out'}} className="p-2" border={"red"}
                  onMouseEnter={(e) => {
                      setIsHover(true)
                  }}
                  onMouseLeave={(e) => {
                      setIsHover(false)

                  }}
            >

                <div style={{overflow: 'hidden'}}>
                    <Image
                        className="d-block w-100 rounded-3"
                        style={{objectFit: 'cover', width: 210, height: 100, }}
                        src={process.env.REACT_APP_API_URL + '/' + car?.Image}

                    />
                </div>

                <div className="text-center" style={{boxShadow:'none'}}>
                    <h6>{Object(car.Brand).Name} {car.Model}</h6>
                    <p>год выпуска: {car.Year}<br/>
                        КПП: {Object(car.TransmissionType).Name}<br/>
                        мест: {car.Seats}<br/>
                        цена: {car.PricePerDay} б.руб/сутки</p>

                </div>
            </Card>
        </Col>
    )
}

export default CarItem;