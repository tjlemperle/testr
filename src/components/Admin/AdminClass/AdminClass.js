import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

import './AdminClass.scss'

function AdminClass(){

}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(AdminClass);