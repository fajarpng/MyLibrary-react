import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Form, FormGroup, Label, Input} from 'reactstrap'
import axios from 'axios'
import Swal from 'sweetalert2'

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
    checkToken (){
        if(localStorage.getItem('token')){
            this.props.history.push(`/`)
        }else{this.props.history.push(`/register`)}
    }
    change = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    register = async (e) =>{
        e.preventDefault()
        const {REACT_APP_URL} = process.env
        const data = {
            name: this.state.user,
            email: this.state.email,
            password: this.state.password,
            id_role: 2
        }
        const url = `${REACT_APP_URL}users`
        await axios.post(url, data).then( (response) => {
            console.log(response.data.msg);
            this.props.history.push(`/login`)
          })
          .catch(function (error) {
            console.log(error.response.data.msg);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error.response.data.msg}`,
              })
           })
    }
    componentDidMount (){
        this.checkToken()
    }
    render(){
        return(
            <>
            <Row className="h-100 no-gutters bg bg-cover">
                <Col className='h-100 w-100 d-flex flex-column'>
                    <div className='flex-grow-1 d-flex justify-content-end align-items-center mt-5'>
                        <Form className='log-bar p-5 mr-3 mt-4'>
                            <h1>Register</h1>
                            <p>Hi, Welcome to MyLibrary</p>
                            <FormGroup>
                                <Label className='w-100'>
                                    <Input onChange={e => this.setState({user: e.target.value})} className="text" type="text" placeholder="Username"/>
                                </Label>
                            </FormGroup>
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
                                <Input onClick={this.register} type="submit" className='w-100 mt-2 text-white bg-secondary' value="SIGN UP"/>
                            </div>
                            <div className="d-flex justify-content-end mt-2">
                                <Link className='text-decoration-none justify-content-end text-dark' to='/login'>Have account alredy ?</Link>
                            </div>
                        </Form>
                    </div>
                    <div className='d-flex flex-column p-3 justify-content-end text-muted '>
                        <div>By signing up, you agree to MyLibrary’s</div>
                        <div className='text-dark'>Terms and Conditions &amp; Privacy Policy</div>
                    </div>
                </Col>
            </Row>
            </>
        )
    }
}

export default Register