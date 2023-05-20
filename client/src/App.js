import React, {useContext, useEffect, useState} from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import {getCars} from "./http/carAPI";

const App= observer(()=> {
  const {user,car} = useContext(Context)

  const [loading,setLoading] = useState(true)
  useEffect(()=>{

    check().then(data=>{
      user.setIsAuth(true)
      user.setUser(data)
    }).finally(()=>{setLoading(false)})
    getCars(null,null,null,null).then(data=>{
      car.setCar(data)
    })


  },[])
  if(loading){
    return <Spinner animation={"grow"}/>
  }
  return (
    <BrowserRouter>
    <NavBar/>
      <AppRouter />

    </BrowserRouter>
  );
})

export default App;
