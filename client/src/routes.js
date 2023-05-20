import Admin from "./pages/Admin"

import {
    ADMIN_ROUTE,
    CAR_ROUTE,
    LOGIN_ROUTE,
    PROFILE_ROUTE,
    REGISTRATION_ROUTE,
    RENTAL_ROUTE
} from "./utils/consts"
import Auth from "./pages/Auth"
import Car from "./pages/CarPage"
import Rental from "./pages/Rental"
import UsersRentalPage from "./pages/UsersRentalPage";
import ChatComponent from "./components/chatComponent";

export const authRoutes =[
    {
        path:ADMIN_ROUTE,
        Component: Admin
       
     }

    ,
    {
        path: PROFILE_ROUTE,
        Component: UsersRentalPage

    }
]

export const publicRoutes=[
    {
        path: RENTAL_ROUTE,
        Component: Rental

    },
    {
        path: LOGIN_ROUTE,
        Component: Auth

    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth

    },
    {
        path: CAR_ROUTE+'/:id',
        Component: Car

    }
]