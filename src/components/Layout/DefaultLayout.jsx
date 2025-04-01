import { Outlet, Navigate} from "react-router-dom";
import { useStateContext } from "../../contexts/contextprovider";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import axiosClient from "../../api/axiosClient";
import Nav from "../Navbar/Navbar_users";


export default function DefaultLayout(){
    const {user, token, setUser, setToken} = useStateContext();
    if(!token){
       return <Navigate to='/login'/>
    }

    useEffect(() => {
        /*axiosClient.get('/user')
          .then(({data}) => {
             setUser(data)
          })*/
      }, [])

    return(
        <div>
            <Nav />
            <div id="DefaultLayout">
                <div  className='container-fluid d-flex justify-content-center fondoLogin'>
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
        
    )
}