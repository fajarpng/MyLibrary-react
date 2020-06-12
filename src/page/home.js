import React, {Component} from 'react'
import logo from '../asets/logo-white.png'
import Slider from './carousel'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import qs from 'querystring'
import centang from '../asets/centang.png'
import {Row, Col, Input, Navbar, Card, CardBody, CardImg, Button,
        Modal, ModalHeader, ModalBody, ModalFooter, Form} from 'reactstrap'

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            showModal: false,
            showPrev: true,
            showNext: false,
            showSuccess: false,
            isAvail: true,
            data: [],
            pageInfo: [],
            search:'',
            title: '',
            desc: '',
            genre: '',
            author: '',
            cover: ''
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.addBook = this.addBook.bind(this)
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
        if(books.data.pageInfo.totalData < 1){
            this.setState({isAvail: false})
        }
        if(books.data.pageInfo.page < 2){
            this.setState({showPrev: false})
        }
        if(books.data.pageInfo.page > 1){
            this.setState({showPrev: true})
        }
        if(books.data.pageInfo.page < books.data.pageInfo.totalPage){
            this.setState({showNext: true})
        }
        if(books.data.pageInfo.page >= books.data.pageInfo.totalPage){
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
        this.props.history.push(`/home`)
    }
    async componentDidMount(){
        const param = qs.parse(this.props.location.search.slice(1))
        await this.getBooks(param)
    }
    render(){
        const params = qs.parse(this.props.location.search.slice(1))
        params.page = params.page || 1
        params.search = ''
        return(
            <>
                    <div className='h-100 w-100 d-flex flex-column' xs='12'>
                        <Row xs='1' className='w-100'>
                            <Col className='w-100 h-10' xs='12'>
                                <Navbar className='w-100 b-shadow d-flex flex-row ps-fixed z-pd bg-dark'>
                                    <img className="icon logo" src={logo} alt="logo"/>
                                    <div className="ml-2 d-flex flex-row">
                                        <Link to='/home' className="text-decoration-none nav-link text-light">Home</Link>
                                        <Link to='/genre' className="text-decoration-none nav-link text-light">Genre</Link>
                                        <Link to='/author' className="text-decoration-none nav-link text-light">Author</Link>
                                        {/* <Button className='btn-light dropdown-toggle' data-toogle='dropdown'>All Genres</Button> */}
                                    <ul className="d-flex flex-row list-group ">
                                        {/* <li className="ml-3 list-group-item border-0 bg-light" role='button'>All Genres</li> */}
                                    </ul>
                                    </div>
                                    <div className="w-50 d-flex flex-row">
                                        <Input onChange={e => this.setState({search: e.target.value})} className="p-2 rounded-pill shadow-none" placeholder="Search book..."/>
                                        <Button onClick={()=>this.getBooks({...params, search: this.state.search})} className='rounded-pill ml-2'>Search</Button>
                                    </div>
                                    <div className="d-flex flex-row">
                                        <Link to='/' className="pl-3 text-decoration-none nav-link text-light">Login</Link>
                                        <Link to='/register' className="pl-3 text-decoration-none nav-link text-light ">Sign Up</Link>
                                    </div>
                                </Navbar>
                            </Col>
                        </Row>
                        <Row className=''>
                            <Col xs='12' className='mt-5 p-0 w-100'>
                                <Slider className='w-100 p-0'/>
                            </Col>
                        </Row>
                        <div className='w-auto ml-4'>
                                <Button className='btn-dark mt-3' onClick={this.toggleModal}>Add</Button>
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
                                {this.state.isAvail &&
                                    <Col>
                                        <Card role='button' className="mt-5 b-shadow">
                                        <CardImg className='fit-box' src={books.image} alt="Card image cap" />
                                        <CardBody>
                                            <div className='text-dark h5'>{books.title}</div>
                                            <div className='text-muted'>{books.genre}</div>
                                        </CardBody>
                                        </Card>
                                    </Col> 
                                }
                                </Link>
                            ))}
                        </Row>
                        <Row className='mt-5 mb-5 d-flex flex-column'>
                        {!this.state.isAvail && 
                                (<Col className='h5'>Sorry, No result</Col>)
                            }
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
                            <Input type='text' name='desc' className='mb-3 shadow-none' onChange={this.change}/>
                            <h6>Genre</h6>
                            <Input type='text' name='genre' className='mb-3 shadow-none' onChange={this.change}/>
                            <h6>Author</h6>
                            <Input type='text' name='author' className='mb-3 shadow-none' onChange={this.change}/>
                            {/* <h6>Genre</h6>
                            <select className="w-50 mb-3 list-group border-0 shadow-none">
                                <option className="list-group-item border-0 bg-light">Genre</option>
                            </select>
                            <h6>Author</h6>
                            <select className="w-50 mb-2 list-group border-0 shadow-none">
                                <option className="list-group-item bg-light">Author</option>
                            </select> */}
                            <h6>Cover Image</h6>
                            <Input type='file' name='cover' className='mb-2' onChange={(e) => this.setState({cover: e.target.files[0]})}/>
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

export default Register