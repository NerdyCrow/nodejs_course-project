import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Table} from "react-bootstrap";
import {createBodystyle, deleteRental, editUser, getCars, getUser, getUserRentals} from "../../http/carAPI";
import {Context} from "../../index";
import Image from "react-bootstrap/Image";
import {observer} from "mobx-react-lite";
import {NavLink, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, RENTAL_ROUTE} from "../../utils/consts";
import {login, registration} from "../../http/userAPI";

const Account = observer(() => {
    const {user} = useContext(Context)


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');


    const [EmailError, setEmailError] = useState('')
    const [PasswordError, setPasswordError] = useState('')
    const [FirstNameError, setFirstnameError] = useState('')
    const [LastNameError, setLastnameError] = useState('')
    const [PhoneNumberError, setPhonenumberError] = useState('')

    const [emailDirty, setEmailDirty] = useState(false)
    const [PasswordDirty, setPasswordDirty] = useState(false)
    const [FirstNameDirty, setFirstnameDirty] = useState(false)
    const [LastNameDirty, setLastNameDirty] = useState(false)
    const [PhoneNumberDirty, setPhonenumberDirty] = useState(false)


    const [isDisable, setIsDisable] = useState(true)
    useEffect(() => {
        getUser(user.user.id).then(data => {
            setFirstName(data.FirstName)
            setLastName(data.LastName)
            setEmail(data.Email)
            setPhoneNumber(data.PhoneNumber)
        })
    }, [])
    const updateUser = () => {

        const emailRe =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const nameRe
            = /^[a-zA-Zа-яА-ЯЁё\s]{1,35}$/
        const numRe
            = /^(\+375|375|80)(29|33|44|25)\d{7}$/
        if (password && password.length < 8) {
            setPasswordError('пароль должен быть не менее 8 символов')

            setPasswordDirty(true)
        } else {
            setPasswordError('')
            setPasswordDirty(false)
        }
        if (email && !emailRe.test(String(email).toLowerCase())) {


            setEmailError("Некорректный email")
            setEmailDirty(true)
        } else {
            setEmailError("")
            setEmailDirty(false)

        }
        if (firstName && !nameRe.test(String(firstName).toLowerCase())) {


            setFirstnameError('некорректное имя')
            setFirstnameDirty(true)

        } else {
            setFirstnameError('')
            setFirstnameDirty(false)

        }
        if (lastName && !nameRe.test(String(lastName).toLowerCase())) {


            setLastnameError('некорректная фамилия')
            setLastNameDirty(true)

        } else {
            setLastnameError('')
            setLastNameDirty(false)

        }
        if (phoneNumber && !numRe.test(String(phoneNumber).toLowerCase())) {


            setPhonenumberError('некорректный номер телефона')
            setPhonenumberDirty(true)

        } else {
            setPhonenumberError('')
            setPhonenumberDirty(false)

        }

        if (PhoneNumberDirty || PasswordDirty || FirstNameDirty || LastNameDirty || emailDirty
        ){


        }
        else{

            editUser(user.user.id,firstName,lastName,password,phoneNumber).then(data=>{

                if(data==1) {
                    getUser(user.user.id).then(data => {
                        setFirstName(data.FirstName)
                        setLastName(data.LastName)
                        setEmail(data.Email)
                        setPhoneNumber(data.PhoneNumber)

                    })
                    setIsDisable(true)
                }

            })
        }



    }
    return (
        <>
            <Form>
                <Form.Group controlId="formFirstName">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={firstName}
                        disabled={isDisable}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    {(FirstNameError) ?
                        <p className="mt-1" style={{color: 'red', fontSize: 10}}>{FirstNameError}</p> :
                        ''}
                </Form.Group>

                <Form.Group controlId="formLastName">
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={lastName}
                        value={lastName}
                        disabled={isDisable}

                        onChange={(e) => setLastName(e.target.value)}
                    />
                    {(LastNameError) ?
                        <p className="mt-1" style={{color: 'red', fontSize: 10}}>{LastNameError}</p> :
                        ''}
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder={email}
                        value={email}
                        disabled={isDisable}

                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {(EmailError) ?
                        <p className="mt-1" style={{color: 'red', fontSize: 10}}>{EmailError}</p> :
                        ''}
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        disabled={isDisable}

                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {(PasswordError) ?
                        <p className="mt-1" style={{color: 'red', fontSize: 10}}>{PasswordError}</p> :
                        ''}
                </Form.Group>
                <Form.Group controlId="formPhoneNumber">
                    <Form.Label>Номер телефона</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="phoneNumber"
                        value={phoneNumber}
                        disabled={isDisable}

                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    {(PhoneNumberError) ?
                        <p className="mt-1" style={{color: 'red', fontSize: 10}}>{PhoneNumberError}</p> :
                        ''}
                </Form.Group>


            </Form>
            <Button className="mt-2" variant="primary" onClick={() => {
                isDisable ? setIsDisable(false) : updateUser()
            }}>
                {isDisable ? 'Редактировать' : 'Сохранить'}
            </Button>
        </>

    )
})


export default Account;