import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

function StudentTest(props) {

    const [test, setTest] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        getTestQuestions()
        // console.log(props.match.params.testid)
    } )

    const getTestQuestions = () => {
        axios.get(`/api/test/${props.match.params.testid}`)
        .then(res => {
            setTest(res.data)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }

    const mapTestQuestions = () => {
        
    }

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
                <div>
                    {test[0].test_name}
                    {test[0].test_question}
                    {test[0].test_question_option}
                    {test[1].test_question_option}
                    {test[2].test_question_option}
                    {test[3].test_question_option}
                </div>
            }
        </div>
    )

}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(StudentTest);