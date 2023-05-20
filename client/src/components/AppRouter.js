import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom"
import { authRoutes, publicRoutes } from "../routes";
import Auth from "../pages/Auth";
import { RENTAL_ROUTE } from "../utils/consts";
import { Context } from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const { user } = useContext(Context)


    return (
        <Routes>
            {user.isAuth===true && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} exact />
            )},
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            <Route path='*' element={<Navigate to={RENTAL_ROUTE} />} />
        </Routes>
    )
})
export default AppRouter;