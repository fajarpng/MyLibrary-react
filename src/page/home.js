import React, {Component} from 'react'
import logo from '../asets/logo.png'
import pp from '../asets/img.jpg'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Row, Col, Input, Navbar, Card, CardBody, CardImg, Button,
        Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            showModal: false,
            data: [],
            search:''
        }
        this.toggleModal = this.toggleModal.bind(this)
    }
    search = (e) =>{
        e.preventDefault()
        console.log(this.state.search)
        this.props.history.push(`/home?search=${this.state.search}`)
    }
    toggleModal(){
        this.setState({
            showModal: !this.state.showModal
        })
    }
    async componentDidMount(){
        const results = await axios.get('http://localhost:1000/books')
        const {data} = results.data
        this.setState({data})
        console.log({data})
    }
    render(){
        return(
            <>
                <Row className='h-100 w-100'>
                    <Col className=' h-100 w-100' xs='2'>
                        <div className='bg-light ps-fixed z-pt h-100 p-0 d-flex flex-column justify-content-between align-items-center b-shadow'>
                            <div className="m-5 w-100 d-flex flex-column justify-content-center align-items-center">
                                <img className="rounded-circle img-profile" src={pp} alt="profile picture"/>
                                <div className="h6 mt-3">Tri Fajar Pangestu</div>
                            </div>
                            <ul className="w-100 mb-5 h-100 d-flex flex-column list-group ">
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
                                    <ul className="d-flex flex-row list-group ">
                                        <li className="ml-3 list-group-item border-0 bg-light" role='button'>All Genres</li>
                                    </ul>
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
                                        cover: `${books.image}`
                                    }
                                }}>
                                    <Col>
                                        <Card role='button' className="mt-5 b-shadow">
                                        <CardImg className='img-fluid' src={books.image} alt="Card image cap" />
                                        <CardBody>
                                            <div className='text-dark h5'>{books.title}</div>
                                            <div className='text-muted'>{books.status}</div>
                                            <div className='text-dark'>{books.description}</div>
                                        </CardBody>
                                        </Card>
                                    </Col>
                                </Link>
                            ))}
                        </Row>
                    </Col>
                </Row>

                {/* Add Books Modal */}
                <Modal isOpen={this.state.showModal}>
                    <ModalHeader className='h1'>Add Books</ModalHeader>
                    <ModalBody>
                        <h6>Title</h6>
                        <Input type='text' className='mb-2'/>
                        <h6>Description</h6>
                        <Input type='text' className='mb-2'/>
                        <ul className="mb-2 list-group">
                            <li className="list-group-item border-0 bg-light">Genre</li>
                        </ul>
                        <ul className="mb-2 list-group">
                            <li className="list-group-item border-0 bg-light">Author</li>
                        </ul>
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