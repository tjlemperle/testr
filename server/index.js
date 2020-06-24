require('dotenv').config()
const express =  require('express')
const massive = require('massive')
const session = require('express-session')
const cors = require('cors')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const port = SERVER_PORT
const ctrl = require('./controller')
const app = express()

app.use(cors());
app.use(express.json())

app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: SESSION_SECRET,
      cookie: { maxAge: 1000 * 60 * 60 * 24 }
    })
  );

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected')
    app.listen(port, console.log(`Server is running on port: ${port}`))
})

// //auth
app.post('/auth/register', ctrl.register)
app.post('/auth/login', ctrl.login)
// app.get('/auth/me', ctrl.userInfo) //userReducer
// app.post('/api/logout', ctrl.logout)

// //student
// app.get('/api/user', ctrl.getUserInfo)
// app.put('/api/user', ctrl.updateUserInfo)
// app.get('/api/classes', ctrl.getStudentClasses)
// app.get('/api/tests', ctrl.getAllTests)
// app.post('/api/test', ctrl.submitTestAnswers)
// app.get('/api/test/:id', ctrl.getSingleTest)


// //admin
// app.get('/api/classes', ctrl.getAdminClasses)
// app.get('/api/classes/students', ctrl.getClassStudents)
// app.post('/api/createTest', ctrl.createTest)
// app.put('/api/test/:id', ctrl.updateTest)
// app.delete('/api/test/:id', ctrl.deleteTest)
