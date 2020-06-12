import React, {Component} from 'react'
import Sidebar from './sidebar'
import {Row, Col, Button, Table,
    Modal, ModalHeader, ModalBody, ModalFooter, Form, Input} from 'reactstrap'
import axios from 'axios'
import centang from '../asets/centang.png'
import Swal from 'sweetalert2'

class Genre extends Component{
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
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.addGenre = this.addGenre.bind(this)
        this.editGenre = this.editGenre.bind(this)
        this.deleteGenre = this.deleteGenre.bind(this)
        this.toggleSuccess = this.toggleSuccess.bind(this)
    }
    change = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    toggleModal(){
        this.setState({
            showModal: !this.state.showModal
        })
    }
    toggleSuccess(){
        this.setState({
            showSuccess: !this.state.showSuccess
        })
    }
    async deleteGenre(){
        const {REACT_APP_URL} = process.env
        await axios.delete(`${REACT_APP_URL}genres/${this.state.id}`)
        this.getAutor()
    }
    async editGenre(){
        const {REACT_APP_URL} = process.env
        const url = `${REACT_APP_URL}genres/${this.state.id}`
        console.log(this.state.id)
        const data = {
            genre: this.state.name,
        }
        await axios.patch(url, data).then( (response) => {
            console.log(response);
            this.setState({showEdit: false})
            this.getGenre()
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
    async addGenre(){
        const {REACT_APP_URL} = process.env
        const url = `${REACT_APP_URL}genres`
        const data = {
            genre: this.state.name,
        }
        await axios.post(url, data).then( (response) => {
            console.log(response);
            this.setState({showModal: false})
            this.getGenre()
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
    async getGenre () {
        const {REACT_APP_URL} = process.env
        const Genre = await axios.get(`${REACT_APP_URL}genres`)
        const {data} = Genre.data
        this.setState({data})
        console.log({data})
    }
    async componentDidMount () {
        await this.getGenre()
    }
    render(){
        return(
            <>
                <Row className='h-100 w-100'>
                    <Col className='h-100 w-100 d-flex flex-column' xs='12'>
                        <Sidebar/>
                        <div className='w-auto ml-4 mt-5'>
                            <h2 className='mt-5'>List Genres</h2>
                            <Button className='btn-warning mt-2 mb-2' onClick={this.toggleModal}>Add</Button>
                       </div>
                       <Table bordered className='w-100 mt-2 ml-3'>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.data.map((Genre, index) => (
                            <tr>
                                <th scope="row">{Genre.id}</th>
                                <td>{Genre.genre}</td>
                                <td className='d-flex flex-row justify-content-between'>
                                    <Button className='btn-success mt-2 mb-2' onClick={() => this.setState({showEdit: !this.state.showEdit,
                                        id: Genre.id, name: Genre.genre})}>Edit</Button>
                                    <Button className='btn-danger mt-2 mb-2' onClick={() => this.setState({showDelete: !this.state.showDelete,id: Genre.id})}>Delete</Button>
                                </td>
                            </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                {/* Add Genres Modal */}
                <Modal isOpen={this.state.showModal}>
                    <ModalHeader className='h1'>Add Genres</ModalHeader>
                    <Form>
                        <ModalBody>
                            <h6>Name</h6>
                            <Input type='text' name='name' className='mb-2 shadow-none' onChange={this.change}/>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.addGenre}>Add Genre</Button>
                            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>

                {/* Edit Genres */}
                <Modal isOpen={this.state.showEdit}>
                    <ModalHeader className='h1'>Edit Genres</ModalHeader>
                    <ModalBody>
                        <h6>Name</h6>
                        <Input type='text' name='name' className='mb-2 shadow-none' onChange={this.change} value={this.state.name}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.editGenre}>Save</Button>
                        <Button color="secondary" onClick={() => this.setState({showEdit: !this.state.showEdit})}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                {/*Delete Modal*/}
                <Modal isOpen={this.state.showDelete}>
                    <ModalHeader className='h1'>Delete Genre</ModalHeader>
                    <ModalBody>
                        <h5 className='ml-4'>Are you sure?</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button className='btn-danger' onClick={this.deleteGenre}>Delete</Button>
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

export default Genre