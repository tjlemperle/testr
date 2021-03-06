const bcrypt = require('bcryptjs')

module.exports = {

    register: async (req, res) => {
        const {username, first_name, last_name, user_email, password, role} = req.body
        const db = req.app.get('db')

        let user = await db.auth.check_user(username)
        if(user[0]) {
            return res.status(409).send('Username or email taken')
        }

        let salt = bcrypt.genSaltSync(5)
        let hash = bcrypt.hashSync(password, salt)

        console.log(username, first_name, last_name, user_email, password, role, hash)
        
        let [newUser] = await db.auth.register_user({
            username,
            first_name,
            last_name,
            user_email,
            password: hash,
            role
        });

        req.session.user = newUser
        res.status(201).send(req.session.user)

    },

    login: async (req,res) => {
        const {username, password} = req.body
        const db = req.app.get('db')

        console.log(username)
        console.log(password)

        let user = await db.auth.check_user(username)
        if(!user[0]){
            return res.status(400).send('No user found')
        }
        console.log(user)
        
        const authenticated = bcrypt.compareSync(password, user[0].password)
        if(!authenticated){
            return res.status(401).send('Username or password incorrect')
        }
        
        delete user[0].password

        req.session.user = user[0]
        res.status(202).send(req.session.user)
    },

    userInfo: (req, res) => {
        if(req.session.user) {
            // console.log(req.session.user)
            res.status(200).send(req.session.user)
        } else {
            res.sendStatus(404)
        }
    }, 

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },

    getStudentClasses: async (req, res) => {
        const db = req.app.get('db')

        const {user_id} = req.session.user

        let classes = await db.student.get_classes(user_id)

        return res.status(200).send(classes)
    },

    getAllTests: async (req, res) => {
        const db = req.app.get('db')

        const {user_id} = req.session.user
        const {class_id} = req.params

        let testsAvailable = await db.student.get_class_info(class_id, user_id)

        let testsTaken = await db.student.tests_taken(user_id, class_id)

        for (var i = 0, len = testsTaken.length; i < len; i++) { 
            for (var j = 0, len2 = testsAvailable.length; j < len2; j++) { 
                if (testsTaken[i].test_id === testsAvailable[j].test_id) {
                    testsAvailable.splice(j, 1);
                    len2=testsAvailable.length;
                }
            }
        }
        console.log(testsAvailable, testsTaken)

        res.status(200).send({testsAvailable, testsTaken})
    },

    getSingleTest: async (req, res) => {
        const db = req.app.get('db')

        // const {user_id} = req.session.user
        const {test_id} = req.params

        // let status = await db.student.check_student_test_status(test_id, user_id)

        // console.log(status, user_id, test_id)

        // if(status){

            let test = await db.student.get_test_questions(test_id)
 
            console.log(test)
            res.status(200).send(test)

        // } else {
        //     res.status(401).send('Unauthorized to take this test')
        // }

    },

    addStudentClass: async(req, res) => {
        const db = req.app.get('db')

        const {class_id} = req.params
        const {user_id} = req.session.user

        let status = await db.student.check_class_user(user_id, class_id)

        if(status[0]){
            console.log('student already in class')
        } else{
            
            db.student.add_student_class(user_id, class_id)
        }


        res.sendStatus(200)

    },

    submitTestAnswers: (req, res) => {
        const db = req.app.get('db')

        console.log(req.body)

        const {user_id} = req.session.user
        const {test} = req.body

        test.forEach(element => {
            // console.log(element.test_question_id, element.student_response)
            db.student.submit_test_answer(element.test_question_id, element.student_response, user_id)
        });


        res.status(200).send(test[0].class_id)
    },

    singleTestResult: async (req, res) => {
        const db = req.app.get('db')

        const {user_id} = req.session.user
        const {test_id} = req.params

        console.log(test_id, user_id)

        let results = await db.student.single_test_results(test_id, user_id)

        console.log(results)

        res.status(200).send(results)
    },

    updateEmail: async (req, res) => {
        const db = req.app.get('db')

        const {user_id} = req.session.user
        const {user_email} = req.body

        db.auth.update_email(user_id, user_email)
    }


}