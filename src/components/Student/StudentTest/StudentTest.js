import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import './StudentTest.css'

function StudentTest(props) {

    const [test, setTest] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [index, setIndex] = useState(1)
    const [questionNum, setQuestionNum] = useState(1)

    useEffect(() => {
        // setLoading(true)
        getTestQuestions()
        console.log(props.match.params.testid)
    }, [] )
    
    const getTestQuestions = () => {
        axios.get(`/api/test/${props.match.params.testid}`)
        .then(res => {
            setTest(res.data)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }
    
   
    
    const groupBy = (array, key) => {
        
        return array.reduce((result, currentValue) => {
           (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue) 

           return result
        }, {})
    }

    const questions = groupBy(test, 'test_question_id')
    const questionsLength = Object.keys(questions).length

    console.log(questions)
    // console.log(questionsLength)
    console.log(test)

    return(
        <div>
            <span>Test: </span>
            {isLoading === true 
            ? 
                <div>
                    <span>Please wait</span>
                </div>
            :
                <div className='questions-container'>
                    <div>                           
                        {test[0].test_name}
                        <div>
                        <span>{questionNum}.</span>
                        <span>{}</span>
                        </div>
                        <div>
                            {questionNum > 1 ? <button>Previous</button>: null}
                            {questionNum < questionsLength ? <button>Next</button> : null}
                        </div>
                    </div>
                </div>
            }
        </div>
    )

}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(StudentTest);