import React, {Component} from 'react'
import Sidebar from './sidebar'
import {Row, Col, Button, Table,
    Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'

class Trans extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: 0,
            deleteModal: false,
            data: [],
        }
        this.deleteTrans =this.deleteTrans.bind(this)
        this.getTrans = this.getTrans.bind(this)
    }
    async deleteTrans () {
        const {REACT_APP_URL} = process.env
        const url = `${REACT_APP_URL}trans/${this.state.id}`
        await axios.delete(url).then( (response) => {
            console.log(response);
            this.setState(({deleteModal: false}))
            Swal.fire({
                icon: 'success',
                title: 'Success...',
                text: `${response.data.msg}`,
              })
            this.getTrans()
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
    async getTrans () {
        const {REACT_APP_URL} = process.env
        const result = await axios.get(`${REACT_APP_URL}trans`)
        const {data} = result.data
        this.setState({data})
    }
    async componentDidMount () {
        await this.getTrans ()
    }
    render(){
        return(
            <>
                <Row className='h-100 w-100'>
                    <Col className='h-100 w-100 d-flex flex-column' xs='12'>
                        <Sidebar/>
                        <div className='w-auto ml-4 mt-5'>
                            <h2 className='mt-5'>Borrowed books list</h2>
                       </div>
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
                            {this.state.data.map((val, i) => (
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
    counter: state.counter
  })

export default connect(mapStateToProps)(Trans)