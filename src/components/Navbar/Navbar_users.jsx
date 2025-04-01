import logo from '/colegio-icon.png';
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar, NavDropdown, Button, Image } from 'react-bootstrap'
import Swal from "sweetalert2"
import { useStateContext } from "../../contexts/contextprovider";
import axiosClient from "../../api/axiosClient";

import '../../NavBar.css'

  
export default function App(){

  const {user, token, setUser, setToken} = useStateContext();

  const Submit =  () =>{
    axiosClient.get('/logout')
    .then(({}) => {
       setUser(null)
       setToken(null)
    })
}

const imageStyle = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  objectFit: 'cover',  // Asegura que la imagen se recorte adecuadamente
};

  return (
    <div className="App">
      <Navbar className='navColor' variant="dark"
        sticky="top" expand="sm" collapseOnSelect>
        <Navbar.Brand>
          <img src={logo} width="50px" height="60px" style={{marginRight:1+'em', marginLeft:1+'em'}} />{' '}
          Control Escolar
        </Navbar.Brand>

        <Navbar.Toggle className="coloring" />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href="/users">Usuarios</Nav.Link>
            <Nav.Link href="#about-us">Profesores</Nav.Link>
            <NavDropdown title="Administración">
              <NavDropdown.Item href="/cursos">Cursos</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/materias">Materias</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/cursos">Asignar materia a curso</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>

          </Nav>
          <Nav className='ms-auto' >
            <NavDropdown title={
              <span style={{ alignItems: 'center' }}>
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRapR6_QJmCDiRr11WSkiQ9ufMt0U5_uewfRA&s"  // Aquí pones la URL de la imagen del usuario
                  roundedCircle
                  style={{ width: 45, height: 45, marginRight: '10px' }} // Ajusta el tamaño de la imagen
                />
                {user.name}
              </span>
            }>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#" onClick={() => Submit()}>Salir</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          
        </Navbar.Collapse>

      </Navbar>
      <div className="content">

      </div>
    </div>
  );
}