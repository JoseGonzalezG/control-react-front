import logo from '/colegio-icon.png';
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar, NavDropdown, Button } from 'react-bootstrap'
import Swal from "sweetalert2"
import { useStateContext } from "../contexts/contextprovider";
import axiosClient from "../api/axiosClient";

import '../NavBar.css'

  
export default function App(){
  
  const {setUser, setToken} = useStateContext();

  const Submit =  () =>{
    axiosClient.get('/logout')
    .then(({}) => {
       setUser(null)
       setToken(null)
    })
}

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
            <NavDropdown title="Products">
              <NavDropdown.Item href="#products/tea">Tea</NavDropdown.Item>
              <NavDropdown.Item href="#products/coffee">Coffee</NavDropdown.Item>
              <NavDropdown.Item href="#products/chocolate">Chocolate</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#products/promo">Promo</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#blog">Blog</Nav.Link>
            <Nav.Link href="#about-us">About Us</Nav.Link>
            <Nav.Link href="#contact-us">Contact Us</Nav.Link>
          </Nav>
          
          <Nav.Link href="#blog" > 
          <i className='fa fa-sign-out text-white'></i>
          </Nav.Link>

          <Button onClick={() => Submit()}>Reset</Button>

                    
            
        
        </Navbar.Collapse>

      </Navbar>
      <div className="content">
        
      </div>
    </div>
  );
}