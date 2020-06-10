import React, {Component} from 'react'
import logo from '../asets/logo.png'
import {Link} from 'react-router-dom'
import {Row, Col, Form, FormGroup, Label, Input} from 'reactstrap'
import axios from 'axios'

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            user:'',
            email: '',
            password:''
        }
        this.register = this.register.bind(this)
    }
    register = async (e) =>{
        e.preventDefault()
        const {REACT_APP_URL} = process.env
        const data = {
            name: this.state.user,
            email: this.state.email,
            password: this.state.password,
            id_role: 1
        }
        const url = `${REACT_APP_URL}users`
        await axios.post(url, data).then( (response) => {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
           })
        this.props.history.push(`/home`)
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
                                <h1>Register</h1>
                                <p>Hi, Welcome to MyLibrary</p>
                                <FormGroup>
                                    <Label className='w-100'>
                                        <Input onChange={e => this.setState({user: e.target.value})} type="text" placeholder="Username"/>
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label className='w-100'>
                                        <Input onChange={e => this.setState({email: e.target.value})} type="email" placeholder="Email"/>
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label className='w-100'>
                                        <Input onChange={e => this.setState({password: e.target.value})} type="password" placeholder="Password"/>
                                    </Label>
                                </FormGroup>
                                <div className='d-flex flex-row justify-content-between mt-2'>
                                    <Input onClick={this.register} type="submit" className=' w-50 mt-2 mr-2 text-white bg-secondary' value="SIGN UP"/>
                                    <Link className='w-50 ml-2 btn' to={{pathname: '/'}}>
                                        <Input type="submit" className='' value="LOG IN"/>
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