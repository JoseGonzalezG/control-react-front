import { createBrowserRouter } from "react-router-dom";
import Login from './views/login.jsx';
import Register from './views/register.jsx';
import DefaultLayout from './components/DefaultLayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import Users from './views/users/users.jsx';
import UserForm from './views/users/UserForm.jsx';
import Table from './views/users/table.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/users',
                element: <Users />,
            },
            {
                path: '/table',
                element: <Table />,
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate"/>
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate" />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element:  <Register />,
            }
        ]
    },

]);

export default router;