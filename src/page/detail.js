import React, {Component} from 'react'
import {Row, Col, Input, Navbar, Button,
    Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import Swal from 'sweetalert2'
import Select from 'react-select'
import { connect } from 'react-redux'


import {fetchBook, fetchGenre, fetchAuthor} from '../redux/actions/fetchData'
import {updateBook, deleteBook, clear, addTrans} from '../redux/actions/actionData'

class Detail extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: props.match.params.id,
            showEdit: false,
            showDelete: false,
            title: props.location.state.title,
            desc: props.location.state.desc,
            author: props.location.state.author,
            cover: props.location.state.cover,
            genre: props.location.state.genre,
        }
    }
    
    change = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    updateBook = () => {
        const {id, title, genre, author, desc} = this.state
        const {token} = this.props.auth

        const data = {
            title: title,
            description: desc,
            genre: genre,
            author: author
        }

        this.props.updateBook(data,id,token)
    }

    deleteBook = () => {
        const {id} = this.state
        const {token} = this.props.auth

        this.props.deleteBook(id,token)
        this.props.history.push('/')
    }

    borrow = () => {
        const {token} = this.props.auth
        const data = {
            id_book: this.state.id,
            id_user: 22
        }

        this.props.addTrans(data,token)
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
                this.props.fetchBook()
            }
        this.props.clear()
        }
    }

    componentDidMount(){
        this.props.fetchBook()
        this.props.fetchAuthor()
        this.props.fetchGenre()
    }

    render(){
        const {isLoading, books, genres, authors} = this.props.fetchData
        const {id} = this.state 
        const {role} = this.props.auth

        const book = books.filter(val => { return val.id === parseInt(id)})

        var isAdmin
        if(role === 1){
            isAdmin = true
        }else{isAdmin = false}

        return(
            <>
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
                book.map( (val) => (
                <>
                    <Row className="h-50 w100 no-gutters">
                        <Col className='h-100 bg-cover' style={{backgroundImage: `url(${val.image})`}} xs='12'>
                            <div className='h-100 darker'>
                                <Navbar class='d-flex justify-content-between w-100 p-3'>
                                    <Button className="p-2 btn-warning text-white" onClick={()=> this.props.history.goBack()}>Back</Button>
                                    <div className='text-white d-flex'>
                                        {isAdmin &&
                                            (<div>
                                                <Button className="p-2 btn-success pl-3 pr-3 mr-2" onClick={() => this.setState({showEdit: !this.state.showEdit})}>Edit</Button>
                                                <Button className="p-2 btn-danger ml-2" onClick={() => this.setState({showDelete: !this.state.showDelete})}>Delete</Button>
                                            </div>)
                                        }
                                    </div>
                                </Navbar>
                                <img className='rounded b-shadow mt-5 mr-5 float-right cover-fix d-none d-lg-block' src={val.image} alt="cover" />
                            </div>
                        </Col>
                    </Row>
                    <Row className="w100 no-gutters mb-5 ml-5 mt-3">
                        <Col xs='9'>
                            <div className="badge badge-pill badge-warning text-white">{val.genre}</div>
                            <div className="h1 ">
                                {val.title} 
                            </div>
                            <div className="text-success h5 d-flex justify-content-between align-item-center"> 
                                {val.status} 
                                <div>
                                    <Button className="btn-warning text-white" onClick={this.borrow}>
                                        Borrow
                                    </Button>
                                </div>
                            </div>
                            <div className="h6"> {val.author} </div>
                            <div className=''> {val.description} </div>
                        </Col>
                    </Row>
                </>
                ))
            )}

                {/* Edit Books */}
                <Modal isOpen={this.state.showEdit}>
                    <ModalHeader className='h1'>Edit Books</ModalHeader>
                    <ModalBody>
                        <h6>Title</h6>
                        <Input type='text' name='title' className='mb-2 shadow-none' onChange={this.change} value={this.state.title}/>
                        <h6>Description</h6>
                        <Input type='textarea' name='desc' className='mb-3 shadow-none' onChange={this.change} value={this.state.desc}/>
                        <h6>Genre</h6>
                            <Select 
                                value={{label:  this.state.genre}}
                                className = "mb-2" 
                                onChange = {(e) => this.setState({genre: e.value})}
                                options = {genres.map((val) => ({value:val.genre, label: val.genre}))}
                            />
                        <h6>Author</h6>
                            <Select  
                                className = "mb-2" 
                                value={{label:  this.state.author}}
                                onChange = {(e) => this.setState({author: e.value})}
                                options = {authors.map((val) => ({value:val.author, label: val.author}))}
                            />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateBook}>Edit Book</Button>
                        <Button color="secondary" onClick={() => this.setState({showEdit: false})}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                {/*Delete Modal*/}
                <Modal isOpen={this.state.showDelete}>
                    <ModalHeader className='h1'>Delete book</ModalHeader>
                    <ModalBody>
                        <h5 className='ml-4'>Are you sure?</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button className='btn-danger' onClick={this.deleteBook}>Delete</Button>
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
const mapDispatchToProps = { fetchBook, fetchGenre, fetchAuthor, updateBook, deleteBook, clear, addTrans}
export default connect(mapStateToProps, mapDispatchToProps)(Detail)