import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import Navbar from "./Navbar";

export default function GuestLayout(){
    const {token} = useStateContext();
    if(token){
       return <Navigate to='/'/>
    }

    return(
        <div>   
            <Navbar />
            <Outlet />
        </div>
    )
}