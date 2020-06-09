import React, {Component} from 'react'
import logo from '../asets/logo.png'
import pp from '../asets/img.jpg'
import axios from 'axios'
import {Link} from 'react-router-dom'
import qs from 'querystring'
import {Row, Col, Input, Navbar, Card, CardBody, CardImg, Button,
        Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            showModal: false,
            data: [],
            pageInfo: [],
            search:'',
            showPrev: true,
            showNext: false,
            isAvail: true
        }
        this.toggleModal = this.toggleModal.bind(this)
    }
    search = () =>{
        if(`${this.state.search}` !== ''){
            this.props.history.push(`?search=${this.state.search}`)
        }
    }
    toggleModal(){
        this.setState({
            showModal: !this.state.showModal
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
                <Row className='h-100 w-100'>
                    <Col className=' h-100 w-100' xs='2'>
                        <div className='bg-light ps-fixed z-pt h-100 p-0 d-flex flex-column justify-content-between align-items-center b-shadow'>
                            <div className="m-5 w-100 d-flex flex-column justify-content-center align-items-center">
                                <img className="rounded-circle img-profile" src={pp} alt="profile picture"/>
                                <div className="h6 mt-3"></div>
                            </div>
                            <ul className="w-100 mb-5 h-100 d-flex flex-column list-group">
                                <li role="button" className="pl-3" onClick=''>History</li>
                                <li role="button" className="pl-3 mt-3" onClick=''>Explore</li>
                                <li role="button" className="pl-3 mt-3 font-weight-bold" onClick={this.toggleModal}>Add book+</li>
                            </ul>
                        </div>
                    </Col>
                    <Col className='h-100 w-100 pl-4 d-flex flex-column' xs='10'>
                        <Row xs='1' className='w-100'>
                            <Col className='w-100 h-10' xs='12'>
                                <Navbar className='w-100 b-shadow d-flex flex-row ps-fixed z-pd bg-light'>
                                    <div className="ml-3 d-flex flex-row">
                                        <Button className='btn-light dropdown-toggle' data-toogle='dropdown'>All Genres</Button>
                                    <ul className="d-flex flex-row list-group ">
                                        {/* <li className="ml-3 list-group-item border-0 bg-light" role='button'>All Genres</li> */}
                                    </ul>
                                    </div>
                                    <div className="w-50 d-flex flex-row">
                                        <Input onChange={e => this.setState({search: e.target.value})} className="p-2 rounded-pill shadow-none" placeholder="Search book..."/>
                                        <Button onClick={this.search} className='rounded-pill ml-2'>Search</Button>
                                    </div>
                                    <div className="d-flex flex-row">
                                        <img className="icon" src={logo} alt="logo"/>
                                        <div className="ml-3 h5 align-self-end">MyLibrary</div>
                                    </div>
                                </Navbar>
                            </Col>
                        </Row>
                        <Row xs='3' className='w-100 ml-2 mr-2 mb-4 mt-5 card-deck'>
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
                        <Row className='mt-5 mb-5 ml-4 d-flex flex-column'>
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
                    </Col>
                </Row>

                {/* Add Books Modal */}
                <Modal isOpen={this.state.showModal}>
                    <ModalHeader className='h1'>Add Books</ModalHeader>
                    <ModalBody>
                        <h6>Title</h6>
                        <Input type='text' className='mb-2 shadow-none' value={this.state.title} />
                        <h6>Description</h6>
                        <Input type='text' className='mb-3 shadow-none' value={this.state.desc}/>
                        <h6>Genre</h6>
                        <select className="w-50 mb-3 list-group border-0 shadow-none">
                            <option className="list-group-item border-0 bg-light">Genre</option>
                        </select>
                        <h6>Author</h6>
                        <select className="w-50 mb-2 list-group border-0 shadow-none">
                            <option className="list-group-item bg-light">Author</option>
                        </select>
                        <h6>Cover Image</h6>
                        <Input type='file' className='mb-2'/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick=''>Add Book</Button>
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

export default Register