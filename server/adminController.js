
module.exports = {
    getAdminClasses: async (req, res) => {
        const db = req.app.get('db')

        const {user_id} = req.session.user

        // console.log(user_id)

        let classes = await db.admin.get_admin_classes(user_id)

        console.log(classes)

        return res.status(200).send(classes)
    },

    getAllAdminTests: async( req, res) => {
        const db = req.app.get('db')

        const {class_id} = req.params
        // const {user_id} = req.session.user

        let tests = await db.admin.get_admin_tests(class_id)

        res.status(200).send(tests)
    },

    createTestId: async (req,res) => {
        const db = req.app.get('db')

        const {class_id, testName} = req.body

        console.log(class_id, testName)

        db.admin.create_test_id(testName, class_id)

        res.sendStatus(200)
    }, 

    getTestByName: async (req, res) => {
        const db = req.app.get('db')

        const {testname} = req.params

        console.log(testname)

        let testInfo = await db.admin.get_test_by_name(testname)

        res.status(200).send(testInfo)
    },

    getQuestionId: async (req, res) => {
        const db = req.app.get('db')

        const {test_id, test_question} = req.body

        console.log(test_id, test_question)

        let test_question_id = await db.admin.get_question_id(test_id, test_question)

        console.log(test_question_id)

        res.status(200).send(test_question_id)
    },

    submitQuestionOption: (req, res) => {
        const db = req.app.get('db')

        const {test_question_id, test_question_option, test_question_answer} = req.body

        console.log(test_question_id, test_question_option, test_question_answer)

        db.admin.submit_question_option(test_question_id, test_question_answer, test_question_option)

        res.sendStatus(200)
    },

    deleteTest: (req, res) => {
        const db = req.app.get('db')

        const {test_id} = req.params

        console.log(test_id)

        db.admin.delete_test(test_id)

        res.sendStatus(200)
    }
}