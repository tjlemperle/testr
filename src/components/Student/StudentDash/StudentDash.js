import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {setUser} from '../../../ducks/userReducer'
import axios from 'axios'

import './StudenDash.css'

function StudentDash(props){

// console.log(props)
    const [classes, setClasses] = useState([])
    const [isLoading, setLoading] = useState(true)



    useEffect(() => {
        getClasses()

    }, [])

    const getClasses = () => {
        axios.get('api/classes')
        .then(res => {
            setClasses(res.data)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }

    const mappedClasses = classes.map((element, index) => {
        return(
            <Link to={`/class/${element.class_id}`}>              
            <div className='student-class-dash' key={index}>
                <span>{element.class_name}</span>
                <div className='teacher-name'>
                    <span>{element.first_name}</span>
                    <span>{element.last_name}</span>
                </div>
            </div>
            </Link>
        )
    })

        return (
    <div>
        <section id='dashboard-container'>
            <span id='classes-title-span'>Classes</span>
        {isLoading === true ?
        
        <span id='loading-span'>Please wait...</span>
        :
        <div>
        {mappedClasses}
        </div>    
        }
        </section>
        
    </div>
)   
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {setUser})(StudentDash);