import React, {Component} from 'react'
import Slider from './carousel'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import qs from 'querystring'
import Select from 'react-select'
import { connect } from 'react-redux'
import {Row, Col, Input, Card, CardBody, CardImg, Button,
        Modal, ModalHeader, ModalBody, ModalFooter, Form} from 'reactstrap'
import { Dropdown } from 'react-bootstrap'

import Sidebar from './sidebar'

import {fetchBook, fetchGenre, fetchAuthor} from '../redux/actions/fetchData'
import {addBook, clear} from '../redux/actions/actionData'

const {REACT_APP_URL} = process.env

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            showModal: false,
            showPrev: false,
            showNext: false,
            search:'',
            title: '',
            desc: '',
            genre: '',
            author: '',
            cover: ''
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
    getBooks(params){
        const param = `${qs.stringify(params)}`

        this.props.fetchBook(param).then( (response) => {

            const pageInfo = this.props.fetchData.pageInfo
        
            if(params){
                this.props.history.push(`?${param}`)
            }

            if(pageInfo.page > 1){
                this.setState({showPrev: true})
            } else {
                this.setState({showPrev: false})
            }

            if(pageInfo.page < pageInfo.totalPage){
                this.setState({showNext: true})
            } else {
                this.setState({showNext: false})
                }
          })
        }
        
    addBook = (e) => {
        e.preventDefault()

        const {token} = this.props.auth
        const data = new FormData()
        data.append('image', this.state.cover)
        data.set('title', this.state.title)
        data.set('description', this.state.desc)
        data.set('genre', this.state.genre)
        data.set('author', this.state.author)
        data.set('id_status', 1)
        
        this.props.addBook(data, token)
    }
    changeGenre(e){
        this.setState({genre: e.value})
    }
    changeAuthor(e){
        this.setState({author: e.value})
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
                this.setState({showModal: false})
                this.props.fetchBook()
            }
        this.props.clear()
        }
    }

    componentDidMount(){
        const param = qs.parse(this.props.location.search.slice(1))
        this.getBooks(param)
        this.props.fetchAuthor()
        this.props.fetchGenre()
    }

    render(){
        const {isLoading, books, genres, authors, pageInfo} = this.props.fetchData
        const {role} = this.props.auth

        var isAdmin
        if(role === 1){
            isAdmin = true
        }else{isAdmin = false}
        
        const params = qs.parse(this.props.location.search.slice(1))
        params.page = params.page || 1
        params.search = ''
        params.sort = 0
        return(
            <>
                    <div className='h-100 w-100 d-flex flex-column' xs='12'>
                        <Row xs='1' className='w-100'>
                            <Col className='w-100 h-10' xs='12'>
                                <Sidebar/>
                            </Col>
                        </Row>
                        <Row className=''>
                            <Col md='12' sm='0' className='mt-5 p-0 w-100 d-none d-md-block'>
                                <Slider className='w-100 p-0 d-sm-none'/>
                            </Col>
                        </Row>
                        <div className="w-100 d-flex flex-row justify-content-center align-items-center mt-3">
                            <Input onChange={e => this.setState({search: e.target.value})} className="w-50 p-2 rounded-pill shadow-none" placeholder="Search book..."/>
                            <Button onClick={()=>this.getBooks({...params, search: this.state.search})} className='rounded-pill ml-2 btn-dark'>Search</Button>
                        </div>
                        <div className='w-auto ml-4 d-flex flex-row justify-content-between w-100'>
                            {isAdmin && ( <Button className='btn-dark mt-3 mr-3' onClick={this.toggleModal}>Add</Button> ) }
                                <Dropdown className="mt-3">
                                  <Dropdown.Toggle className='btn-dark' id="dropdown-basic">
                                    Sort By
                                  </Dropdown.Toggle>
                                    <Dropdown.Menu className='bg-dark p-0'>
                                    <Dropdown.Item className='bg-dark text-light' onClick={()=>this.getBooks({...params, sort: 0})}>Name A-Z</Dropdown.Item>
                                    <Dropdown.Item className='bg-dark text-light' onClick={()=>this.getBooks({...params, sort: 1})}>Name Z-A</Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                        </div>
                        {isLoading ? (
                            <div className='d-flex flex-row align-self-center mt-3'>
                                <div className="spinner-grow mr-2" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-grow mr-2" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-grow mr-2" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        ):(
                            <Row xs='1' md='3' lg='4' className='w-100 mb-4 card-deck'>
                            {books.map((books, index) => ( 
                                <Col>
                                    <Link className='text-decoration-none'to={{
                                        pathname: `/detail/${books.id}`,
                                        state: {
                                            id: books.id,
                                            title: books.title,
                                            desc: books.description,
                                            status: books.status,
                                            author: books.author,
                                            cover: `${REACT_APP_URL}img/${books.image}`,
                                            genre: books.genre
                                        }
                                    }}>
                                        
                                            <Card role='button' className="mt-5 b-shadow">
                                            <CardImg className='fit-box' src={`${REACT_APP_URL}img/${books.image}`} alt="Card image cap" />
                                            <CardBody>
                                                <div className='text-dark h5'>{books.title}</div>
                                                <div className='text-muted'>{books.genre}</div>
                                            </CardBody>
                                            </Card>
                                    </Link>
                                </Col>
                            ))}
                            {/* {this.state.isAvail ||
                                (<Col className='h5 m-5'>Sorry, No result</Col>)
                            } */}
                        </Row>
                        )}
                        <Row className='mt-5 mb-5 d-flex flex-column'>
                        <Col>
                        <div className='d-flex flex-row justify-content-between'>
                            <div>
                                {this.state.showPrev &&
                                <Button onClick={()=>this.getBooks({...params, page: parseInt(params.page)-1})} className='btn-outline-dark btn-light'>Prev</Button> 
                                }
                            </div>
                            <div>
                            {[...Array(pageInfo.totalPage)].map((o, i)=>{
                                return (
                                <Button onClick={()=>this.getBooks({...params, page: params.page? i+1 : i+1})} className='mr-1 ml-1 btn-outline-dark btn-light' key={i.toString()}>{i+1}</Button>
                                )
                            })}
                            </div>
                            <div>{this.state.showNext &&
                                <Button onClick={()=>this.getBooks({...params, page: parseInt(params.page)+1})} className='btn-outline-dark btn-light'>Next</Button>
                                }
                            </div>
                        </div>
                        </Col>
                    </Row>
                </div>

                {/* Add Books Modal */}
                <Modal isOpen={this.state.showModal}>
                    <ModalHeader className='h1'>Add Books</ModalHeader>
                    <Form>
                        <ModalBody>
                            <h6>Title</h6>
                            <Input type='text' name='title' className='mb-2 shadow-none' onChange={this.change}/>
                            <h6>Description</h6>
                            <Input type='textarea' name='desc' className='mb-3 shadow-none' onChange={this.change}/>
                            <h6>Genre</h6>
                                <Select  
                                    className = "mb-2" 
                                    onChange = {this.changeGenre.bind(this)}
                                    options = {genres.map((val) => ({value:val.genre, label: val.genre}))}
                                />
                            <h6>Author</h6>
                                <Select  
                                    className = "mb-2" 
                                    onChange = {this.changeAuthor.bind(this)}
                                    options = {authors.map((val) => ({value:val.author, label: val.author}))}
                                />
                            <h6>Cover Image</h6>
                            <Input type='file' name='cover' className='mb-2 border-dark' onChange={(e) => this.setState({cover: e.target.files[0]})}/>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.addBook}>Add Book</Button>
                            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                        </ModalFooter>
                    </Form>
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
const mapDispatchToProps = { fetchBook, fetchGenre, fetchAuthor, addBook, clear }
export default connect(mapStateToProps, mapDispatchToProps)(Home)