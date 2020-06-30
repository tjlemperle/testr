import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {setUser} from '../../ducks/userReducer'

import './Register.scss'

class Register extends Component {
    constructor(props){
        super(props)

        this.state ={
            username: '', 
            first_name: '',
            last_name: '',
            user_email: '',
            password: '',
            verifyPassword: '',
            role: 'STUDENT',
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    registerAccount = () => {
        const {username, first_name, last_name, user_email, password, verifyPassword, role} = this.state

        if(password === verifyPassword){
            if(username && first_name && last_name && user_email && password  !== ''){

                axios.post('/auth/register', {username, first_name, last_name, user_email, password, role})
                .then(res => {
                    // console.log(res.data)
                    this.props.setUser(res.data)
                    this.props.history.push('/dashboard')
                })
                .catch(err => console.log(err))
            } else {
                alert('please fill in all inputs')
            }
        } else {
            alert('passwords do not match')
        }
    }


    render(){
        return(
            <div id='register'>
                <section id='register-container'>
                    <span id='reg-title-span'>TESTr</span>
                    <span id='reg-acc-reg-span'>Account Registration</span>
                    <section id='register-inputs-container'>
                        <section id='register-username'>
                            <span 
                                className='auth-span'
                            >Username </span>
                            <input 
                            className='auth-input'
                            name='username'
                            type='text'
                            placeholder='Username'
                            onChange={this.handleChange}
                            value={this.state.username}
                            />
                        </section>
                        <section id='register-first_name'>
                            <span
                                className='auth-span'
                            >First Name </span>
                            <input 
                            className='auth-input'
                            name='first_name'
                            type='text'
                            placeholder='First Name'
                            onChange={this.handleChange}
                            value={this.state.first_name}
                            />
                        </section>
                        <section id='register-last_name'>
                            <span
                                className='auth-span'
                            >Last Name </span>
                            <input 
                            className='auth-input'
                            name='last_name'
                            type='text'
                            placeholder='Last Name'
                            onChange={this.handleChange}
                            value={this.state.last_name}
                            />
                        </section>
                        <section id='register-user_email'>
                            <span
                                className='auth-span'
                            >Email </span>
                            <input 
                            className='auth-input'
                            name='user_email'
                            type='email'
                            placeholder='Email'
                            onChange={this.handleChange}
                            value={this.state.user_email}
                            />
                        </section>
                        <section id='register-password'>
                            <span
                                className='auth-span'
                            >Password </span>
                            <input 
                            className='auth-input'
                            name='password'
                            type='password'
                            placeholder='Password'
                            onChange={this.handleChange}
                            value={this.state.password}
                            />

                        </section>
                        <section id='register-verify-password'>
                            <span
                                className='auth-span'
                            >Verify Password </span>
                            <input 
                            className='auth-input'
                            name='verifyPassword'
                            type='password'
                            placeholder='Verify Password'
                            onChange={this.handleChange}
                            value={this.state.verifyPassword}
                            />

                        </section>
                    </section >
                    <section id='register-buttons'>
                        <Link to='/'>
                            <button
                                className='auth-button'
                            >Back</button>
                        </Link>
                        <button
                            className='auth-button'
                        >Clear</button>
                        <button 
                        className='auth-button'
                        id='register-button'
                        onClick={this.registerAccount}
                        >Register</button>
                    </section>
                </section>

            </div>
        )
    }


}

export default connect(null, {setUser})(Register)