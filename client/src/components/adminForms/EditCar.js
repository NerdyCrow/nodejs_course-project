import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form} from "react-bootstrap";
import {editCars} from "../../http/carAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const EditCar =observer( () => {
//dropdown
    const [selectedBrand,setSelectedBrand] = useState('')
    const [selectedEngineType,setSelectedEngineType] = useState('')
    const [selectedTransmissionType,setSelectedTransmissionType] = useState('')
    const [selectedBody,setSelectedBody] = useState('')
    const [selectedID,setSelectedId] = useState('')
    //forms
    const [selectedModel,setSelectedModel] = useState()
    const [selectedColor,setSelectedColor] = useState()
    const [selectedYear,setSelectedYear] = useState()
    const [selectedCarNumber,setSelectedCarNumber] = useState()
    const [selectedSeats,setSelectedSeats] = useState()
    const [selectedPricePerDay,setSelectedPricePerDay] = useState()
    const [selectedDescription,setSelectedDescription] = useState()





    const [file, setFile] = useState(null)

    const {car} = useContext(Context)
    const selectFile = e => {
        setFile(e.target.files[0])
    }
    const editCar = () => {
        const re = /^[a-zA-Zа-яА-Я0-9]{0,60}$/u

        const nm = /^\d{4}\s[A-Z]{2}\-[1-7]{1}$/
        if (selectedYear && selectedYear < 1980 || selectedYear && selectedYear > new Date().getFullYear() || selectedSeats && selectedSeats > 50 || selectedSeats && selectedSeats < 0
                ||selectedPricePerDay && selectedPricePerDay < 0  || selectedCarNumber && !nm.test(String(selectedCarNumber))) {
            alert('Проверьте введенные данные')
        }
        else{
            const formData = new FormData()
            formData.append('ID', selectedID)
            formData.append('BrandId', selectedBrand.ID)
            formData.append('Model', selectedModel)
            formData.append('Year', selectedYear)
            formData.append('Color', selectedColor)
            formData.append('BodyId', selectedBody.ID)
            formData.append('EngineTypeId', selectedEngineType.ID)
            formData.append('TransmissionTypeId', selectedTransmissionType.ID)
            formData.append('CarNumber', selectedCarNumber)
            formData.append('Seats', selectedSeats)
            formData.append('PricePerDay', selectedPricePerDay)
            formData.append('Description', selectedDescription)
            formData.append('Image', file)

            editCars(formData).then(data => alert('Автомобиль успешно изменен'))}
    }

    return (
        <Form>
            <Dropdown className="mt-2 mb-2">
                <Form.Label>Выберите автомобиль:</Form.Label>
                <Dropdown.Toggle>
                    {Object(car.selectedCar.Brand).Name? `${Object(car.selectedCar.Brand).Name} ${Object(car.selectedCar.Model)}`:'Выберите авто'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {car.cars?.map(en => <Dropdown.Item onClick={() => {car.setSelectedCar(en);setSelectedId(en.ID)}}
                                                         key={en.ID}>{Object(en.Brand).Name+' '+ en.Model + ' '+ en.CarNumber + ' ' + en.Color}</Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown className="mt-2 mb-2">
                <Form.Label>Выберите бренд:</Form.Label>
                <Dropdown.Toggle>

                    {selectedBrand.Name || Object(car.selectedCar.Brand).Name }
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {car.brands.map(br => <Dropdown.Item onClick={() => setSelectedBrand(br)} key={br.ID}>{br.Name}</Dropdown.Item>)}
                </Dropdown.Menu>

            </Dropdown>
            <Dropdown className="mt-2 mb-2">
                <Form.Label>Выберите двигатель:</Form.Label>

                <Dropdown.Toggle>
                    {selectedEngineType.Name || Object(car.selectedCar.EngineType).Name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {car.engineTypes.map(en => <Dropdown.Item onClick={() => setSelectedEngineType(en)} key={en.ID}>{en.Name}</Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="mt-2 mb-2">
                <Form.Label>Выберите тип КПП:</Form.Label>

                <Dropdown.Toggle>
                    {selectedTransmissionType.Name || Object(car.selectedCar.TransmissionType).Name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {car.transmissionTypes.map(tr => <Dropdown.Item onClick={() => setSelectedTransmissionType(tr)} key={tr.ID}>{tr.Name}</Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="mt-2 mb-2">
                <Form.Label>Выберите тип кузова:</Form.Label>

                <Dropdown.Toggle>
                    {selectedBody.Name || Object(car.selectedCar.Body).Name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {car.bodystylesTypes.map(bs => <Dropdown.Item onClick={() => setSelectedBody(bs)} key={bs.ID}>{bs.Name}</Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>
            <Form.Label>Введите модель:</Form.Label>
            <Form.Control className="mt-0"
                          onChange={e => setSelectedModel(e.target.value)} placeholder={car.selectedCar.Model}/>
            <Form.Label>Введите цвет:</Form.Label>

            <Form.Control className="mt-0"
                          onChange={e => setSelectedColor(e.target.value)} placeholder={car.selectedCar.Color}/>
            <Form.Label>Введите год:</Form.Label>
            <Form.Control className="mt-0"
                          onChange={e => setSelectedYear(e.target.value)} placeholder={car.selectedCar.Year} type="number" min="1970"
                          max={new Date().getFullYear()}/>
            <Form.Label>Введите номер авто:</Form.Label>
            <Form.Control className="mt-0"
                          onChange={e => setSelectedCarNumber(e.target.value)} placeholder={car.selectedCar.CarNumber}/>
            <Form.Label>Введите количество мест:</Form.Label>
            <Form.Control className="mt-0"
                          onChange={e => setSelectedSeats(e.target.value)} placeholder={car.selectedCar.Seats}  type="number"/>
            <Form.Label>Введите цену руб/сутки:</Form.Label>
            <Form.Control className="mt-0"
                          onChange={e => setSelectedPricePerDay(e.target.value)}  placeholder={car.selectedCar.PricePerDay} type="number"/>
            <Form.Label>Введите описание:</Form.Label>
            <Form.Control className="mt-0"
                          as="textarea"
                          onChange={e => setSelectedDescription(e.target.value)}  placeholder={car.selectedCar.Description}/>

            <Form.Control className="mt-3"  placeholder="Фото автомобиля"  onChange={selectFile} type="file"/>
            <Button variant="primary" onClick={editCar}>Изменить
            </Button>
        </Form>

    );

})
export default EditCar;