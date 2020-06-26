import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/sotre'
import login from './page/login'
import register from './page/register'
import home from './page/home'
import detail from './page/detail'
import author from './page/adminOnly/author'
import genre from './page/adminOnly/genre'
import notFound from './page/notfound'
import trans from './page/adminOnly/userHistory'
import userTrans from './page/userHistory'

export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <BrowserRouter>
          <PersistGate persistor={persistor}>
            <Switch>
              <Route path='/' exact component={home}/>
              <Route path='/author' exact component={author}/>
              <Route path='/genre' exact component={genre}/>
              <Route path='/detail/:id' exact component={detail}/>
              <Route path='/trans' exact component={trans}/>
              <Route path='/trans/:name' exact component={userTrans}/>
              <Route path='/login' exact component={login}/>
              <Route path='/register' exact component={register}/>
              <Route component={notFound}/>
            </Switch>
          </PersistGate>
          </BrowserRouter>
      </Provider>
    )
  }
}  
