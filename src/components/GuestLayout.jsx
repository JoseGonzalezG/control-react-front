import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import Nav from "./Navbar";

export default function GuestLayout(){
    const {token} = useStateContext();
    if(token){
       return <Navigate to='/'/>
    }

    return(
        <div>   
            <Nav />
            <Outlet />
        </div>
    )
}