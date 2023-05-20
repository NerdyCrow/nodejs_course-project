import {$authHost, $host} from "./index";
import jwt_decode from 'jwt-decode'

export const createBrands = async (Name) => {
    const {data} = await $authHost.post('api/brands', {
        Name
    })
    return data
}
export const getBrands = async () => {
    const {data} = await $host.get('api/brands')

    return data
}
export const createBodystyle = async (Name) => {
    const {data} = await $authHost.post('api/bodystyles', {
        Name
    })
    return data
}
export const getBodystyle = async () => {
    const {data} = await $host.get('api/bodystyles')
    return data
}

export const createEngineType = async (Name) => {
    const {data} = await $authHost.post('api/enginetypes', {
        Name
    })
    return data
}
export const getEngineType = async () => {
    const {data} = await $host.get('api/enginetypes')
    return data
}

export const createTransmissionType = async (Name) => {
    const {data} = await $authHost.post('api/transmissiontypes', {
        Name
    })
    return data
}
export const createRental = async (StartDate,EndDate,UserID,CarID,PricePerDay) => {
    const {data} = await $authHost.post('api/rental', {
        StartDate,EndDate,UserID,CarID,PricePerDay
    })
    return data
}
export const getTransmissionType = async () => {
    const {data} = await $host.get('api/transmissiontypes')
    return data
}



export const createCars = async (car) => {
    const {data} = await $authHost.post('api/cars', car)
    return data
}
export const editCars = async (car) => {
    const {data} = await $authHost.put('api/cars', car)
    return data
}
export const getCars = async (BrandId,BodyId,EngineTypeId,TransmissionTypeId) => {
    const {data} = await $host.get('api/cars',{params:{
            BrandId,BodyId,EngineTypeId,TransmissionTypeId
        }})
    return data
}

export const getOneCar = async (ID) => {
    const {data} = await $host.get('api/cars/'+ID)
    return data
}

export const deleteBodyStyle = async (ID) => {
    const {data} = await $authHost.delete('api/bodystyles/',{data:{ID}})
    return data
}
export const deleteBrand = async (ID) => {
    const {data} = await $authHost.delete('api/brands/',{data:{ID}})
    return data
}
export const deleteTransmissionType = async (ID) => {
    const {data} = await $authHost.delete('api/transmissiontypes/',{data:{ID}})
    return data
}
export const deleteEngineType = async (ID) => {
    const {data} = await $authHost.delete('api/enginetypes/',{data:{ID}})
    return data
}
export const deleteCar = async (ID) => {
    const {data} = await $authHost.delete('api/cars/',{data:{ID}})
    return data
}
export const deleteRental = async (ID) => {
    const {data} = await $authHost.delete('api/rental/',{data:{ID}})
    return data
}
export const deleteRentalAdmin = async (ID) => {
    const {data} = await $authHost.delete('api/rental/delete',{data:{ID}})
    return data
}
export const getUserRentals = async (UserID) => {
    const {data} = await $authHost.get('api/rental/user',{params:{
            UserID
        }})
    return data
}
export const getAllRentals = async () => {
    const {data} = await $authHost.get('api/rental/')
    return data
}


export const getUser = async (ID) => {
    const {data} = await $authHost.get('api/user/'+ID)
    return data
}
export const editUser = async (ID,FirstName,LastName,Password,PhoneNumber) => {
    const {data} = await $authHost.put('api/user', {
        ID,FirstName,LastName,Password,PhoneNumber
    })
    return data
}

