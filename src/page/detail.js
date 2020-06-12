import React, {Component} from 'react'
import {Row, Col, Input, Navbar, Button,
    Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import centang from '../asets/centang.png'

class Detail extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: props.match.params.id,
            showEdit: false,
            showDelete: false,
            showSuccess: false,
            title: props.location.state.title,
            desc: props.location.state.desc,
            status: props.location.state.status,
            author: props.location.state.author,
            cover: props.location.state.cover,
            genre: props.location.state.genre,
            data: [],
            genres: []
        }
        this.updateBook = this.updateBook.bind(this)
        this.deleteBook = this.deleteBook.bind(this)
    }
    change = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    home = (e) =>{
        e.preventDefault()
        
        this.props.history.push('/home')
    }
    async updateBook () {
        const {REACT_APP_URL} = process.env
        const data = {
            title: this.state.title,
            description: this.state.desc,
            genre: this.state.genre,
            author: this.state.author,
            id_status: 1
        }
        const url = `${REACT_APP_URL}books/${this.state.id}`
        await axios.patch(url, data).then( (response) => {
            console.log(response);
            this.setState({showSuccess: !this.state.showSuccess})
            this.setState({showEdit: !this.state.showEdit})
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
    async deleteBook(){
        const {REACT_APP_URL} = process.env
        await axios.delete(`${REACT_APP_URL}books/${this.state.id}`)
        this.setState({showSuccess: !this.state.showSuccess})
    }
    async getAutor () {
        const {REACT_APP_URL} = process.env
        const author = await axios.get(`${REACT_APP_URL}authors`)
        const {data} = author.data
        this.setState({data})
        console.log(this.state.data)
    }
    async getGenre () {
        const {REACT_APP_URL} = process.env
        const Genre = await axios.get(`${REACT_APP_URL}genres`)
        const {data} = Genre.data
        this.setState({genres: {data}})
        console.log(this.state.genres.data)
    }
    async componentDidMount () {
        await this.getGenre()
        await this.getAutor()
    }
    render(){
        return(
            <>
                <Row className="h-50 w100 no-gutters">
                    <Col className='h-100 bg-cover' style={{backgroundImage: `url(${this.state.cover})`}} xs='12'>
                        <div className='h-100 darker'>
                            <Navbar class='d-flex justify-content-between w-100 p-3'>
                                <Button className="p-2 btn-warning text-white" onClick={()=> this.props.history.goBack()}>Back</Button>
                                <div className='text-white d-flex'>
                                    <Button className="p-2 btn-success pl-3 pr-3 mr-2" onClick={() => this.setState({showEdit: !this.state.showEdit})}>Edit</Button>
                                    <Button className="p-2 btn-danger ml-2" onClick={() => this.setState({showDelete: !this.state.showDelete})}>Delete</Button>
                                </div>
                            </Navbar>
                            <img className='rounded b-shadow mt-5 mr-5 float-right cover-fix' src={this.state.cover} alt="cover" />
                        </div>
                    </Col>
                </Row>
                <Row className="w100 no-gutters mb-5 ml-5 mt-3">
                    <Col xs='9'>
                        <div className="badge badge-pill badge-warning text-white">{this.state.genre} </div>
                        <div className="h1"> {this.state.title} </div>
                        <div className="text-success h5"> {this.state.status} </div>
                        <div className="h6"> {this.state.author} </div>
                        <div className=''> {this.state.desc} </div>
                    </Col>
                    {/* <Col className='d-flex flex-row justify-content-center ' sx='3'>
                        <Button className="btn btn-warning btn-lg text-white align-self-end b-shadow">Borrow</Button>
                    </Col> */}
                </Row>

                {/* Edit Books */}
                <Modal isOpen={this.state.showEdit}>
                    <ModalHeader className='h1'>Edit Books</ModalHeader>
                    <ModalBody>
                        <h6>Title</h6>
                        <Input type='text' name='title' className='mb-2 shadow-none' onChange={this.change} value={this.state.title}/>
                        <h6>Description</h6>
                        <Input type='text' name='desc' className='mb-3 shadow-none' onChange={this.change} value={this.state.desc}/>
                        <h6>Genre</h6>
                        <Input type='text' name='genre' className='mb-3 shadow-none' onChange={this.change} value={this.state.genre}/>
                        {/* <select name='genre' className="w-50 mb-2 list-group border-0 shadow-none" onChange={this.change} value={this.state.genre}>
                            {this.state.genres.data.map((o, index) => (
                                <option className="list-group-item bg-light">{o.genre}</option>
                            ))}
                        </select> */}
                        <h6>Author</h6>
                        <select name='author' className="w-50 mb-2 list-group border-0 shadow-none" onChange={this.change} value={this.state.author}>
                            {this.state.data.map((author, index) => (
                                <option className="list-group-item bg-light">{author.author}</option>
                            ))}
                        </select> 
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateBook}>Edit Book</Button>
                        <Button color="secondary" onClick={() => this.setState({showEdit: !this.state.showEdit})}>Cancel</Button>
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
                        <Button className='' onClick={() => this.setState({showDelete: !this.state.showDelete})}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                {/*Succes Modal */}
                <Modal isOpen={this.state.showSuccess}>
                    <ModalHeader className='h1'>Success</ModalHeader>
                    <ModalBody className='d-flex justify-content-center align-items-center'>
                        <img className='centang' src={centang} alt='SuccessImage'/>
                    </ModalBody>
                    <ModalFooter>
                        <Button className='btn-success' onClick={this.home} >Home</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

export default Detail