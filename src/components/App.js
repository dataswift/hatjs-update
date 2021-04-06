import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import AuthHandler from './AuthHandler'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'

export default function App() {
    return (
        <div className="ui container">
            <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/login" />
                </Route>
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/auth" component={AuthHandler}/>
                <Route path="/home" component={Home}/>
            </Switch>
            </BrowserRouter>
        </div>
    )
}
