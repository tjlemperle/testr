import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {setUser} from '../../ducks/userReducer'



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
            <div>
                <section id='register-container'>
                    <span>TESTr Account Registration</span>
                    <section id='register-inputs-container'>
                        <section id='register-username'>
                            <span>Username: </span>
                            <input 
                            name='username'
                            type='text'
                            placeholder='Username'
                            onChange={this.handleChange}
                            value={this.state.username}
                            />
                        </section>
                        <section id='register-first_name'>
                            <span>First Name: </span>
                            <input 
                            name='first_name'
                            type='text'
                            placeholder='First Name'
                            onChange={this.handleChange}
                            value={this.state.first_name}
                            />
                        </section>
                        <section id='register-last_name'>
                            <span>Last Name: </span>
                            <input 
                            name='last_name'
                            type='text'
                            placeholder='Last Name'
                            onChange={this.handleChange}
                            value={this.state.last_name}
                            />
                        </section>
                        <section id='register-user_email'>
                            <span>Email: </span>
                            <input 
                            name='user_email'
                            type='email'
                            placeholder='Email'
                            onChange={this.handleChange}
                            value={this.state.user_email}
                            />
                        </section>
                        <section id='register-password'>
                            <span>Password: </span>
                            <input 
                            name='password'
                            type='password'
                            placeholder='Password'
                            onChange={this.handleChange}
                            value={this.state.password}
                            />
                            <button>Show</button>
                        </section>
                        <section id='register-verify-password'>
                            <span>Verify Password: </span>
                            <input 
                            name='verifyPassword'
                            type='password'
                            placeholder='Verify Password'
                            onChange={this.handleChange}
                            value={this.state.verifyPassword}
                            />
                            <button>Show</button>
                        </section>
                    </section >
                    <section id='register-buttons'>
                        <Link to='/'>
                            <button>Back</button>
                        </Link>
                        <button>Clear</button>
                        <button id='register-button'
                        onClick={this.registerAccount}
                        >Register</button>
                    </section>
                </section>

            </div>
        )
    }


}

export default connect(null, {setUser})(Register)