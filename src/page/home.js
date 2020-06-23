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

        import Sidebar from './sidebar'
import getGenre from '../asets/util/getGenre'
import getAuthor from '../asets/util/getAuthor'

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            showModal: false,
            showPrev: false,
            showNext: false,
            showSuccess: false,
            isLoading: true,
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
        const url = `${REACT_APP_URL}books?${param}`
        const books = await axios.get(url).then( (response) => {
            console.log(response);
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
            this.setState({isLoading : false})
          })
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
        var {isLoading} = this.state
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
                                <Sidebar/>
                            </Col>
                        </Row>
                        <Row className=''>
                            <Col md='12' sm='0' className='mt-5 p-0 w-100 d-none d-md-block'>
                                <Slider className='w-100 p-0 d-sm-none'/>
                            </Col>
                        </Row>
                        <div className="w-100 d-flex flex-row justify-content-center align-items-center mt-5">
                            <Input onChange={e => this.setState({search: e.target.value})} className="w-50 p-2 rounded-pill shadow-none" placeholder="Search book..."/>
                            <Button onClick={()=>this.getBooks({...params, search: this.state.search})} className='rounded-pill ml-2 btn-dark'>Search</Button>
                        </div>
                        <div className='w-auto ml-4 d-flex flex-row justify-content-between w-100'>
                            {isAdmin && ( <Button className='btn-dark mt-3 mr-3' onClick={this.toggleModal}>Add</Button> ) }
                            <div className="mt-3 d-flex flex-row">
                                <Button className='btn-dark mr-3' onClick={()=>this.getBooks({...params, sort: 0})}>A-Z</Button>
                                <Button className='btn-dark mr-3' onClick={()=>this.getBooks({...params, sort: 1})}>Z-A</Button>
                            </div>
                            
                        </div>
                        {isLoading ? (
                            <div className='d-flex flex-row align-self-center mt-2'>
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
                            <Row xs='1' md='3' lg='4' className='w-100 mb-4 card-deck'>
                            {this.state.data.map((books, index) => ( 
                                <Col>
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
                                        
                                            <Card role='button' className="mt-5 b-shadow">
                                            <CardImg className='fit-box' src={books.image} alt="Card image cap" />
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