import React, {Component} from 'react'
import Sidebar from './sidebar'
import {Row, Col, Button, Table,
    Modal, ModalHeader, ModalBody, ModalFooter, Form, Input} from 'reactstrap'
import Swal from 'sweetalert2'

import { connect } from 'react-redux'

import { fetchAuthor } from '../redux/actions/fetchData'
import { deleteAuthor, updateAuthor, addAuthor, clear } from '../redux/actions/actionData'

class Author extends Component{
    constructor(props){
        super(props)
        this.state = {
            showModal: false,
            showEdit: false,
            showDelete: false,
            id: 0,
            name: '',
            desc: ''
        }
        this.toggleModal = this.toggleModal.bind(this)
    }
    change = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    toggleModal(){
        this.setState({
            showModal: !this.state.showModal
        })
    }

    deleteAuthor = () => {
        const {id} = this.state
        const {token} = this.props.auth

        this.props.deleteAuthor(id,token)
    }
    editAuthor = () => {
        const {id} = this.state
        const {token} = this.props.auth
        const data = {
            author: this.state.name,
            description: this.state.desc
        }

        this.props.updateAuthor(data,id,token)
    }
    addAuthor = () => {
        const {token} = this.props.auth
        const data = {
            author: this.state.name,
            description: this.state.desc
        }

        this.props.addAuthor(data,token)
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
                this.props.fetchAuthor()
            }
        this.props.clear()
        }
    }

    componentDidMount () {
        this.props.fetchAuthor()
    }
    render(){
        const { authors, isLoading } = this.props.fetchData
        return(
            <>
                <Row className='h-100 w-100'>
                    <Col className='h-100 w-100 d-flex flex-column' xs='12'>
                        <Sidebar/>
                        <div className='w-auto ml-4 mt-5'>
                            <h2 className='mt-5'>List authors</h2>
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
                            {authors.map((author, index) => (
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
                        )}
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
            </>
        )
    }
}
const mapStateToProps = state => ({
    fetchData: state.fetchData,
    auth: state.auth,
    actionData: state.actionData
})
const mapDispatchToProps = { fetchAuthor, addAuthor, updateAuthor, deleteAuthor,clear }
export default connect(mapStateToProps, mapDispatchToProps)(Author)