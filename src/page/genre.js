import React, {Component} from 'react'
import Sidebar from './sidebar'
import {Row, Col, Button, Table,
    Modal, ModalHeader, ModalBody, ModalFooter, Form, Input} from 'reactstrap'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'

import {fetchGenre} from '../redux/actions/fetchData'
import {deleteGenre, addGenre, updateGenre, clear} from '../redux/actions/actionData'

class Genre extends Component{
    constructor(props){
        super(props)
        this.state = {
            showModal: false,
            showEdit: false,
            showDelete: false,
            id: 0,
            name: '',
        }
    }
    change = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }
    deleteGenre = () => {
        const {id} = this.state
        const {token} = this.props.auth
        
        this.props.deleteGenre(id,token)
    }
    editGenre = () => {
        const {id, name} = this.state
        const data = {
            genre: name,
        }
        
        this.props.updateGenre(data,id)
    }
    addGenre = () => {
        const {token} = this.props.auth
        const data = {
            genre: this.state.name,
        }
        this.props.addGenre(data,token)
    }

    componentDidUpdate(){
        const {isError, msg} = this.props.actionData
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
                this.setState({showEdit: false})
                this.setState({showDelete: false})
                this.setState({showModal: false})
                this.props.fetchGenre()
            }
        this.props.clear()
        }
    }

    componentDidMount () {
        this.props.fetchGenre()
    }
    render(){
        const { genres, isLoading } = this.props.fetchData
        return(
            <>
                <Row className='h-100 w-100'>
                    <Col className='h-100 w-100 d-flex flex-column' xs='12'>
                        <Sidebar/>
                        <div className='w-auto ml-4 mt-5'>
                            <h2 className='mt-5'>List Genres</h2>
                            <Button className='btn-warning mt-2 mb-2' onClick={this.toggleModal}>Add</Button>
                       </div>
                       {isLoading ? (
                            <div className='d-flex flex-row justify-content-center align-self-center mt-5 w-100 h-100'>
                                <div class="spinner-grow mr-2" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow mr-2" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow mr-2" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        ):(
                       <Table bordered className='w-100 mt-2 ml-3'>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {genres.map((Genre, index) => (
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
                        )}
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
                        <Button color="secondary" onClick={() => this.setState({showEdit: false})}>Cancel</Button>
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
                        <Button className='' onClick={() => this.setState({showDelete: false})}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = state => ({
    fetchData: state.fetchData,
    auth: state.auth,
    actionData: state.actionData
})

const mapDispatchToProps = { fetchGenre, deleteGenre, addGenre, updateGenre, clear}
export default connect(mapStateToProps, mapDispatchToProps)(Genre)