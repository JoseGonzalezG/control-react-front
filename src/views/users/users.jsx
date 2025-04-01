import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

import DivTable from '../../components/datatable/DivTable';

import {confirmation, CallUsers, CallCursos, CallCursosPage} from '../../util/functions';
import { PaginationControl } from "react-bootstrap-pagination-control";

export default function users(){
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(false);

    const [classLoad, setClassLoad] = useState('');
    const [classTable, setClassTable] = useState('d-none');
    const [rows, setRows] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(0);

    useEffect(() => {
      setLoading(true);
      CallCursosPage(page).then(({ data, total, per_page }) => {
          console.log("datos ::::: ", total);
          setCursos(data); // Establecer los datos de los cursos
          setRows(total); // Establecer el número total de registros
          setPageSize(per_page); // Establecer el tamaño de la página si es necesario
          setLoading(false);
          setClassTable('');
          setClassLoad('d-none');
      })
      .catch(() => {
          setLoading(false);
      });
  }, [page]); 

    const deleteUser = (id, name) =>{
      confirmation(id, name);
    }

    const getCursos = (page) => {
      CallCursosPage(page).then(({ data }) => {
        console.log("datos ::::: " + data)
        setLoading(false)
        setCursos(data)
        setClassTable('');
        setClassLoad('d-none');
      })
      .catch(() => {
        setLoading(false)
      })
    
    }

    const goPage = (p) => {
      setPage(p);
      getCursos(p);
    }

    return(
      <div className='container'>
        <DivTable col='12' off='4' classLoad={classLoad} classTable={classTable}>
          <table className='table table-bordered' id='tablaUsers'>
            <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Editar</th><th>Eliminar</th></tr></thead>

            <tbody>
              {cursos.map(u => (
                <tr key={u.id}>
                  <td>{u.clave_curso}</td>
                  <td>{u.nombre_curso}</td>
                  <td>{u.total_oferta}</td>
                  <td>
                    <Link to={'/users/' + u.id} className='btn btn-warning'>
                      <i className='fa-solid fa-edit'></i>
                    </Link>
                  </td>
                  <td>  
                    <button className="btn btn-danger" onClick={ev => deleteUser(u.id, u.clave_curso)}>
                      <i className='fa-solid fa-trash'></i>
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>           
          </table>
          <PaginationControl
    changePage={goPage} // Maneja el cambio de página
    next={true} // Habilita el botón "Next"
    limit={pageSize} // Establece el límite de registros por página
    page={page} // Página actual
    total={rows} // Total de registros
/>
        </DivTable>
      </div>       
    )
}