import React, {useContext} from "react";
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap"
import {NavLink} from "react-router-dom"
import {ADMIN_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, RENTAL_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite"

import {useNavigate} from 'react-router-dom'
import {CarFront, PersonLinesFill} from "react-bootstrap-icons";

const NavBar = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()
    const {wssock} = useContext(Context)
    const logOut=()=>{
        user.setUser({})
        sessionStorage.setItem('token', '')
        user.setIsAuth(false)
       if( wssock.socket.length !== 0) {
           wssock.socket.close()
       }
        wssock.setWs([])

        navigate(RENTAL_ROUTE)
    }

    return (
        <Navbar bg="light" color="red" expand="lg">
            <Container fluid>

                <NavLink className="font-Arial fw-bold" style={{textDecoration:"none",color:"primary",fontSize:30}} to="/rental"><CarFront/> RentalCar</NavLink>

                {user.isAuth && user.user.role==='ADMIN'  ?
                    <Nav className="ml-auto">
                        <Nav.Link  onClick={()=>{navigate(ADMIN_ROUTE)}}  >Админ</Nav.Link>
                        <Nav.Link  onClick={()=>{logOut() }}>Выйти</Nav.Link>

                    </Nav> :
                    user.isAuth && user.user.role ==='USER'?
                        <Nav className="ml-auto">
                            <Nav.Link  onClick={()=>{navigate(PROFILE_ROUTE)}}  ><PersonLinesFill/></Nav.Link>
                            <Nav.Link  onClick={()=>{logOut() }}>Выйти</Nav.Link>

                        </Nav>
                        : <Nav className="ml-auto">
                        <Nav.Link onClick={()=>{navigate(LOGIN_ROUTE)}} >Авторизация</Nav.Link>

                    </Nav>}

            </Container>
        </Navbar >
    )
})

export default NavBar;