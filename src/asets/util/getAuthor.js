import {Component} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

// import { fetchAuthors } from '../redux/actions/counter'

class getAuthor extends Component{
    async getAuthor () {
        const {REACT_APP_URL} = process.env
        const author = await axios.get(`${REACT_APP_URL}authors`)
        const {data} = author.data
        return data
        // this.props.fetchAuthors(data)
    }
}
// const mapStateToProps = state => ({
//     counter: state.counter
//   })

// const mapDispatchToProps = { fetchAuthors }

// export default connect(mapStateToProps, mapDispatchToProps)(getAuthor)
export default getAuthor