import React, { Component } from 'react'
import { Button, Modal, Input, ModalBody ,ModalHeader ,ModalFooter } from 'reactstrap'
import { connect } from 'react-redux'

import { showHide, addTask, deleteTask } from '../redux/actions/counter'

class Todo extends Component {
    constructor(props){
        super(props)
        this.state = {
            task : ''
        }
    }
        
    render() {
        return (
            <>
            <div className='d-flex flex-column w-100 h-100'>
                <div className='d-flex flex-column justify-content-end pl-3 w-100 h-50' id='grad'>
                    <h1 className='text-light'>To Day</h1>
                    <h5 className='text-light'>Tuesday, 16 June 2020</h5>
                </div>
                <div className='mt-3'>
                    <ul className='list-unstyled'>
                        {this.props.counter.list.map((val, i) => (
                            <li className='d-flex flex-row justify-content-between ml-3 mt-2 bg-light p-2'>
                                {val}
                                <Button className='btn-danger' onClick={() => {this.props.deleteTask(i)}} >
                                    Delete
                                </Button>
                            </li>
                        ))}
                        <li>
                            <Button  className='ml-3 btn-outline-dark btn-light mt-2' onClick={this.props.showHide}>
                                + Add Task List
                            </Button>
                        </li>
                    </ul>
                </div> 
            </div>

            {/* add List */}
            <Modal isOpen={this.props.counter.show}>
                <ModalHeader className='h1'>Add task list</ModalHeader>
                <ModalBody className='d-flex justify-content-center align-items-center'>
                    <Input placeholder='Type here...' onChange={(e) => (this.setState({task: e.target.value}))}></Input>
                </ModalBody>
                <ModalFooter>
                    <Button className='btn-success' onClick={() => {
                        this.props.addTask(this.state.task)
                        this.props.showHide()
                        }}>Add</Button>
                    <Button className='btn-danger' onClick={this.props.showHide}>Cancle</Button>
                </ModalFooter>
            </Modal>
            </>
        )
    }
}

const mapStateToProps = state => ({
    counter: state.counter
  })

const mapDispatchToProps = {showHide, addTask, deleteTask}

export default connect(mapStateToProps, mapDispatchToProps)(Todo)