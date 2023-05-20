import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form} from "react-bootstrap";
import {Context} from "../../index";
import {createCars, getBodystyle, getBrands, getEngineType, getTransmissionType} from "../../http/carAPI";
import {observer} from "mobx-react-lite";

const CreateCar = observer(() => {
    const {car} = useContext(Context)
    useEffect(() => {
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
    }, [])
    useEffect(() => {
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
    }, [car.BodyStyles,car.TransmissionTypes,car.EngineTypes,car.Brands])
    const selectFile = e => {
        setFile(e.target.files[0])
    }
    const [model, setModel] = useState('')
    const [year, setYear] = useState(0)
    const [color, setColor] = useState('')
    const [carnumber, setCarnumber] = useState('')
    const [seats, setSeats] = useState(0)
    const [priceperday, setPriceperday] = useState(0)
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)

    const addCar = () => {
        const re = /^[a-zA-Zа-яА-Я0-9]{1,60}$/u
        const nm = /^\d{4}\s[A-Z]{2}\-[1-7]{1}$/

        if(re.test(String(model)) && re.test(String(color)) && description && year>1980 && year<new Date().getFullYear() && seats>0 && seats<50&& file &&car.selectedBrand.ID
        &&  car.selectedBody.ID && car.selectedEngineType.ID && car.selectedTransmissionType.ID && nm.test(String(carnumber)) && priceperday>0) {
            const formData = new FormData()
            formData.append('BrandId', car.selectedBrand.ID)
            formData.append('Model', model)
            formData.append('Year', year)
            formData.append('Color', color)
            formData.append('BodyId', car.selectedBody.ID)
            formData.append('EngineTypeId', car.selectedEngineType.ID)
            formData.append('TransmissionTypeId', car.selectedTransmissionType.ID)
            formData.append('CarNumber', carnumber)
            formData.append('Seats', seats)
            formData.append('PricePerDay', priceperday)
            formData.append('Description', description)
            formData.append('Image', file)
            createCars(formData).then(data => {alert('Автомобиль успешно добавлен')
                car.setSelectedTransmissionType([])
                car.setSelectedBrand([])
                car.setSelectedBody([])
                car.setSelectedEngineType([])}).catch( e => alert(e.response.data.message))

        }
        else{alert('Проверьте правильность данных')}



    }
    return (<Form>
            <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle>
                    {car.selectedBrand.Name || "Выберите бренд"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {car.brands.map(br => <Dropdown.Item onClick={() => car.setSelectedBrand(br)} key={br.ID}>{br.Name}</Dropdown.Item>)}
                </Dropdown.Menu>

            </Dropdown>
            <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle>
                    {car.selectedEngineType.Name || "Выберите тип двигателя"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {car.engineTypes.map(en => <Dropdown.Item onClick={() => car.setSelectedEngineType(en)} key={en.ID}>{en.Name}</Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle>
                    {car.selectedTransmissionType.Name || "Выберите тип кпп"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {car.transmissionTypes.map(tr => <Dropdown.Item onClick={() => car.setSelectedTransmissionType(tr)} key={tr.ID}>{tr.Name}</Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle>
                    {car.selectedBody.Name || "Выберите тип кузова"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {car.bodystylesTypes.map(bs => <Dropdown.Item onClick={() => car.setSelectedBody(bs)} key={bs.ID}>{bs.Name}</Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>
            <Form.Control className="mt-3"   value={model}
                          onChange={e => setModel(e.target.value)} placeholder="Введите модель автомобиля"/>
            <Form.Control className="mt-3"
                          onChange={e => setColor(e.target.value)} placeholder="Введите цвет автомобиля"/>
            <Form.Control className="mt-3"
                          onChange={e => setYear(e.target.value)} placeholder="Введите год автомобиля" type="number" min="1970"
                          max={new Date().getFullYear()}/>
            <Form.Control className="mt-3"  value={carnumber}
                          onChange={e => setCarnumber(e.target.value)} placeholder="Введите регистрационный номер(1111 AA-1)"/>
            <Form.Control className="mt-3"
                          onChange={e => setSeats(e.target.value)} placeholder="Введите количество мест в автомобиле " type="number"/>
            <Form.Control className="mt-3"
                          onChange={e => setPriceperday(e.target.value)}  placeholder="Введите цену аренды за день руб/сутки"  type="number"/>
            <Form.Control className="mt-3" as="textarea"
                          onChange={e => setDescription(e.target.value)}  placeholder="Введите описание"/>

            <Form.Control className="mt-3"  placeholder="выберите файл"   onChange={selectFile} type="file" accept="image/*"/>
            <Button variant="primary" className="mt-3" onClick={addCar}>
                Добавить
            </Button>
        </Form>

    );
});

export default CreateCar;