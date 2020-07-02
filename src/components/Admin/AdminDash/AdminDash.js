import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

import './AdminDash.scss'


function AdminDash(props){

    const [classes, setClasses] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        getAdminClasses()
    }, [])

    const getAdminClasses = () => {
        axios.get(`api/adminclasses`)
        .then(res => {
            setClasses(res.data)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }

    const mappedClasses = classes.map((element, index) => {
        return(
            <Link to={`/adminclass/${element.class_id}`}>              
            <div className='student-class-dash' style={{"marginTop": "20px"}} key={index}>
                <span>{element.class_name}</span>
                <div className='teacher-name'>
                    <span>{element.first_name}</span>
                    <span>{element.last_name}</span>
                </div>
            </div>
            </Link>
        )
    })

    return(
        <section id='admin-dashboard-container'>
            <span id='classes-title-span'>Classes</span>

            {isLoading === true ?
            
            <span id='admin-loading-span'>Please wait...</span>
            :
            <div className='mapped-container'>
            {mappedClasses}
            </div>    
            }
        </section>
    
    )

}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(AdminDash);