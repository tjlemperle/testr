import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import './StudentTest.scss'

function StudentTest(props) {

    const [test, setTest] = useState([])
    const [isLoading, setLoading] = useState(true)
    // const [index, setIndex] = useState(1) 
    let [questionNum, setQuestionNum] = useState(1)

    useEffect(() => {
        // setLoading(true)
        axios.get(`/api/test/${props.match.params.testid}`)
        .then(res => {
            setTest(res.data)
            setLoading(false)

        })
        .catch(err => console.log(err))
    }, [props.match.params.testid] )
    
    // const getTestQuestions = () => {

    // }
    
   
    
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
        <div id='test'>
            {isLoading === true 
            ? 
            <div>
                <span>Please wait...</span>
            </div>
            :
            <div id='test-container'>
                <div className='questions-container'>
                    <div>       
                        <span id='test-name-span'>
                            {test[0].test_name}
                        </span>                    
                        <div>
                            <span id='question-num'>Question {questionNum}</span>
                        </div>
                        <div id='question-container'>
                            <span>Test Question</span>
                        </div>
                        <div id='options'>
                            <div className='option-container'>
                                <input type='radio' className='test-question-option' />
                                <div>
                                    <span>Test Question Option 1</span>
                                </div>
                            </div>
                            <div className='option-container'>
                                <input type='radio' className='test-question-option' />
                                <div>
                                    <span>Test Question Option 2</span>
                                </div>
                            </div>
                            <div className='option-container'>
                                <input type='radio' className='test-question-option' />
                                <div>
                                    <span>Test Question Option 3</span>
                                </div>
                            </div>
                            <div className='option-container'>
                                <input type='radio' className='test-question-option' />
                                <div>
                                    <span>Test Question Option 4</span>
                                </div>
                            </div>
                            {/* <span>{Object.keys(questions)}</span> */}
                        </div>   
                        <div>
                            {questionNum > 1 
                            ? 
                            <button  
                                className='auth-button'
                                id='test-btn-prev'
                                onClick={() => setQuestionNum(questionNum -= 1)}
                            >Previous</button>
                            : 
                            null
                            }
                            {questionNum < questionsLength 
                            ? 
                            <button
                                className='auth-button'
                                id='test-btn-next'
                                onClick={() => setQuestionNum(questionNum += 1)}
                            >Next</button> 
                            : 
                            null
                            }
                            {questionNum === questionsLength
                            ?
                            <button
                                className='auth-button'
                                id='test-btn-submit'
                                // onClick={() => setQuestionNum(questionNum += 1)}
                            >Submit</button>
                            :
                            null
                            }
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
    
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(StudentTest);