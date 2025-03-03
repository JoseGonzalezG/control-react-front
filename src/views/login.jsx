import axios from 'axios';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { useStateContext } from '../contexts/contextprovider';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import DivInput from '../components/DivInput';

export default function login(){

    const {setUser, setToken} = useStateContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Submit =  (ev) =>{
        ev.preventDefault();
        const payload = {
            email,
            password
        }
        axiosClient.post('/login',payload).then(({data})=>{
            setUser(data.user);
            setToken(data.token);
        }).catch(err => {
            const response = err.response;
            if(response && response.status === 422){
                console.log(response.data.errors);
            }
        });
    }

    return(
        <div className='container-fluid'>
            <div className='row mt-5'>
                <div className='col-md-4 offset-md-4'>
                    <div className='card border border-dark'>
                    <div className='card-header bg-dark border border-dark text-white'>
                            Iniciar Sesion
                        </div>
                        <div className='card-body'>
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
                                    Not Registered? <Link to= '/register'>Create a new account</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}