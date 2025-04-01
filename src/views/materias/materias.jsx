import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useEffect, useState, useRef } from "react";
import {AlertaCarga, Alerta, SaveMateria, UpdateMateria, EliminarRegistroCurso, CallMaterias} from './funcionesMaterias';
import DataTable from 'react-data-table-component';
import Modal from '../../components/Modal';
import DivInput from '../../components/DivInput'; 
import Swal from "sweetalert2";
import './materias.css';

const MyTable = () => {

    const navigate = useNavigate();
    const [materias, setMaterias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [clave_materia, setClave_Materia] = useState('');
    const [nombre_materia, setNombre_Materia] = useState('');
    const [id_registro, setId_Registro] = useState('');
    const [operacion, setOperacion] = useState(0);
    
    useEffect(()=> {
      //obtención de los datos a través de la funcion CallUsers
      getMateriasAll();
    }, []);
    
  // Columnas de la tabla
  const columns = [
    {
      name: 'Clave materia',
      selector: row => row.clave_materia,
      sortable: true,
      width: '130px',
    },
    {
      name: 'Nombre materia',
      selector: row => row.nombre_materia,
      sortable: true,
      width: '200px',
    },
    {
      name: 'Editar',
      cell: row => (
        <div>
        <Button variant="warning" className='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalMateria' 
        onClick={() => openModal(2, row.id, row.clave_materia, row.nombre_materia)}>
                <i className='fa-solid fa-edit'></i>
        </Button>

        </div>
      ),
    },
    {
        name: 'Eliminar',
        cell: row => (
          <div>
            <Button variant="danger" onClick={() => handleDelete(row.id, row.clave_materia)}>
                <i className='fa-solid fa-trash'></i>
            </Button>
          </div>
        ),
      },
  ];
  

  const getMateriasAll = () => {
    CallMaterias().then(({ data }) => {
      console.log(data)
      setMaterias(data)
      setLoading(false);
    })
    .catch(() => {
      
    })
  }

  const handleDelete = (id, clave_materia) => {

    const alert = Swal.mixin({buttonsStyling:true});
    alert.fire({
        title:'Realmente desea eliminar el registro ' +clave_materia+ ' ?',
        icon:'question', showCancelButton:true,
        confirmButtonText:'<i className="fa-solid fa-check"></i> Eliminar',
        cancelButtonText:'<i className="fa-solid fa-ban"></i> Cancelar'
    }).then( (result) => {
        if(result.isConfirmed){
              EliminarRegistroCurso(id).then(() => {
              getCursosAll();
            })
        }
    });
  };

  const openModal = (opcion, id, clave_materia, nombre_materia) => {
    if(opcion == 1){
      setClave_Materia("");
      setNombre_Materia("");
      setTitle("Agregar materia");
    }else{
      setTitle("Actualizando materia");
      setId_Registro(id);
      setClave_Materia(clave_materia);
      setNombre_Materia(nombre_materia);
    }
    setOperacion(opcion);
  };

  const Submit =  (ev) =>{
    AlertaCarga();
    ev.preventDefault();
    const payload = {
        clave_materia,
        nombre_materia
    }

    if(operacion == 1){
      SaveMateria(payload).then(({ success, message }) => {
        if(success === false){
            Alerta("", message, "error");
        }else{
          setClave_Materia("");
          setNombre_Materia("");
            Swal.close();
            Alerta(message, "", "success");
            getMateriasAll();
        }       
      })
      .catch(() => {
        Swal.close();        
      });
    }else{
      //Actualizacion del registro
      UpdateMateria(id_registro, clave_materia, nombre_materia).then(({ success, message }) => {
        Swal.close();
        Alerta(message, "", "success");
      })
      .catch(() => {
        Swal.close();        
      });
      getMateriasAll();
    }
  }


  return (
    <div className="table-container" style={{ marginTop: '2rem' }}>

        <div className="d-flex justify-content-between align-items-center mb-3">
          {/* Título centrado */}
          <h1 className="text-center flex-grow-1">Materias</h1>

          {/* Botón alineado a la derecha */}
          <button 
            className="btn btn-success" 
            data-bs-toggle="modal" 
            data-bs-target="#modalMateria" 
            onClick={() => openModal(1)}
          >
            Agregar materia
          </button>
        </div>

        {loading ? (
            <div className="d-flex justify-content-center">
            <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
            <DataTable
            //title="Cursos"
            columns={columns}
            data={materias}
            pagination
            responsive 
            paginationComponentOptions={{
              rowsPerPageText: 'Filas por página',  // Cambiar el texto aquí
              rangeSeparatorText: 'de'
          }}
            //className="my-custom-table"
        />  
        )}

        

        <Modal title={title} modal="modalMateria">
          <div className='modal-body'>
             <form onSubmit={Submit}>
                <DivInput type='text' icon='fa-key' value={clave_materia}
                  className='form-control' placeholder='Clave materia' required='required'
                  handleChange={(e) => setClave_Materia(e.target.value)} 
                />
                <DivInput type='text' icon='fa-file' value={nombre_materia}
                  className='form-control' placeholder='Nombre materia' required='required'
                  handleChange={(e) => setNombre_Materia(e.target.value)} 
                />    
                <div className='d-grid col-10 mx-auto'>                                   
                  <button className='btn btn-success'>
                    Guardar
                  </button>        
                </div>
              </form>
          </div>
        </Modal>

    </div>
  );
};

export default MyTable;