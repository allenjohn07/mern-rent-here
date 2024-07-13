import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import Home from '../Pages/Home.jsx';
import CreateHouse from '../Pages/CreateHouse.jsx';
import MyHouses from '../Pages/MyHouses.jsx';
import RentEstimate from '../Pages/RentEstimate.jsx';
import UpdateHouse from '../Pages/UpdateHouse.jsx';
import HouseDetails from '../Pages/HouseDetails.jsx';
import Login from '../Pages/Login.jsx';
import Register from '../Pages/Register.jsx';
import { instance } from '../config/axios.js';
import EmailVerification from '../Pages/EmailVerification.jsx';
import PhoneVerification from '../Pages/PhoneVerification.jsx';


const fetchHouseById = async ({ params }) => {
    try {
        const response = await instance(`/houses/all-houses/${params.id}`);
        return response.data;
    } catch (error) {
        console.error('Fetch error: ', error);
        throw error;
    }
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/post-house",
                element: <CreateHouse />,
            },
            {
                path: "/my-houses",
                element: <MyHouses />,
            },
            {
                path: "/rent-estimate",
                element: <RentEstimate />,
            },
            {
                path: "/edit-house/:id",
                element: <UpdateHouse />,
                loader: fetchHouseById,
            },
            {
                path: "/house/:id",
                element: <HouseDetails />,
            },
            {
                path: "/auth/login",
                element: <Login />,
            },
            {
                path: "/auth/register",
                element: <Register />,
            },
            {
                path: "/verification/email",
                element: <EmailVerification />,
            },
            {
                path:"/verification/phone",
                element:<PhoneVerification/>
            }
        ],
    },
]);

export default router;

