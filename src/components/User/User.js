import React, {useState} from 'react'
import {connect} from 'react-redux'

function User(props){

    const [changePassword, setToggle] = useState(false)

    return (
        <section id='user-info-container'>
            <section id='user-info-inputs'>
                <div>
                    <span>First Name: </span>
                    <span>{props.users.first_name}</span>
                </div>
                <div>
                    <span>Last Name: </span>
                    <span>{props.users.last_name}</span>
                </div>
                <div>
                    <span>Email: </span>
                    <span>{props.users.user_email}</span>
                    <button>Update Email</button>
                </div>
                { changePassword === false 
                ?
                <div>
                    <button
                        onClick={setToggle}
                    >Change Password</button>
                </div>

                :

                <div>
                    <input />
                    <input />
                </div>
                }
            </section>
        </section>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, null)(User);