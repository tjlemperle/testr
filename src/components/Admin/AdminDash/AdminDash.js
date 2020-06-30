import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

import './AdminDash.scss'

function AdminDash(props){


}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(AdminDash);