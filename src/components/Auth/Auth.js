import React, {useState} from 'react'
// import {useInput} from '../../hooks/input-hook'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {setUser} from '../../ducks/userReducer'
import axios from 'axios'

import './Auth.scss'



function Auth(props) {

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')


    const handleLogin = () => {
          // console.log(password)

          console.log(username, password)
        axios.post('/auth/login', {username, password})
        .then(res => {
            console.log(res.data)
            props.setUser(res.data)
            if(res.data.role === 'STUDENT'){
                props.history.push('/dashboard')
            } else if(res.data.role ==='TEACHER'){
                props.history.push('/admindashboard')
            }
            
        })
        .catch(err => {
            console.log(err)
            alert('Username or password incorrect')
        })

    }

 

    // console.log(username, password)
    return (
        <div className='auth-container'>
            <div id='auth'>
                <span id='auth-title-span'>TESTr</span>
                <section id='auth-input-container'>
                    <section id='auth-input'>
                        <span id='username-span'>Username </span>
                        <input 
                            id='username-input'
                            type='text'
                            name='username'
                            placeholder='Username'
                            value={username}
                            onChange={e => setUserName(e.target.value)}
                            />
                    </section>
                    <sectoin id='pass-container'>
                        <span id='password-span'>Password </span>
                        <input 
                            id='password-input'
                            type='password'
                            name='password'
                            placeholder='Password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            />
                    </sectoin>
                </section>
                <section id='auth-btns-container'>
                    <button 
                        className='auth-button'
                        id='login-btn'
                        onClick={handleLogin}
                        >Login</button>
                    <Link to='/register'>
                        <button 
                            className='auth-button'
                            id='register-link-btn'
                            >Register</button>
                    </Link>
                </section>
            </div>
        </div>
    )
}


export default connect(null, {setUser})(Auth)