import React, {Component} from 'react'
import logo from '../asets/logo.png'
import {Link} from 'react-router-dom'
import {Row, Col, Form, FormGroup, Label, Input} from 'reactstrap'
class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password:''
        }
    }
    register = (e) =>{
        e.preventDefault()
        
        this.props.history.push('/home')
    }
    render(){
        return(
            <>
            <Row className="h-100 no-gutters">
                <Col xs="8" className="h-100 side-left w-100">
                    <div className='d-flex flex-column justify-content-between darker w-100 h-100'>
                        <div className="p-5 font-weight-bold display-3 text-white"> Book is a window to the world</div>
                        <div className="p-5 text-white"> Photo by by Mark Pan4ratte on Unsplas</div>
                    </div>
                </Col>
                <Col xs="4" className='h-100 w-100 d-flex flex-column justify-content-between '>
                    <div className='d-flex justify-content-end'>
                        <img className='p-3' src={logo} alt="logo"/>
                    </div>
                    <div className='flex-grow-1 d-flex justify-content-center align-items-center'>
                        <Form className='w-100 p-5'>
                            <h1>Login</h1>
                            <p>Hi, Welcome Back to MyLibrary</p>
                            <FormGroup>
                                <Label className='w-100'>
                                    <Input onChange={e => this.setState({email: e.target.value})} className="email" type="email" placeholder="Email"/>
                                </Label>
                            </FormGroup>
                            <FormGroup>
                                <Label className='w-100'>
                                    <Input onChange={e => this.setState({password: e.target.value})} className="password"type="password" placeholder="Password"/>
                                </Label>
                            </FormGroup>
                            <div className='d-flex flex-row justify-content-between'>
                                <FormGroup check>
                                <Label check>
                                    <Input type='checkbox' />
                                    <span>Remember Me</span>
                                </Label>
                                </FormGroup>
                                <div>Forgot Password</div>
                            </div>
                            <div className='d-flex flex-row justify-content-between mt-2'>
                                <Input onClick={this.register} type="submit" className='w-50 mt-2 mr-2 ml-2 text-white bg-secondary' value="LOG IN"/>
                                <Link className='w-50 ml-2 btn' to={{pathname: '/register'}}>
                                    <Input type="submit"  value="SIGN UP"/>
                                </Link>
                            </div>
                        </Form>
                    </div>
                    <div className='d-flex flex-column p-3 text-muted'>
                        <div>By signing up, you agree to Book’s</div>
                        <div className='text-dark'>Terms and Conditions &amp; Privacy Policy</div>
                    </div>
                </Col>
            </Row>
            </>
        )
    }
}

export default Register