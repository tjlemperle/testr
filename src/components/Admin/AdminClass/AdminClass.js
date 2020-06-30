import React, {useEffect, useState} from 'react'
// import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

import './AdminClass.scss'

function AdminClass(props){

    const [tests, setTests] = useState([])
    const [isLoading, setLoading] = useState(true)
        // const [addClassByID, setAddClassByID] = useState('') use this to add a student id to class on next page

    useEffect(() => {
        // getAdminTests()
        // console.log(props.match.params.classid)
        axios.get(`/api/adminclass/${props.match.params.classid}`)
        .then( res => {
            setTests(res.data)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }, [props])

    // const getAdminTests = () => {
    // }

    const mappedTests = tests.map((element, index) => {
        return(
            <div key={index}>
                <span>{element.test_name}</span>
                <span>{element.end_date}</span>
            </div>
        )
    })


    return(
        <div>
            <span>Tests</span>
            {/* <div>
                <input 
                    type='text'
                    placeholder='Enter Class ID'
                    value={addClassID}
                    onChange={e => setAddClassID(e.target.value)}
                />
                <button
                    onClick={addClass}
                >Add Class</button>
            </div> */}
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

export default connect(mapStateToProps)(AdminClass);