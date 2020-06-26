import React, {Component} from 'react'
import Sidebar from './sidebar'
import {Row, Col, Button, Table,
    Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import Swal from 'sweetalert2'

import { connect } from 'react-redux'
import { fetchTrans } from '../redux/actions/fetchData'
import { deleteTrans, clear } from '../redux/actions/actionData'

class Trans extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: 0,
            deleteModal: false,
        }
    }
    deleteTrans = () => {
        const {id} = this.state
        const {token} =this.props.auth

        this.props.deleteTrans(id,token)
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
                this.setState({deleteModal: false})
                this.props.fetchTrans()
            }
        this.props.clear()
        }
    }
    componentDidMount () {
        this.props.fetchTrans()
    }
    render(){
        const {trans, isLoading} = this.props.fetchData
        return(
            <>
                <Row className='h-100 w-100'>
                    <Col className='h-100 w-100 d-flex flex-column' xs='12'>
                        <Sidebar/>
                        <div className='w-auto ml-4 mt-5'>
                            <h2 className='mt-5'>Borrowed books list</h2>
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
                                <th>id</th>
                                <th>Books</th>
                                <th>Users</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {trans.map((val, i) => (
                            <tr>
                                <th scope="row"> {val.id}</th>
                                <td>{val.title}</td>
                                <td>{val.name}</td>
                                <td className='d-flex justify-content-center'>
                                    <Button className='btn-warning mt-2 mb-2' onClick={() => this.setState({id: val.id, deleteModal: true})}>
                                        Return book
                                    </Button>
                                </td>
                            </tr>
                            ))}
                            </tbody>
                        </Table>
                        )}
                    </Col>
                </Row>

                {/*Delete Modal*/}
                <Modal isOpen={this.state.deleteModal}>
                    <ModalHeader className='h1'>Return book</ModalHeader>
                    <ModalBody>
                        <h5 className='ml-4'>Are you sure?</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button className='btn-warning' onClick={this.deleteTrans}>Return book</Button>
                        <Button className='' onClick={() => this.setState({deleteModal: false})}>Cancel</Button>
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
const mapDispatchToProps = { fetchTrans, deleteTrans, clear }
export default connect(mapStateToProps, mapDispatchToProps)(Trans)