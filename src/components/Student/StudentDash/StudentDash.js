import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {setUser} from '../../../ducks/userReducer'
import axios from 'axios'

import './StudenDash.scss'

function StudentDash(props){

// console.log(props)
    const [classes, setClasses] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [addClassID, setAddClassID] = useState('')



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

    const addClass = () => {
        axios.post(`api/class/${addClassID}`)
        window.location.reload(false)
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
            {/* <div style={{ width: '60%', height:'1px', background: 'black' }}></div> */}
            <div>
                <input 
                    className='class-input'
                    type='text'
                    placeholder='Enter Class ID'
                    value={addClassID}
                    onChange={e => setAddClassID(e.target.value)}
                />
                <button
                    className='auth-button'
                    id='add-class-btn'
                    onClick={addClass}
                >+ Join Class</button>
            </div>
        {isLoading === true ?
        
        <span id='loading-span'>Please wait...</span>
        :
        <div id='mapped-container'>
            {mappedClasses}
        </div>    
        }
        </section>
        
    </div>
)   
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {setUser})(StudentDash);