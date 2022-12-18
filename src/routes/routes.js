import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Main from "../layout/Main";
import Wallet from '../components/Wallet';
import Profile from '../components/Profile';
import PrivetRoute from "./PrivetRoute";


const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorPage />,
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/wallet',
                element: <PrivetRoute><Wallet></Wallet></PrivetRoute>
            },
            {
                path: '/profile',
                element: <PrivetRoute><Profile></Profile></PrivetRoute>
            },
        ]
    }
])
export default router