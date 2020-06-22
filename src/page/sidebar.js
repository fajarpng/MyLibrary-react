import React, {Component} from 'react'
import logo from '../asets/logo-white.png'
import {Link} from 'react-router-dom'
import {Navbar} from 'reactstrap'

class Sidebar extends Component{
    render(){
        return(
            <>
                <Navbar className='w-100 b-shadow ps-fixed z-pd bg-dark justify-content-start'>
                    <img className="icon logo mr-5" src={logo} alt="logo"/>
                    <div className="ml-2 d-flex flex-row">
                        <Link to='/' className="text-decoration-none nav-link text-light">Home</Link>
                        <Link to='/trans' className="text-decoration-none nav-link text-light">History</Link>
                        <Link to='/genre' className="text-decoration-none nav-link text-light">Genre</Link>
                        <Link to='/author' className="text-decoration-none nav-link text-light">Author</Link>
                        {/* <Button className='btn-light dropdown-toggle' data-toogle='dropdown'>All Genres</Button> */}
                    </div>
                </Navbar>
            </>
        )
    }
}

export default Sidebar