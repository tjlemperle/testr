import React, {useEffect, useState} from 'react'
// import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
// import axios from 'axios'

import './AdminCreateTest.scss'




function AdminCreateTest(props){
    
    const [index, setIndex] = useState(0)
    const [isLoading, setLoading] = useState(true)
    
    useEffect(() => {
        setLoading(false)
    })

    const submitTest = () => {
    
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
                        <input 
                        className='test-option-input'
                            placeholder='Insert Test Name'
                        />                 
                    <div id='num'>
                        <span id='question-num'>Question {index + 1}</span>
                    </div>
                    <div id='test-question'>
                        <div id='question-container'>
                            <textarea 
                            className='test-question-input'
                                placeholder='insert test question'
                            />
                        </div>
                    </div>
                    <div id='options' >
                        <div className='option-container'>
                            <div>
                                <input 
                                    type='radio'
                                />
                                <input 
                                className='test-option-input'
                                    placeholder='Insert test option'
                                />
                            </div>
                        </div>
                        <div className='option-container'>
                            <div>
                                <input 
                                    type='radio'
                                />
                                <input 
                                className='test-option-input'
                                    placeholder='Insert test option'
                                />
                            </div>
                        </div>
                        <div className='option-container'>
                            <div>
                                <input 
                                    type='radio'
                                />
                                <input 
                                className='test-option-input'
                                    placeholder='Insert test option'
                                />
                            </div>
                        </div>
                        <div className='option-container'>
                            <div>
                                <input 
                                    type='radio'
                                />
                                <input 
                                className='test-option-input'
                                    placeholder='Insert test option'
                                />
                            </div>
                        </div>
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
 
                        <button
                            className='auth-button'
                            id='test-btn-next'
                            onClick={() => setIndex(index + 1)}
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