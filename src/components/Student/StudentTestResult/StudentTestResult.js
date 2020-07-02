import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

import './StudentTestResult.scss'

function StudentTestResult(props){

    const [results, setResults] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [index, setIndex] = useState(0)

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

    useEffect(() => {
        axios.get(`/api/test-result/${props.match.params.testid}`)
        .then(res => {
            console.log(res.data)
            setResults(groupBy(res.data))
            setLoading(false)
        })

    }, [props.match.params.testid])


    console.log(results)

    return(
        <div>
            {isLoading === true 
            ?
            <div>
                <span>please wait</span>
            </div>
            :
            <div id='test-container'>
                <div className='questions-container'>   
                    <span id='test-name-span'>
                        {results[index].test_name}
                    </span>                    
                    <div id='num'>
                        <span id='question-num'>Question {index + 1}</span>
                    </div>
                    <div id='test-question'>
                        <div id='question-container'>
                            <span>{results[index].test_question}</span>
                        </div>
                    </div>
                    <div id='options'>
                        {results[index].options.map(option => {
                            return(
                                <div className='option-container'>
                                    {option.test_question_answer === true

                                    ?
                                    <div className='result-option-container' style={{"backgroundColor": "#7FFF00"}}>
                                        <div>{option.test_question_option}</div>
                                    </div>
                                    :
                                    
                                    option.student_response_id === option.test_question_option_id && option.test_question_answer === false

                                    ?

                                    <div className='result-option-container' style={{"backgroundColor": "red"}}>
                                        <div>{option.test_question_option}</div>
                                    </div>
                                    
                                    :

                                    <div>
                                        <span>{option.test_question_option}</span>
                                    </div>

                                    }
                                </div>
                        )
                    })
                    }
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
                        {index < results.length && index !== results.length -1
                        ? 
                        <button
                            className='auth-button'
                            id='test-btn-next'
                            onClick={() => setIndex(index + 1)}
                        >Next</button> 
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

export default connect(mapStateToProps)(StudentTestResult);