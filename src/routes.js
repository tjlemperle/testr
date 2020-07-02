import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Auth from './components/Auth/Auth'
import Register from './components/Register/Register'
import User from './components/User/User'
import StudentDash from './components/Student/StudentDash/StudentDash'
import StudentClass from './components/Student/StudentClass/StudentClass'
import StudentTest from './components/Student/StudentTest/StudentTest'
import AdminDash from './components/Admin/AdminDash/AdminDash'
import AdminClass from './components/Admin/AdminClass/AdminClass'
import AdminCreateTest from './components/Admin/AdminCreateTest/AdminCreateTest'
import StudentTestResult from './components/Student/StudentTestResult/StudentTestResult'

export default (
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/register' component={Register} />
        <Route path='/user' component={User} />
        <Route path='/admindashboard' component={AdminDash} />
        <Route path='/adminclass/:classid' component={AdminClass} />
        <Route path='/admincreatetest/:testname' component={AdminCreateTest} />
        <Route path='/dashboard' component={StudentDash} />
        <Route path='/class/:classid' component={StudentClass} />
        <Route path='/test/:testid' component={StudentTest} />
        <Route path='/test-result/:testid' component={StudentTestResult} />
    </Switch>
)