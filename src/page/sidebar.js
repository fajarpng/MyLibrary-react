import React, {Component} from 'react'
import logo from '../asets/logo-white.png'
import {Link} from 'react-router-dom'
import {Navbar, Button, NavbarToggler, Nav, NavItem, Collapse} from 'reactstrap'
import { connect } from 'react-redux'

import { logout } from '../redux/actions/auth'

class Sidebar extends Component{
    constructor(props) {
        super(props)
        this.state = {
            show : false
        }
    }
    toggleNavbar = () => {
        this.setState({show: !this.state.show})
    }
    logOut = () => {
        this.props.logout()
    }
    render(){
        const {name, token} = this.props.auth
        var isLogin
        if(token !== null){
            isLogin = true
        }else{isLogin = false}
        return(
            <>
                <Navbar className='w-100 b-shadow fixed-top z-pd bg-dark justify-content-between nav-dashboard' light expand='sm'>
                    <img className="icon logo mr-5 d-none d-md-block" src={logo} alt="logo"/>
                    <NavbarToggler className=' bg-light' onClick={this.toggleNavbar} />
                    <Collapse isOpen={this.state.show} navbar>
							<Nav className="mr-auto" navbar>
								<NavItem>
                                    <Link to='/' className="text-decoration-none nav-link text-light">Home</Link>
								</NavItem>
                                <NavItem>
                                    <Link to='/trans' className="text-decoration-none nav-link text-light">History</Link>
								</NavItem>
                                <NavItem>
                                    <Link to='/genre' className="text-decoration-none nav-link text-light">Genre</Link>
								</NavItem>
                                <NavItem>
                                    <Link to='/author' className="text-decoration-none nav-link text-light">Author</Link>
								</NavItem>
                            </Nav>
                    </Collapse>
                    {!isLogin ?
                        (<div className="pl-2 d-flex flex-row">
                            <Link to='/register' className="pl-3 text-decoration-none nav-link">
                                <Button className='btn-dark btn-outline-light'>Sign Up</Button>
                            </Link>
                            <Link to='/login' className="text-decoration-none nav-link">
                                <Button className='btn-light'>Log In</Button>
                            </Link>
                        </div>) : 
                        (<div className="d-flex flex-row align-items-center justify-content-between">
                            <div className="mr-2 align-self-center text-light">
                                Hi, {name}
                            </div>
                            <Button onClick={this.logOut} className='btn-dark btn-outline-light'>Logout</Button>
                        </div>)
                    }
                </Navbar>
            </>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = { logout }
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)