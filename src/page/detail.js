import React, {Component} from 'react'
import cover from '../asets/cover.png'
import {Row, Col, Input, Navbar, Button,
    Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import centang from '../asets/centang.png'

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: props.match.params.id,
            showEdit: false,
            showDelete: false,
            showSuccess: false,
            title: props.location.state.title,
            desc: props.location.state.desc,
            status: props.location.state.status,
            author: props.location.state.author,
            cover: props.location.state.cover,
            data: []
        }
    }
    home = (e) =>{
        e.preventDefault()
        
        this.props.history.push('/home')
    }
    render(){
        return(
            <>
                <Row className="h-50 w100 no-gutters">
                    <Col className='h-100 bg-cover' xs='12'>
                        <div className='h-100 darker'>
                            <Navbar class='d-flex justify-content-between w-100 p-3'>
                                <Button className="p-2 btn-light" onClick={()=> this.props.history.goBack()}>Back</Button>
                                <div className='text-white d-flex'>
                                    <Button className="p-2 btn-light mr-2" onClick={() => this.setState({showEdit: !this.state.showEdit})}>Edit</Button>
                                    <Button className="p-2 btn-light ml-2" onClick={() => this.setState({showDelete: !this.state.showDelete})}>Delete</Button>
                                </div>
                            </Navbar>
                            <img className='rounded b-shadow mt-5 mr-5 float-right cover-fix' src={this.state.cover} alt="cover" />
                        </div>
                    </Col>
                </Row>
                <Row className="w100 no-gutters mb-5 ml-5 mt-3">
                    <Col xs='9'>
                        <div className="badge badge-pill badge-warning text-white">Novel</div>
                        <div className="h1"> {this.state.title} </div>
                        <div className="text-success h5"> {this.state.status} </div>
                        <div className="h6"> {this.state.author} </div>
                        <div className=''> {this.state.desc} </div>
                    </Col>
                    {/* <Col className='d-flex flex-row justify-content-center ' sx='3'>
                        <Button className="btn btn-warning btn-lg text-white align-self-end b-shadow">Borrow</Button>
                    </Col> */}
                </Row>

                {/* Edit Books */}
                <Modal isOpen={this.state.showEdit}>
                    <ModalHeader className='h1'>Edit Books</ModalHeader>
                    <ModalBody>
                        <h6>Title</h6>
                        <Input type='text' className='mb-2'/>
                        <h6>Description</h6>
                        <Input type='text' className='mb-2'/>
                        <ul className="mb-2 list-group">
                            <li className="list-group-item border-0 bg-light">Genre</li>
                        </ul>
                        <ul className="mb-2 list-group">
                            <li className="list-group-item border-0 bg-light">Author</li>
                        </ul>
                        <h6>Cover Image</h6>
                        <Input type='file' className='mb-2'/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick=''>Edit Book</Button>
                        <Button color="secondary" onClick={() => this.setState({showEdit: !this.state.showEdit})}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                {/*Delete Modal*/}
                <Modal isOpen={this.state.showDelete}>
                    <ModalHeader className='h1'>Delete book</ModalHeader>
                    <ModalBody>
                        <h5 className='ml-4'>Are you sure?</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button className='btn-danger' onClick={() => this.setState({showSuccess: !this.state.showSuccess})}>Delete</Button>
                        <Button className='' onClick={() => this.setState({showDelete: !this.state.showDelete})}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                {/* Delete Succes Modal */}
                <Modal isOpen={this.state.showSuccess}>
                    <ModalHeader className='h1'>Delete success</ModalHeader>
                    <ModalBody className='d-flex justify-content-center align-items-center'>
                        <img className='centang' src={centang} alt='SuccessImage'/>
                    </ModalBody>
                    <ModalFooter>
                        <Button className='btn-success' onClick={this.home} >Home</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

export default Register