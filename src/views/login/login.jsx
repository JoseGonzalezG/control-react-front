import axios from 'axios';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { useStateContext } from '../../contexts/contextprovider';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import DivInput from '../../components/DivInput';
import {AletaCarga, Alerta} from '../../util/functions';
import Swal from "sweetalert2";

import './login.css'

export default function login(){

    const {setUser, setToken} = useStateContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const fondo = {
        backgroundImage: `url("https://colegiodenotariosedomex.org.mx/assets/img/bgd_header.jpg")`,
        backgroundColor: "lightblue",
        height: "100vh",
            flex: 1,
            justifyContent: 'center',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
    };

    const Submit =  (ev) =>{
        AletaCarga();
        ev.preventDefault();
        const payload = {
            email,
            password
        }
        axiosClient.post('/login',payload).then(({data})=>{
            if(data.success === false){
                Alerta("", data.message, "warning");
            }else{
                setUser(data.user);
                setToken(data.token);
                Swal.close();
            }
        }).catch(err => {
            const response = err.response;
            if(response && response.status === 200){
                console.log(response.data.errors);
            }
        });
    }

    return(
        <div className='container-fluid d-flex justify-content-center fondoLogin' >
            <div className='d-flex align-items-center'>
                    <div className='card border border-danger'>
                    <div className='card-header mb-3 cardColor bg-gradient text-white' >
                            <h3>Iniciar Sesion</h3>
                        </div>
                        <div className='card-body border'>
                            <form onSubmit={Submit}>
                                <DivInput type='email' icon='fa-at' value={email}
                                className='form-control' placeholder='Email' required='required'
                                handleChange={(e) => setEmail(e.target.value)} />

                                <DivInput type='password' icon='fa-key' value={password}
                                className='form-control' placeholder='Password' required='required'
                                handleChange={(e) => setPassword(e.target.value)} />    

                                
                                <div className='d-grid col-10 mx-auto'>                                   
                                    <button className='btn btn-success'>
                                        <i className='fa-solid fa-door-opem'></i> Login
                                    </button>        
                                </div>
                                
                                <p className='message'>
                                    No estás registrado? <Link to= '/register'>Crea una nueva cuenta</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                
            </div>
        </div>
    )
}