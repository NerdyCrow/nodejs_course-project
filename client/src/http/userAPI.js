import {$authHost, $host} from "./index";
import jwt_decode from 'jwt-decode'

export const registration = async (FirstName, LastName, Email, Password, PhoneNumber,) => {
    const {data} = await $host.post('api/user/registration', {
        FirstName,
        LastName,
        Email,
        Password,
        PhoneNumber
    })
    sessionStorage.setItem('token',data.token)
    return jwt_decode(data.token)
}
export const login = async (Email, Password) => {
    const {data} = await $host.post('api/user/login', {
        Email,
        Password
    })
    sessionStorage.setItem('token',data.token)

    return jwt_decode(data.token)
}
export const check = async () => {


    const {data} = await $authHost.get('api/user/auth')
    sessionStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
