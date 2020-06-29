import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {setUser} from '../../../ducks/userReducer'
import axios from 'axios'

import './StudentClass.scss'


function StudentClass(props) {

    const [tests, setTests] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        getClassInfo()
        console.log(props.match.params.classid)
    })

    const getClassInfo = () => {
        axios.get(`/api/class/${props.match.params.classid}`)
        .then(res => {
            setTests(res.data)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }

    const mappedTests = tests.map((element, index) => {
        return(
            <Link to={`/test/${element.test_id}`}>
            <div className='student-class-test' key={index}>          
                <span>{element.test_name}</span>
                <span>{element.end_date}</span>
            </div>
            </Link>
        )
    })

    console.log(tests)

    return(
        
        <div>
            {isLoading === true
            ?
            
            <div>
                <span>please wait</span>
            </div>
            :
            <div>
            <span>{tests[0].class_name}</span>
                {mappedTests}
            </div>

            }
        </div>
        )
}


const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {setUser})(StudentClass);