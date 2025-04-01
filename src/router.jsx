import { createBrowserRouter } from "react-router-dom";
import Login from './views/login/login.jsx';
import Register from './views/register.jsx';
import DefaultLayout from './components/Layout/DefaultLayout.jsx';
import GuestLayout from './components/Layout/GuestLayout.jsx';
import Users from './views/users/users.jsx';
import UserForm from './views/users/UserForm.jsx';
import Table from './views/users/table.jsx';
import Cursos from './views/cursos/cursos.jsx';
import Materias from './views/materias/materias.jsx';

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
                path: '/cursos',
                element: <Cursos />,
            },  
            {
                path: '/materias',
                element: <Materias />,
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