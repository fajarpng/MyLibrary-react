import React, {Component} from 'react'
import logo from '../asets/logo-white.png'
import Slider from './carousel'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import qs from 'querystring'
import centang from '../asets/centang.png'
import Select from 'react-select'
import { connect } from 'react-redux'
import {Row, Col, Input, Navbar, Card, CardBody, CardImg, Button,
        Modal, ModalHeader, ModalBody, ModalFooter, Form} from 'reactstrap'

import getGenre from '../asets/util/getGenre'
import getAuthor from '../asets/util/getAuthor'

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            showModal: false,
            showPrev: true,
            showNext: false,
            showSuccess: false,
            data: [],
            pageInfo: [],
            authors: [],
            genres: [],
            search:'',
            title: '',
            desc: '',
            genre: '',
            author: '',
            cover: ''
        }
        
        this.getGenre = new getGenre() 
        this.getAuthor = new getAuthor()
        this.logout = this.logout.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.addBook = this.addBook.bind(this)
        this.toggleSuccess = this.toggleSuccess.bind(this)
    }
    logout (){
        localStorage.setItem('token', null)
        localStorage.setItem('role', null)
        localStorage.setItem('name', null)
        this.props.history.push('/')
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
    async getBooks(params){
        const {REACT_APP_URL} = process.env
        const param = `${qs.stringify(params)}`
        const books = await axios.get(`${REACT_APP_URL}books?${param}`)
        const {data} = books.data
        this.setState({data})
        const pageInfo = {
            page: books.data.pageInfo.page,
            perPage: books.data.pageInfo.perPage,
            total: books.data.pageInfo.totalData,
            totalPage: books.data.pageInfo.totalPage,
        }
        this.setState({pageInfo})
        if(params){
            this.props.history.push(`?${param}`)
        }

        if(books.data.pageInfo.page > 1){
            this.setState({showPrev: true})
        } else {
            this.setState({showPrev: false})
        }

        if(books.data.pageInfo.page < books.data.pageInfo.totalPage){
            this.setState({showNext: true})
        } else {
            this.setState({showNext: false})
            }
    }
    async addBook (event) {
        event.preventDefault()
        const {REACT_APP_URL} = process.env
        const data = new FormData()
        data.append('image', this.state.cover)
        data.set('title', this.state.title)
        data.set('description', this.state.desc)
        data.set('genre', this.state.genre)
        data.set('author', this.state.author)
        data.set('id_status', 1)

        const url = `${REACT_APP_URL}books`
        await axios.post(url, data).then( (response) => {
            console.log(response);
            this.setState({showModal: false})
            this.getBooks()
            this.setState({showSuccess: true})
          })
          .catch(function (error) {
            console.log(error.response.data);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error.response.data.msg}`,
              })
           })
    }
    changeGenre(e){
        this.setState({genre: e.value})
    }
    changeAuthor(e){
        this.setState({author: e.value})
    }
    async componentDidMount(){
        const genre = await this.getGenre.getGenre()
        const author = await this.getAuthor.getAuthor()
        this.setState({
            genres: genre,
            authors: author
        })
        const param = qs.parse(this.props.location.search.slice(1))
        await this.getBooks(param)
    }
    render(){
        var isLogin
        if(localStorage.getItem('token') !== 'null'){
            isLogin = true
        }else{isLogin = false}
        var isAdmin
        if(localStorage.getItem('role') === '1'){
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
                                <Navbar className='w-100 b-shadow d-flex flex-row ps-fixed z-pd bg-dark'>
                                    <div className="ml-2 d-flex flex-row align-items-center">
                                        <img className="icon logo" src={logo} alt="logo"/>
                                        {/* {isLogin && 
                                            (<Link to='/trans' className="text-decoration-none nav-link text-light">History</Link>)
                                        } */}
                                        {isAdmin &&
                                            (<div className="ml-4 d-flex flex-row">
                                                <Link to='/' className="text-decoration-none nav-link text-light">Home</Link>
                                                <Link to='/trans' className="text-decoration-none nav-link text-light">History</Link>
                                                <Link to='/genre' className="text-decoration-none nav-link text-light">Genre</Link>
                                                <Link to='/author' className="text-decoration-none nav-link text-light">Author</Link>
                                            </div>)
                                        }
                                    </div>
                                    <div className="w-50 d-flex flex-row">
                                        <Input onChange={e => this.setState({search: e.target.value})} className="p-2 rounded-pill shadow-none" placeholder="Search book..."/>
                                        <Button onClick={()=>this.getBooks({...params, search: this.state.search})} className='rounded-pill ml-2'>Search</Button>
                                    </div>
                                    {!isLogin ?
                                        (<div className="pl-2 d-flex flex-row">
                                            <Link to='/register' className="pl-3 text-decoration-none nav-link">
                                                <Button className='btn-dark btn-outline-light'>Sign Up</Button>
                                            </Link>
                                            <Link to='/login' className="text-decoration-none nav-link">
                                                <Button className='btn-light'>Log In</Button>
                                            </Link>
                                        </div>) : 
                                        (<div className="d-flex flex-row align-items-center justify-content-between">
                                            <div className="mr-4 align-self-center text-light">
                                                Hi, {this.props.counter.name}
                                            </div>
                                            <Button onClick={this.logout} className='btn-dark btn-outline-light'>Logout</Button>
                                        </div>)
                                    }
                                </Navbar>
                            </Col>
                        </Row>
                        <Row className=''>
                            <Col xs='12' className='mt-5 p-0 w-100'>
                                <Slider className='w-100 p-0'/>
                            </Col>
                        </Row>
                        <div className='w-auto ml-4 d-flex flex-row justify-content-between w-100'>
                            {isAdmin && ( <Button className='btn-dark mt-3 mr-3' onClick={this.toggleModal}>Add</Button> ) }
                            <div className="mt-3 d-flex flex-row">
                                <Button className='btn-dark mr-3' onClick={()=>this.getBooks({...params, sort: 0})}>A-Z</Button>
                                <Button className='btn-dark mr-3' onClick={()=>this.getBooks({...params, sort: 1})}>Z-A</Button>
                            </div>
                            
                        </div>
                        <Row xs='4' className='w-100 mb-4 card-deck'>
                            {this.state.data.map((books, index) => ( 
                                <Link className='text-decoration-none'to={{
                                    pathname: `/detail/${books.id}`,
                                    state: {
                                        id: `${books.id}`,
                                        title: `${books.title}`,
                                        desc: `${books.description}`,
                                        status: `${books.status}`,
                                        author: `${books.author}`,
                                        cover: `${books.image}`,
                                        genre: `${books.genre}`
                                    }
                                }}>
                                    <Col>
                                        <Card role='button' className="mt-5 b-shadow">
                                        <CardImg className='fit-box' src={books.image} alt="Card image cap" />
                                        <CardBody>
                                            <div className='text-dark h5'>{books.title}</div>
                                            <div className='text-muted'>{books.genre}</div>
                                        </CardBody>
                                        </Card>
                                    </Col>
                                </Link>
                            ))}
                            {/* {this.state.isAvail ||
                                (<Col className='h5 m-5'>Sorry, No result</Col>)
                            } */}
                        </Row>
                        <Row className='mt-5 mb-5 d-flex flex-column'>
                        <Col>
                        <div className='d-flex flex-row justify-content-between'>
                            <div>
                                {this.state.showPrev &&
                                <Button onClick={()=>this.getBooks({...params, page: parseInt(params.page)-1})} className='btn-outline-dark btn-light'>Prev</Button> 
                                }
                            </div>
                            <div>
                            {[...Array(this.state.pageInfo.totalPage)].map((o, i)=>{
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
                                    options = {this.state.genres.map((val) => ({value:val.genre, label: val.genre}))}
                                />
                            <h6>Author</h6>
                                <Select  
                                    className = "mb-2" 
                                    onChange = {this.changeAuthor.bind(this)}
                                    options = {this.state.authors.map((val) => ({value:val.author, label: val.author}))}
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
const mapStateToProps = state => ({
    counter: state.counter
  })

export default connect(mapStateToProps)(Register)
// export default Register