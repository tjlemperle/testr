
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
    }
}