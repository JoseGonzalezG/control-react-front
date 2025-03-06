import Swal from "sweetalert2";
import axiosClient from "../api/axiosClient";
import { useStateContext } from "../contexts/contextprovider";


export const Alerta = (titulo, mensaje, icon) => {
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: icon
      });
}

export const AletaCarga = () => {
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

export const EliminarRegistro = async(id) => {
    axiosClient.delete(`/users/${id}`)
}

export function CallUsers () {
    const peticion = axiosClient.get('/users');
    const result = peticion.then((response) => response.data);
    return result;
}


export const logout = async(id, name) => {
    const {setUser, setToken} = useStateContext();
    axiosClient.get('/logout')
        .then(({}) => {
           setUser(null)
           setToken(null)
        });
}




export default confirmation;