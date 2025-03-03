import React from 'react';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import {EliminarRegistro, CallUsers} from '../../util/functions';


const MyTable = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
      //obtención de los datos a través de la funcion CallUsers
      CallUsers().then(({ data }) => {
        console.log(data)
        setUsers(data)
        setLoading(false);
      })
      .catch(() => {
        
      })
    }, []);
    
  // Columnas de la tabla
  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Editar',
      cell: row => (
        <div>
            <Link to={'/users/' + row.id} className='btn btn-warning'>
                      <i className='fa-solid fa-edit'></i>
            </Link>
        </div>
      ),
    },
    {
        name: 'Eliminar',
        cell: row => (
          <div>
            <Button variant="danger" onClick={() => handleDelete(row.id, row.name)}>
                <i className='fa-solid fa-trash'></i>
            </Button>
          </div>
        ),
      },
  ];

  // Funciones para los botones de acción
  const handleEdit = (row) => {
    alert(`Editando: ${row.nombre}`);
    // Aquí va la logica del negocio
  };

  const handleDelete = (id, name) => {

    const alert = Swal.mixin({buttonsStyling:true});
    alert.fire({
        title:'Realmente desea eliminar el registro de ' +name+ ' ?',
        icon:'question', showCancelButton:true,
        confirmButtonText:'<i className="fa-solid fa-check"></i> Eliminar',
        cancelButtonText:'<i className="fa-solid fa-ban"></i> Cancelar'
    }).then( (result) => {
        if(result.isConfirmed){
            EliminarRegistro(id).then(() => {
              //Se crea una nueva lista, omitiendo el registro eliminado
              const updateData = users.filter(item => item.id !== id);
              setUsers(updateData);
              console.log(updateData);
            })
        }
    });
  };

  return (
    <div>
        {loading ? (
            <div className="d-flex justify-content-center">
            <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
            <DataTable
            title="Usuarios"
            columns={columns}
            data={users}
            pagination
            className="my-custom-table"
        />  
        )}
      
    </div>
  );
};

export default MyTable;