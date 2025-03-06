import logo from '/colegio-icon.png';
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

import '../NavBar.css'

function App() {
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
            <Nav.Link href="#">Sobre nosotros</Nav.Link>
            <Nav.Link href="#">Contactanos</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="content">
        
      </div>
    </div>
  );
}

export default App;