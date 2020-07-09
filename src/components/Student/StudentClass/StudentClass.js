import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {setUser} from '../../../ducks/userReducer'
import axios from 'axios'
import {Bar} from 'react-chartjs-2'


import './StudentClass.scss'


function StudentClass(props) {

    const [tests, setTests] = useState([])
    const [testsTaken, setTestsTaken] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [labels, setLabels] = useState([])
    const [scores, setScores] = useState([])
    const [results, setResults] = useState([])
    const [testLength, setTestLength] = useState([])

    useEffect(() => {
        getClassInfo()
    }, [])

    useEffect(() => {
        console.log(testsTaken)

        const groupBy = (array) => {

            return array.reduce((result, option) => {
                const index = result.findIndex(question => question.test_question_id === option.test_question_id)
    
                if(index === -1){
                    result.push({test_name: option.test_name, test_question: option.test_question, test_question_id: option.test_question_id, options: [option], student_response: option.student_response_id})
                } else {
                    result[index].options.push(option)
                }
    
                return result
    
            }, [])
        }

        testsTaken.forEach(test => {
            axios.get(`/api/test-result/${test.test_id}`)
            .then(res => {
                setResults(results => [...results, groupBy(res.data)])
                // console.log(res.data)
                // setResults(groupBy(res.data))
            })
            // results.options.forEach()

            setLabels(labels => [...labels, test.test_name])
        })
    }, [testsTaken])

    useEffect(() => {
        results.forEach( test => {
            let score = 0
            
            test.forEach(option => {

                for(let i = 0; i < option.options.length; i++){
                    if(option.student_response === option.options[i].test_question_option_id && option.options[i].test_question_answer === true){
                        score++
                    } else {
                        console.log(option.student_response, option.options[i].test_question_option_id)
                    }
                }
                console.log(option.options)

            })
            console.log(score)
            console.log(test)
            
            setScores([...scores, score])
        })
        
    }, [results])
    
    console.log(scores)
    console.log(results)
    
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
    


    console.log(labels)
    
    const mappedTestsTaken = testsTaken.map((element, index) => {
        return(
            <Link to={`/test-result/${element.test_id}`}>
            <div className='student-class-test' key={index}>          
                <span>{element.test_name}</span>
            </div>
            </Link>
        )
    })

    const dataObj = {
        labels: labels,
        datasets: [
            {
                label: 'Test Scores',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: scores
            }
        ]
    }


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
                <span className='class-name-span'>{tests[0].class_name}</span>

                <div className='mapped-tests-avail'>
                    <span id='tests-avail-span'>Tests</span>
                    {mappedTests}
                </div>

                <div className='mapped-tests-taken'>
                    <span id='tests-taken-span'>Tests Taken</span>
                    {mappedTestsTaken}
                </div>
                <div className='graph-container'>

                <Bar 
                    data= {dataObj}
                    width= {50}
                    height = {50}
                    options= {{maintainAspectRatio: false}}
                    
                    />
                </div>
            </div>
            }
        </div>
        )
}


const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {setUser})(StudentClass);