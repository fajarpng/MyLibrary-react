import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';

import login from './page/login'
import register from './page/register'
import home from './page/home'
import detail from './page/detail'
import author from './page/author'
import genre from './page/genre'
import notFound from './page/notfound'

function App() {
  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={login}/>
        <Route path='/register' exact component={register}/>
        <Route path='/home' exact component={home}/>
        <Route path='/author' exact component={author}/>
        <Route path='/genre' exact component={genre}/>
        <Route path='/detail/:id' exact component={detail}/>
        <Route component={notFound}/>
      </Switch>
    </BrowserRouter>
    </>
  )
}

export default App;
