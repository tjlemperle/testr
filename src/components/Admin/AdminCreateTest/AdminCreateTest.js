import React, {useEffect, useState} from 'react'
// import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

import './AdminCreateTest.scss'




function AdminCreateTest(props){
    
    const [index, setIndex] = useState(0)
    const [isLoading, setLoading] = useState(true)
    const [testID, setTestID] = useState(0)
    const [classID, setClassID] = useState(0)
    const [testName, setTestName] = useState('')
    const [testQuestion, setTestQuestion] = useState('')
    const [option1, setOption1] = useState('')
    const [option2, setOption2] = useState('')
    const [option3, setOption3] = useState('')
    const [option4, setOption4] = useState('')
    const [answer1, setAnswer1] = useState(false)
    const [answer2, setAnswer2] = useState(false)
    const [answer3, setAnswer3] = useState(false)
    const [answer4, setAnswer4] = useState(false)
    // const [testArray, setTestArray] = useState([])
    const [testQuestionsArray, setTestQuestionsArray] = useState([])
    const [testQuestionOptionsArray, setTestQuestionOptionsArray] = useState([])


    useEffect(() => {

        console.log(props.match.params.testname)
        axios.get(`/api/gettestbyname/${props.match.params.testname}`)
        .then(res => {
            console.log(res.data)
            setTestID(res.data[0].test_id)
            setClassID(res.data[0].class_id)
            setTestName(res.data[0].test_name)
            setLoading(false)
        })
    })

    console.log(testName, testID, classID)

    const submitQuestion = async () => {

     
        setTestQuestionsArray(testQuestionsArray => [...testQuestionsArray, testQuestion])
        
        const result = await axios.post(`/api/submitquestion`, {test_id: testID, test_question: testQuestion})

        console.log(result)
        console.log(result.data[0].test_question_id)
        
        axios.all([
            axios.post(`/api/submitquestionoption`, {test_question_id: result.data[0].test_question_id, test_question_option: option1, test_question_answer: answer1}),
            axios.post(`/api/submitquestionoption`, {test_question_id: result.data[0].test_question_id, test_question_option: option2, test_question_answer: answer2}),
            axios.post(`/api/submitquestionoption`, {test_question_id: result.data[0].test_question_id, test_question_option: option3, test_question_answer: answer3}),
            axios.post(`/api/submitquestionoption`, {test_question_id: result.data[0].test_question_id, test_question_option: option4, test_question_answer: answer4})   
        ])
        .then(
            
            setTestQuestion(''),
            setOption1(''),
            setOption2(''),
            setOption3(''),
            setOption4(''),
            setAnswer1(false),
            setAnswer2(false),
            setAnswer3(false),
            setAnswer4(false),
            setIndex(index + 1)
            )

    



    }

    console.log(testQuestionsArray)
    console.log(answer1)


    const submitTest = async () => {
    
        setTestQuestionsArray(testQuestionsArray => [...testQuestionsArray, testQuestion])
        
        const result = await axios.post(`/api/submitquestion`, {test_id: testID, test_question: testQuestion})

        console.log(result)
        console.log(result.data[0].test_question_id)
        
        axios.all([
            axios.post(`/api/submitquestionoption`, {test_question_id: result.data[0].test_question_id, test_question_option: option1, test_question_answer: answer1}),
            axios.post(`/api/submitquestionoption`, {test_question_id: result.data[0].test_question_id, test_question_option: option2, test_question_answer: answer2}),
            axios.post(`/api/submitquestionoption`, {test_question_id: result.data[0].test_question_id, test_question_option: option3, test_question_answer: answer3}),
            axios.post(`/api/submitquestionoption`, {test_question_id: result.data[0].test_question_id, test_question_option: option4, test_question_answer: answer4})   
        ])
        .then(
            
            setTestQuestion(''),
            setOption1(''),
            setOption2(''),
            setOption3(''),
            setOption4(''),
            setAnswer1(false),
            setAnswer2(false),
            setAnswer3(false),
            setAnswer4(false),
            props.history.push(`/adminclass/${classID}`)
            )
    }


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
                        <span>{testName}</span>              
                    <div id='num'>
                        <span id='question-num'>Question {index + 1}</span>
                    </div>
                    <div id='test-question'>
                        <div id='question-container'>
                            <textarea 
                                value={testQuestion}
                                onChange={e => setTestQuestion(e.target.value)}
                                className='test-question-input'
                                placeholder='insert test question'
                            />
                        </div>
                    </div>
                    <div id='options' >
                        <div className='option-container'>
                            <div>
                                <input 
                                    onClick={() => setAnswer1(true)}
                                    value={answer1}
                                    checked={answer1}
                                    type='radio'
                                />
                                <input 
                                    onChange={e => setOption1(e.target.value)}
                                    value={option1}
                                    className='test-option-input'
                                    placeholder='Insert test option'
                                />
                            </div>
                        </div>
                        <div className='option-container'>
                            <div>
                                <input 
                                    onClick={() => setAnswer2(true)}
                                    value={answer2}
                                    checked={answer2}
                                    type='radio'
                                />
                                <input 
                                    onChange={e => setOption2(e.target.value)}
                                    value={option2}
                                    className='test-option-input'
                                    placeholder='Insert test option'
                                />
                            </div>
                        </div>
                        <div className='option-container'>
                            <div>
                                <input 
                                    onClick={() => setAnswer3(true)}
                                    value={answer3}
                                    checked={answer3}
                                    type='radio'
                                />
                                <input 
                                    onChange={e => setOption3(e.target.value)}
                                    value={option3}
                                    className='test-option-input'
                                    placeholder='Insert test option'
                                />
                            </div>
                        </div>
                        <div className='option-container'>
                            <div>
                                <input 
                                    onClick={() => setAnswer4(true)}
                                    value={answer4}
                                    checked={answer4}
                                    type='radio'
                                />
                                <input 
                                    onChange={e => setOption4(e.target.value)}
                                    value={option4}
                                    className='test-option-input'
                                    placeholder='Insert test option'
                                />
                            </div>
                        </div>
                    </div>   
                    <div className='test-btns'>
                        {/* {index > 0 
                        ? 
                        <button  
                            className='auth-button'
                            id='test-btn-prev'
                            onClick={() => setIndex(index - 1)}
                        >Previous</button>
                        : 
                        null
                        } */}
 
                        <button
                            className='auth-button'
                            id='test-btn-next'
                            onClick={submitQuestion}
                        >Next</button> 


                        <button
                            className='auth-button'
                            id='test-btn-submit'
                            onClick={submitTest}
                        >Submit</button>

                    </div>
                </div>
            </div>
            }
        </div>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(AdminCreateTest);