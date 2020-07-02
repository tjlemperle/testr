import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {setUser} from '../../../ducks/userReducer'
import axios from 'axios'
// import {Bar} from 'react-chartjs-2'


import './StudentClass.scss'


function StudentClass(props) {

    const [tests, setTests] = useState([])
    const [testsTaken, setTestsTaken] = useState([])
    const [isLoading, setLoading] = useState(true)
    // const [labels, setLabels] = useState([])
    // const [data, setData] = useState([])

    useEffect(() => {
        getClassInfo()
    }, [])
    
    
    
    const getClassInfo = () => {
        axios.get(`/api/class/${props.match.params.classid}`)
        .then(res => {
            console.log(res.data)
            setTests(res.data.testsAvailable)
            setTestsTaken(res.data.testsTaken)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }

    const mappedTests = tests.map((element, index) => {
        return(
            <Link to={`/test/${element.test_id}`}>
            <div className='student-class-test' key={index}>          
                <span>{element.test_name}</span>
                {/* <span>{element.end_date}</span> */}
            </div>
            </Link>
        )
    })

    const mappedTestsTaken = testsTaken.map((element, index) => {
        return(
            <Link to={`/test-result/${element.test_id}`}>
            <div className='student-class-test' key={index}>          
                <span>{element.test_name}</span>
            </div>
            </Link>
        )
    })

    // const dataObj = {
    //     labels: ['test1', 'test2'],
    //     datasets: [
    //         {
    //             label: 'Test Scores',
    //             backgroundColor: 'rgba(255,99,132,0.2)',
    //             borderColor: 'rgba(255,99,132,1)',
    //             borderWidth: 1,
    //             hoverBackgroundColor: 'rgba(255,99,132,0.4)',
    //             hoverBorderColor: 'rgba(255,99,132,1)',
    //             data: [23,65]
    //         }
    //     ]
    // }


    console.log(tests, testsTaken)

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
                <div>
                    {mappedTestsTaken}
                </div>
                {/* <Bar 
                    data= {dataObj}
                    width= {20}
                    height = {30}
                    options= {{maintainAspectRatio: false}}

                /> */}
            </div>
            }
        </div>
        )
}


const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {setUser})(StudentClass);