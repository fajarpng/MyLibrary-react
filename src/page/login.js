import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Form, FormGroup, Label, Input} from 'reactstrap'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'

import { login, clear } from '../redux/actions/auth'

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            isError: false,
            email: '',
            password:''
        }
        this.login = this.login.bind(this)
    }

    change = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    checkToken (){
        if(this.props.auth.token!==null){
            this.props.history.goBack()
        }
    }

    login = (e) =>{
        e.preventDefault()
        const {email, password} = this.state

        this.props.login(email, password)
    }
    componentDidUpdate(){
        const {msg, isError} = this.props.auth
        if(msg !== ''){
            if(isError){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: msg,
                  })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: msg,
                })
                this.props.history.push('/')
            }
        this.props.clear()
        }
    }
    componentDidMount (){
        if(this.props.auth.token!==null){
            this.props.history.goBack()
        }
    }
    render(){
        const {msg, isError} = this.props.auth
        return(
            <>
            <Row className="h-100 no-gutters bg bg-cover">
                <Col className='h-100 w-100 d-flex flex-column'>
                    <div className='flex-grow-1 d-flex justify-content-end align-items-center mt-5'>
                        <Form className='log-bar p-5 mr-3 mt-4'>
                            <h1>Login</h1>
                            <p>Hi, Welcome back to MyLibrary</p>
                            {isError && <p className='text-danger'> {msg} </p>}
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
                                <Input onClick={this.login} type="submit" className='w-100 mt-2 text-white bg-secondary' value="LOG IN"/>
                            </div>
                            <div className="d-flex justify-content-end mt-2">
                                <Link className='text-decoration-none justify-content-end text-dark' to='/register'>Have no account yet ? Create Now</Link>
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
const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = { login, clear }
export default connect(mapStateToProps, mapDispatchToProps)(Login)
