import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../Pages/Home';
import CreateHouse from '../Pages/CreateHouse';
import MyHouses from '../Pages/MyHouses';
import RentEstimate from '../Pages/RentEstimate';
import UpdateHouse from '../Pages/UpdateHouse';
import HouseDetails from '../Pages/HouseDetails';

const fetchHouseById = async ({ params }) => {
    try {
        const response = await fetch(`https://mern-rent-here.onrender.com/all-houses/${params.id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response
    } catch (error) {
        console.error('Fetch error: ', error);
        throw error; // Let the router handle the error
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
            }
        ],
    },
]);

export default router;
