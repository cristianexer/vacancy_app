import 'bootstrap/dist/css/bootstrap.min.css';

// import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './Header'
import Vacancy from "../Vacancy/Vacancy";


class App extends Component {
    render () {
        return (
            <BrowserRouter>

                    <Header />
                    <Switch>
                        <Route exact path='/' component={Vacancy} />
                    </Switch>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
