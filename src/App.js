import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';
import {Provider} from 'react-redux'
import store from './redux/sotre'

import login from './page/login'
import register from './page/register'
import home from './page/home'
import detail from './page/detail'
import author from './page/author'
import genre from './page/genre'
import notFound from './page/notfound'
import trans from './page/userHistory'

export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <BrowserRouter>
            <Switch>
            <Route path='/trans' exact component={trans}/>
              <Route path='/login' exact component={login}/>
              <Route path='/register' exact component={register}/>
              <Route path='/' exact component={home}/>
              <Route path='/author' exact component={author}/>
              <Route path='/genre' exact component={genre}/>
              <Route path='/detail/:id' exact component={detail}/>
              <Route component={notFound}/>
            </Switch>
          </BrowserRouter>
      </Provider>
    )
  }
}  
