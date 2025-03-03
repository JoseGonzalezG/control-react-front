import { Link, useNavigate } from "react-router-dom"


const Nav = () => {
    const go = useNavigate();
    return(
        <nav className='navbar navbar-expand-lg navbar-white bg-info'> 
            <div className='container-fluid'>
                <a className='navbar-brand'>CONTROL ESCOLAR</a>
                <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#nav' aria-controls='navbarSupportedContent'>
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
    )

}

export default Nav