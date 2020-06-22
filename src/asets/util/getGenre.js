import {Component} from 'react'
import axios from 'axios'

class getGenre extends Component{
    async getGenre () {
        const {REACT_APP_URL} = process.env
        const genre = await axios.get(`${REACT_APP_URL}genres`)
        const {data} = genre.data
        return data
    }
}

export default getGenre