import Swal from "sweetalert2";
import axiosClient from "../../api/axiosClient";
//import { useStateContext } from "../contexts/contextprovider";


export const Alerta = (titulo, mensaje, icon) => {
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: icon
      });
}

export const AlertaCarga = () => {
    Swal.fire({
        title: "Cargando, por favor espere",
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
        }
    });
}

export const confirmation = async(id, name) => {
    const alert = Swal.mixin({buttonsStyling:true});
    alert.fire({
        title:'Are you sure delete ' +name+ ' ?',
        icon:'question', showCancelButton:true,
        confirmButtonText:'<i class="fa-solid fa-check"></i> Eliminar',
        cancelButtonText:'<i class="fa-solid fa-ban"></i> Cancelar'
    }).then( (result) => {

        axiosClient.delete(`/users/${id}`)
          .then(() => {
            window.location.href = '/users';
          });

        
    });
}


//llamado de cursos all
export function CallMaterias () {
    const peticion = axiosClient.get('/materias');
    const result = peticion.then((response) => response.data);
    return result;
}

//llamado de cursos por paginacion
export function CallCursosPage (page) {
    return axiosClient.get(`/cursos?page=${page}`)
    .then((response) => {
        console.log("TODOS LOS DATOS : " + response);
        const { data, total, per_page } = response.data; 
        console.log("Datos all:", total);
        return { data, total, per_page }; 
    })
    .catch(error => {
        console.error("Error al obtener los cursos", error);
        throw error;
    });

}

export const SaveMateria = async(payload) => {
    try {
        const response = await axiosClient.post('/materias',payload);
        const { success, message } = response.data; 
        return { success, message }; 
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
}

/*Actualiza los registros*/ 
export const UpdateMateria = async(id, clave_materia, nombre_materia) => {
    try {
      const payload = {
        id,
        clave_materia,
        nombre_materia
      }
        const response = await axiosClient.put(`/materias/${id}`, payload);
        const { success, message } = response.data; 
        return { success, message }; 
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
}

/*Elimina registros de forma fisica de la base de datos*/
export const EliminarRegistroCurso = async(id) => {
    axiosClient.delete(`/cursos/${id}`)
}

export default confirmation;