import React from "react";
import axiosClient from "../api/axiosClient";
import { useContext } from "react";
import { StateContext } from "../contexts/contextprovider";



export const Salir =  () =>{
    const { state, setState } = useContext(StateContext);

    axiosClient.get('/logout')
    .then(({}) => {
       setUser(null)
       setToken(null)
    });
  }