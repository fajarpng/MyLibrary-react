import React, {Component} from 'react'
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
            <Row className="h-100 no-gutters bg bg-cover">
                <Col className='h-100 w-100 d-flex flex-column'>
                    <div className='flex-grow-1 d-flex justify-content-end align-items-center mt-5'>
                        <Form className='log-bar p-5 mr-3 mt-5'>
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
                                <Input onClick={this.register} type="submit" className='w-100 mt-2 text-white bg-secondary' value="LOG IN"/>
                            </div>
                            <div className="d-flex justify-content-end mt-2">
                                <Link className='text-decoration-none justify-content-end text-dark' to='/register'>Create account?</Link>
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