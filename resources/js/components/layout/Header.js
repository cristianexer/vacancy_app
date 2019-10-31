import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
    <nav className='navbar navbar-expand-md navbar-main'>
        <div className='container'>
            <Link className='navbar-brand text-uppercase' to='/'><h2>Vacancies</h2></Link>
        </div>
    </nav>
)

export default Header
