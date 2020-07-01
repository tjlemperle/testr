import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import './StudentTest.scss'

function StudentTest(props) {

    const [test, setTest] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [index, setIndex] = useState(0)
    // let [questionNum, setQuestionNum] = useState(1)

    const groupBy = (array) => {
        
        return array.reduce((result, option) => {
            const index = result.findIndex(question => question.test_question_id === option.test_question_id)

            if(index === -1){
                result.push({test_name: option.test_name, test_question: option.test_question, test_question_id: option.test_question_id, options: [option], student_response: null})
            } else {
                result[index].options.push(option)
            }

            return result

        }, [])
    }

    useEffect(() => {
        axios.get(`/api/test/${props.match.params.testid}`)
        .then(res => {
            setTest(groupBy(res.data))
            setLoading(false)

        })
        .catch(err => console.log(err))

        
    }, [props.match.params.testid] )
    
 
    const recordStudentAnswer = (test_questions_option_id) => {
        setTest(prevTest => {
            const newTest = [...prevTest]
            newTest[index].student_response = test_questions_option_id

            return newTest
        })    
    }
    

    

    // const questions = groupBy(test, 'test_question_id')
    // const questionsLength = Object.keys(questions).length

    // console.log(questions)
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
                    <span id='test-name-span'>
                        {test[index].test_name}
                    </span>                    
                    <div>
                        <span id='question-num'>Question {index + 1}</span>
                    </div>
                    <div id='test-question'>
                        <div id='question-container'>
                            <span>{test[index].test_question}</span>
                        </div>
                    </div>
                    <div id='options'>
                        {test[index].options.map(option => {
                            return(
                                <div className='option-container'>
                                    <div className={`test-question-option ${test[index].student_response === option.test_question_option_id ? 'test-question-option-selected': ''}`} 
                                        onClick={() => recordStudentAnswer(option.test_question_option_id)}
                                    > 
                                        
                                    </div>
                                    <div>
                                        <span>{option.test_question_option}</span>
                                    </div>
                                </div>
                            )
                        })
                        }
                        
                        {/* <span>{Object.keys(questions)}</span> */}
                    </div>   
                    <div className='test-btns'>
                        {index > 0 
                        ? 
                        <button  
                            className='auth-button'
                            id='test-btn-prev'
                            onClick={() => setIndex(index - 1)}
                        >Previous</button>
                        : 
                        null
                        }
                        {index < test.length && index !== test.length -1
                        ? 
                        <button
                            className='auth-button'
                            id='test-btn-next'
                            onClick={() => setIndex(index + 1)}
                        >Next</button> 
                        : 
                        null
                        }
                        {index === test.length - 1
                        ?
                        <button
                            className='auth-button'
                            id='test-btn-submit'
                            // onClick={() => setindex(index += 1)}
                        >Submit</button>
                        :
                        null
                        }
                    </div>
                </div>
            </div>
            }
        </div>
    )
    
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(StudentTest);