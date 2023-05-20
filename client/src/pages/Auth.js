import React, {useContext, useState} from "react";
import {Card, Button, Container, Col} from "react-bootstrap";
import Row from "react-bootstrap/Row"
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {Form} from "react-bootstrap";
import {CAR_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, RENTAL_ROUTE} from "../utils/consts";
import {check, login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {getCars} from "../http/carAPI";

const Auth = observer(() => {
    const {user,car} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [FirstName, setFirstname] = useState('')
    const [LastName, setLastname] = useState('')
    const [PhoneNumber, setPhonenumber] = useState('')

    const [emailDirty, setEmailDirty] = useState(false)
    const [PasswordDirty, setPasswordDirty] = useState(false)
    const [FirstNameDirty, setFirstnameDirty] = useState(false)
    const [LastNameDirty, setLastNameDirty] = useState(false)
    const [PhoneNumberDirty, setPhonenumberDirty] = useState(false)

    const [EmailError, setEmailError] = useState('укажите email')
    const [PasswordError, setPasswordError] = useState('Пароль не может быь пустым')
    const [FirstNameError, setFirstnameError] = useState('укажите имя')
    const [LastNameError, setLastnameError] = useState('укажите фамилию')
    const [PhoneNumberError, setPhonenumberError] = useState('укажите номер телефона')


    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'Email':
                setEmailDirty(true)
                break;
            case 'Password':
                setPasswordDirty(true)
                break;
            case 'FirstName':
                setFirstnameDirty(true)
                break;
            case 'LastName':
                setLastNameDirty(true)
                break;
            case 'Number':
                setPhonenumberDirty(true)
                break;
        }
    }
    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError("Некорректный email")
        } else {
            setEmailError("")
        }

    }
    const firstNameHandler = (e) => {
        setFirstname(e.target.value)
        const re
            = /^[a-zA-Zа-яА-ЯЁё\s]{1,35}$/
        if (!re.test(String(e.target.value).toLowerCase())) {
            setFirstnameError("Некорректное имя (только кириллица или латиница)")
        } else {
            setFirstnameError("")
        }

    }
    const phonenumberHandler = (e) => {
        setPhonenumber(e.target.value)
        const re
            = /^(\+375|375|80)(29|33|44|25)\d{7}$/
        if (!re.test(String(e.target.value).toLowerCase())) {
            setPhonenumberError("Некорректное номер телефона ")
        } else {
            setPhonenumberError("")
        }

    }
    const lastNameHandler = (e) => {
        setLastname(e.target.value)
        const re
            = /^[a-zA-Zа-яА-ЯЁё\s]{1,35}$/
        if (!re.test(String(e.target.value).toLowerCase())) {
            setLastnameError("Некорректная фамилия (только кириллица или латиница)")
        } else {
            setLastnameError("")
        }

    }


    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 8) {
            setPasswordError("пароль должен быть не менее 8 символов")
        } else {
            setPasswordError("")
        }

    }

    const click = async () => {
        let data;
        try {
            if (isLogin && !EmailError && !PasswordError) {
                data = await login(Email, Password)
                user.setUser(data)
                user.setIsAuth(true)

                navigate(RENTAL_ROUTE)
                //navigate(RENTAL_ROUTE)
            } else if (!EmailError && !PasswordError &&!FirstNameError &&!LastNameError &&!PhoneNumberError) {
                data = await registration(FirstName, LastName, Email, Password, PhoneNumber)
                user.setUser(data)
                user.setIsAuth(true)

                navigate(RENTAL_ROUTE)
            }

        } catch (e) {
            alert(e.response.data.message)
        }
        getCars(null,null,null,null).then(data=>{
            car.setCar(data)

        })


    }
    return (
        <Container className="d-flex justify-content-center align-items-center"
                   style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    {isLogin ?
                        <div>

                            <Form.Control
                                name="Email"
                                onBlur={e => blurHandler(e)}
                                className="mt-3"
                                placeholder="Введите Email"
                                value={Email}
                                onChange={e => emailHandler(e)}
                            />
                            {(emailDirty && EmailError) &&
                                <p className="mt-1" style={{color: 'red', fontSize: 10}}>{EmailError}</p>}
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите пароль"
                                name="Password"
                                onBlur={e => blurHandler(e)}

                                value={Password}
                                type="password"
                                onChange={e => passwordHandler(e)}
                            />
                            {(PasswordDirty && PasswordError) &&
                                <p className="mt-1" style={{color: 'red', fontSize: 10}}>{PasswordError}</p>}
                        </div> :
                        <div>
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите Имя"
                                name="FirstName"
                                onBlur={e => blurHandler(e)}

                                value={FirstName}
                                onChange={e => firstNameHandler(e)}
                            />
                            {(FirstNameDirty && FirstNameError) &&
                                <p className="mt-1" style={{color: 'red', fontSize: 10}}>{FirstNameError}</p>}
                            <Form.Control
                                className="mt-3"
                                name="LastName"
                                placeholder="Введите Фамилию"
                                value={LastName}
                                onBlur={e => blurHandler(e)}
                                onChange={e => lastNameHandler(e)}
                            />
                            {(LastNameDirty && LastNameError) &&
                                <p className="mt-1" style={{color: 'red', fontSize: 10}}>{LastNameError}</p>}
                            <Form.Control
                                name="Email"
                                onBlur={e => blurHandler(e)}
                                className="mt-3"
                                placeholder="Введите Email"
                                value={Email}
                                onChange={e => emailHandler(e)}
                            />
                            {(emailDirty && EmailError) &&
                                <p className="mt-1" style={{color: 'red', fontSize: 10}}>{EmailError}</p>}
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите пароль"
                                name="Password"
                                onBlur={e => blurHandler(e)}

                                value={Password}
                                type="password"
                                onChange={e => passwordHandler(e)}
                            />
                            {(PasswordDirty && PasswordError) &&
                                <p className="mt-1" style={{color: 'red', fontSize: 10}}>{PasswordError}</p>}
                            <Form.Control
                                className="mt-3"
                                name="Number"
                                onBlur={e => blurHandler(e)}

                                placeholder="Введите номер телефона"
                                value={PhoneNumber}
                                onChange={e => phonenumberHandler(e)}
                                type="text"
                            />
                            {(PhoneNumberDirty && PhoneNumberError) &&
                                <p className="mt-1" style={{color: 'red', fontSize: 10}}>{PhoneNumberError}</p>}
                        </div>
                    }


                    <Form className="d-inline-flex justify-content-between mt-3">
                        {isLogin ?
                            <div>
                                <span>Нет аккаунта?</span>

                                <NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink>
                            </div> :
                            <div>
                                <span>Есть аккаунт?</span>

                                <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
                            </div>
                        }
                        <Button variant="outline-success" onClick={click}>{isLogin ? 'Войти' : 'Регистрация'}</Button>

                    </Form>
                </Form>
            </Card>
        </Container>


    );
});

export default Auth;


