import {makeAutoObservable} from "mobx"

export default class CarStore {
    constructor() {
        this._brands = []
        this._enginetypes = []
        this._transmissiontype = []
        this._bodystyletype = []
        this._cars = []
        this._userrental = []
        this._selectedBrand = {}
        this._selectedBody = {}
        this._selectedEngineType = {}
        this._selectedCar = {}
        this._selectedTransmissionType = {}
        makeAutoObservable(this)
    }

    setBrand(brand) {
        this._brands = brand;
    }
    setUserRental(userRental) {


        this._userrental = userRental;
    }
    setSelectedCar(car) {
        this._selectedCar = car;
    }

    setTransmissionType(transType) {
        this._transmissiontype = transType;
    }

    setBodyStylesType(bodystyle) {
        this._bodystyletype = bodystyle;
    }

    setEngineType(enginetype) {
        this._enginetypes = enginetype;
    }

        setCar(car) {
        this._cars = car;
    }

    get brands() {
        return this._brands;
    }

    get userRental() {
        return this._userrental;
    }
    get transmissionTypes() {
        return this._transmissiontype;
    }

    get bodystylesTypes() {
        return this._bodystyletype;
    }

    get engineTypes() {
        return this._enginetypes;
    }

    get cars() {
        return this._cars;
    }

    setSelectedBrand(brand) {
        this._selectedBrand = brand;
    }

    get selectedBrand() {
        return this._selectedBrand;
    }
    get selectedCar() {
        return this._selectedCar;
    }



    setSelectedBody(body) {
        this._selectedBody = body;
    }

    get selectedBody() {
        return this._selectedBody;
    }


    setSelectedTransmissionType(transmissionType) {
        this._selectedTransmissionType = transmissionType;
    }

    get selectedTransmissionType() {
        return this._selectedTransmissionType;
    }

    setSelectedEngineType(engineType) {
        this._selectedEngineType = engineType;
    }

    get selectedEngineType() {
        return this._selectedEngineType;
    }
}