import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser, resetUser} from '../../ducks/userReducer'
import axios from 'axios'

import './Nav.scss'

class Nav extends Component{
    constructor(props){
        super(props)
        this.state ={

        }
    }

    componentDidMount(){
        this.props.getUser()
        // console.log(this.props)
    }

    

    handleLogout = () => {
        axios.post('/api/logout')
        .then(() => {
            this.props.resetUser()
        })
    }

    render(){
    // console.log(this.props)
        return (
        <section id='nav-container'>             
            <section id='nav-links-container'>
                <div id='arrow-container'>
                    <span id='arrow'>←</span>
                </div>
                <section id='nav-user-info'>
                    <Link className='link' to='/user'>
                        <div id='account-link-container'>
                            <img 
                            src='https://e7.pngegg.com/pngimages/117/435/png-clipart-human-figure-icon-illustration-user-silhouette-my-account-icon-animals-black.png'
                            alt='silhoutte'
                            id='account-silhoutte'
                            />
                            <span id='account-span'>Account</span>
                        </div>
                    </Link>
                </section>
                <section id='nav-dashboard'>
                    <Link className='link' to='/dashboard'>
                        <div id='dashboard-link-container'>
                            <img
                                src='https://icons-for-free.com/iconfiles/png/512/dashboard-1320568680781126244.png'
                                alt='dashboard'
                                id='dashboard-silhoutte'
                            />
                            <span>Dashboard</span>
                        </div>
                    </Link>
                </section>

            </section>
            <Link to='/'>
                <button 
                onClick={this.handleLogout}
                id='nav-logout-btn'
                >Logout</button>
            </Link>
        </section>
    )
}
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getUser, resetUser})(Nav);