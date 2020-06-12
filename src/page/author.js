import React, {Component} from 'react'
import Sidebar from './sidebar'
import {Row, Col, Button, Table,
    Modal, ModalHeader, ModalBody, ModalFooter, Form, Input} from 'reactstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import centang from '../asets/centang.png'

class Author extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: [],
            showModal: false,
            showSuccess: false,
            showEdit: false,
            showDelete: false,
            id: 0,
            name: '',
            desc: ''
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.addAuthor = this.addAuthor.bind(this)
        this.editAuthor = this.editAuthor.bind(this)
        this.deleteAuthor = this.deleteAuthor.bind(this)
        this.toggleSuccess = this.toggleSuccess.bind(this)
    }
    change = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    toggleModal(){
        this.setState({
            showModal: !this.state.showModal
        })
        console.log(this.state.name)
    }
    toggleSuccess(){
        this.setState({
            showSuccess: !this.state.showSuccess
        })
    }
    async deleteAuthor(){
        const {REACT_APP_URL} = process.env
        await axios.delete(`${REACT_APP_URL}authors/${this.state.id}`)
        this.getAutor()
        this.setState({showDelete: false})
        this.setState({showSuccess: true})
    }
    async editAuthor(){
        const {REACT_APP_URL} = process.env
        const url = `${REACT_APP_URL}authors/${this.state.id}`
        console.log(this.state.id)
        const data = {
            author: this.state.name,
            description: this.state.desc
        }
        await axios.patch(url, data).then( (response) => {
            console.log(response);
            this.setState({showEdit: false})
            this.getAutor()
            this.setState({showSuccess: true})
          })
          .catch(function (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error.response.data.msg}`,
              })
           })
    }
    async addAuthor(){
        const {REACT_APP_URL} = process.env
        const url = `${REACT_APP_URL}authors`
        const data = {
            author: this.state.name,
            description: this.state.desc
        }
        await axios.post(url, data).then( (response) => {
            console.log(response);
            this.setState({showModal: false})
            this.getAutor()
            this.setState({showSuccess: true})
          })
          .catch(function (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error.response.data.msg}`,
              })
           })
    }
    async getAutor () {
        const {REACT_APP_URL} = process.env
        const author = await axios.get(`${REACT_APP_URL}authors`)
        const {data} = author.data
        this.setState({data})
        console.log({data})
    }
    async componentDidMount () {
        await this.getAutor()
    }
    render(){
        return(
            <>
                <Row className='h-100 w-100'>
                    <Col className='h-100 w-100 d-flex flex-column' xs='12'>
                        <Sidebar/>
                        <div className='w-auto ml-4 mt-5'>
                            <h2 className='mt-5'>List authors</h2>
                            <Button className='btn-warning mt-2 mb-2' onClick={this.toggleModal}>Add</Button>
                       </div>
                       <Table bordered className='mt-2 ml-3'>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.data.map((author, index) => (
                            <tr>
                                <th scope="row">{author.id}</th>
                                <td>{author.author}</td>
                                <td>{author.description}</td>
                                <td className='d-flex flex-row justify-content-between'>
                                    <Button className='btn-success mt-2 mb-2' onClick={() => this.setState({showEdit: !this.state.showEdit,
                                        id: author.id, desc: author.description, name: author.author})}>Edit</Button>
                                    <Button className='btn-danger mt-2 mb-2' onClick={() => this.setState({showDelete: !this.state.showDelete, id: author.id})}>Delete</Button>
                                </td>
                            </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                {/* Add Authors Modal */}
                <Modal isOpen={this.state.showModal}>
                    <ModalHeader className='h1'>Add Authors</ModalHeader>
                    <Form>
                        <ModalBody>
                            <h6>Name</h6>
                            <Input type='text' name='name' className='mb-2 shadow-none' onChange={this.change}/>
                            <h6>Description</h6>
                            <Input type='text' name='desc' className='mb-3 shadow-none' onChange={this.change}/>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.addAuthor}>Add Author</Button>
                            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>

                {/* Edit Authors */}
                <Modal isOpen={this.state.showEdit}>
                    <ModalHeader className='h1'>Edit Authors</ModalHeader>
                    <ModalBody>
                        <h6>Name</h6>
                        <Input type='text' name='name' className='mb-2 shadow-none' onChange={this.change} value={this.state.name}/>
                        <h6>Description</h6>
                        <Input type='text' name='desc' className='mb-3 shadow-none' onChange={this.change} value={this.state.desc}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.editAuthor}>Save</Button>
                        <Button color="secondary" onClick={() => this.setState({showEdit: !this.state.showEdit})}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                {/*Delete Modal*/}
                <Modal isOpen={this.state.showDelete}>
                    <ModalHeader className='h1'>Delete author</ModalHeader>
                    <ModalBody>
                        <h5 className='ml-4'>Are you sure?</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button className='btn-danger' onClick={this.deleteAuthor}>Delete</Button>
                        <Button className='' onClick={() => this.setState({showDelete: !this.state.showDelete})}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                {/*Succes Modal */}
                <Modal isOpen={this.state.showSuccess}>
                    <ModalHeader className='h1'>Success</ModalHeader>
                    <ModalBody className='d-flex justify-content-center align-items-center'>
                        <img className='centang' src={centang} alt='SuccessImage'/>
                    </ModalBody>
                    <ModalFooter>
                        <Button className='btn-success' onClick={this.toggleSuccess}>OK</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

export default Author