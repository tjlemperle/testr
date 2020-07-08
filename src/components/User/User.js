import React, {useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import './User.scss'


function User(props){

    const [changePassword, setToggle] = useState(false)
    const [changeEmail, setEmailToggle] = useState(false)
    const [user_email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [newPassword, setNewPassword] = useState('')
    // const [verifyNewPassword, setVerifyNewPassword] = useState('')


    const updateEmail = () => {
        console.log(user_email)
        axios.put('api/user', {user_email})
        .then(
            window.location.reload(false)
        )
    }

    return (
    <div id='user-container'>
        <section id='user-info-container'>
            <span id='user-settings-span'>User Information</span>
            <section id='user-info-inputs'>
                <div>
                    <span>First Name: </span>
                    <span>{props.users.first_name}</span>
                </div>
                <div>
                    <span>Last Name: </span>
                    <span>{props.users.last_name}</span>
                </div>
                <div id='email-container'>
                    <span>Email: </span>
                    <span>{props.users.user_email}</span>
                    {changeEmail === false 
                    ?
                    <button
                        className='auth-button'
                        onClick={setEmailToggle}                   
                    >Update Email</button>
                    :
                    <div>

                        <input 
                            onChange={e => setEmail(e.target.value)}
                        />
                        <div>
                            <button
                                className='auth-button'
                                onClick={() => setEmailToggle(false)}
                            >Cancel</button>
                            <button
                                onClick={updateEmail}
                                className='auth-button'
                            >Submit</button>
                        </div>
                    </div>
                    }
                </div>

                <div>
                    { changePassword === false 
                    ?
                    <div>
                        <button
                            className='auth-button'
                            onClick={setToggle}
                            >Change Password</button>
                    </div>

                    :

                    <div>
                    <div>
                        <span>Old Password</span>
                        <input />
                    </div>
                    <div>
                        <span>New Password</span>
                        <input />
                    </div>
                    <div>
                        <span>Re-enter New Password</span>
                        <input />
                    </div>
                    <div>
                        <button
                            className='auth-button'
                            onClick={() => setToggle(false)}
                            >Cancel</button>
                        <button
                            className='auth-button'
                        >Submit</button>
                    </div>
                    </div>
                    }
                </div>
            </section>
        </section>
    </div>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, null)(User);