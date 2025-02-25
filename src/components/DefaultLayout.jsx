import { Outlet, Navigate} from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import axiosClient from "../axiosClient";


export default function DefaultLayout(){
    const {user, token, setUser, setToken} = useStateContext();
    if(!token){
       return <Navigate to='/login'/>
    }
    
    const onLogout =  (ev) =>{
        ev.preventDefault();
        axiosClient.get('/logout')
        .then(({}) => {
           setUser(null)
           setToken(null)
        })
    }

    useEffect(() => {
        axiosClient.get('/user')
          .then(({data}) => {
             setUser(data)
          })
      }, [])

    return(
        <div id="DefaultLayout">
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout"> Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
            
        </div>
    )
}