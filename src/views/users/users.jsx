import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

import DivTable from '../../components/datatable/DivTable';

import {confirmation, CallUsers} from '../../util/functions';

export default function users(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [classLoad, setClassLoad] = useState('');
    const [classTable, setClassTable] = useState('d-none');

    useEffect(()=> {
        //getUsers();
      CallUsers().then(({ data }) => {
        console.log(data)
        setLoading(false)
        setUsers(data)
        setClassTable('');
        setClassLoad('d-none');
      })
      .catch(() => {
        setLoading(false)
      })
    }, []);

    //metodo anterior para obtener los datos de los usuarios
    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
          .then(({ data }) => {
            setLoading(false)
            setUsers(data.data)
            setClassTable('');
            setClassLoad('d-none');
          })
          .catch(() => {
            setLoading(false)
          })
      }

    const deleteUser = (id, name) =>{
      confirmation(id, name);
    }

    return(
      <div className='container'>
        <DivTable col='12' off='4' classLoad={classLoad} classTable={classTable}>
          <table className='table table-bordered' id='tablaUsers'>
            <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Editar</th><th>Eliminar</th></tr></thead>

            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <Link to={'/users/' + u.id} className='btn btn-warning'>
                      <i className='fa-solid fa-edit'></i>
                    </Link>
                  </td>
                  <td>  
                    <button className="btn btn-danger" onClick={ev => deleteUser(u.id, u.name)}>
                      <i className='fa-solid fa-trash'></i>
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>           
          </table>
        </DivTable>
      </div>       
    )
}