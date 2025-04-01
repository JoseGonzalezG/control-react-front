import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useEffect, useState, useRef } from "react";
import {AlertaCarga, Alerta, CallCursos, SaveCurso, UpdateCurso, EliminarRegistroCurso} from './funcionesCursos';
import DataTable from 'react-data-table-component';
import Modal from '../../components/Modal';
import DivInput from '../../components/DivInput'; 
import Swal from "sweetalert2";
import './cursos.css';

const MyTable = () => {

    const navigate = useNavigate();
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [clave_curso, setClave_Curso] = useState('');
    const [nombre_curso, setNombre_Curso] = useState('');
    const [total_oferta, setTotal_Oferta] = useState('');
    const [id_registro, setId_Registro] = useState('');
    const [operacion, setOperacion] = useState(0);
    
    useEffect(()=> {
      //obtención de los datos a través de la funcion CallUsers
      getCursosAll();
    }, []);
    
  // Columnas de la tabla
  const columns = [
    {
      name: 'Clave curso',
      selector: row => row.clave_curso,
      sortable: true,
      width: '130px',
    },
    {
      name: 'Nombre curso',
      selector: row => row.nombre_curso,
      sortable: true,
      width: '200px',
    },
    {
      name: 'Total oferta',
      selector: row => row.total_oferta,
      sortable: true,
      width: '130px',
    },
    {
      name: 'Editar',
      cell: row => (
        <div>
        <Button variant="warning" className='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalCurso' 
        onClick={() => openModal(2, row.id, row.clave_curso, row.nombre_curso, row.total_oferta)}>
                <i className='fa-solid fa-edit'></i>
        </Button>

        </div>
      ),
    },
    {
        name: 'Eliminar',
        cell: row => (
          <div>
            <Button variant="danger" onClick={() => handleDelete(row.id, row.clave_curso)}>
                <i className='fa-solid fa-trash'></i>
            </Button>
          </div>
        ),
      },
  ];
  

  const getCursosAll = () => {
    CallCursos().then(({ data }) => {
      console.log(data)
      setCursos(data)
      setLoading(false);
    })
    .catch(() => {
      
    })
  }

  const handleDelete = (id, clave_curso) => {

    const alert = Swal.mixin({buttonsStyling:true});
    alert.fire({
        title:'Realmente desea eliminar el registro ' +clave_curso+ ' ?',
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

  const openModal = (opcion, id, clave_curso, nombre_curso, total_oferta) => {
    if(opcion == 1){
      setClave_Curso("");
      setNombre_Curso("");
      setTotal_Oferta("");
      setTitle("Agregar curso");
    }else{
      setTitle("Actualizando curso");
      setId_Registro(id);
      setClave_Curso(clave_curso);
      setNombre_Curso(nombre_curso);
      setTotal_Oferta(total_oferta);
    }
    setOperacion(opcion);
  };

  const Submit =  (ev) =>{
    AlertaCarga();
    ev.preventDefault();
    const payload = {
        clave_curso,
        nombre_curso,
        total_oferta
    }

    if(operacion == 1){
      SaveCurso(payload).then(({ success, message }) => {
        if(success === false){
            Alerta("", message, "error");
        }else{
            setClave_Curso("");
            setNombre_Curso("");
            setTotal_Oferta("");
            Swal.close();
            Alerta(message, "", "success");
            getCursosAll();
        }       
      })
      .catch(() => {
        Swal.close();        
      });
    }else{
      //Actualizacion del registro
      UpdateCurso(id_registro, clave_curso, nombre_curso, total_oferta).then(({ success, message }) => {
        Swal.close();
        Alerta(message, "", "success");
      })
      .catch(() => {
        Swal.close();        
      });
      getCursosAll();
    }
  }


  return (
    <div className="table-container" style={{ marginTop: '2rem' }}>

        <div className="d-flex justify-content-between align-items-center mb-3">
          {/* Título centrado */}
          <h1 className="text-center flex-grow-1">Cursos</h1>

          {/* Botón alineado a la derecha */}
          <button 
            className="btn btn-success" 
            data-bs-toggle="modal" 
            data-bs-target="#modalCurso" 
            onClick={() => openModal(1)}
          >
            Agregar curso
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
            data={cursos}
            pagination
            responsive 
            paginationComponentOptions={{
              rowsPerPageText: 'Filas por página',  // Cambiar el texto aquí
              rangeSeparatorText: 'de'
          }}
            //className="my-custom-table"
        />  
        )}

        

        <Modal title={title} modal="modalCurso">
          <div className='modal-body'>
             <form onSubmit={Submit}>
                <DivInput type='text' icon='fa-key' value={clave_curso}
                  className='form-control' placeholder='Clave curso' required='required'
                  handleChange={(e) => setClave_Curso(e.target.value)} 
                />
                <DivInput type='text' icon='fa-file' value={nombre_curso}
                  className='form-control' placeholder='Nombre Curso' required='required'
                  handleChange={(e) => setNombre_Curso(e.target.value)} 
                />    
                <DivInput type='number' min ='0' icon='fa-sort-numeric-desc' value={total_oferta}
                  className='form-control' placeholder='Total Oferta' required='required'
                  handleChange={(e) => setTotal_Oferta(e.target.value)} 
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