import Swal from "sweetalert2";
import axiosClient from "../api/axiosClient";

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

export const EliminarRegistro = async(id) => {
    axiosClient.delete(`/users/${id}`)
}

export function CallUsers () {
    const peticion = axiosClient.get('/users');
    const result = peticion.then((response) => response.data);
    return result;
}




export default confirmation;