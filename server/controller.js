const bcrypt = require('bcryptjs')

module.exports = {

    register: async (req, res) => {
        const {username, first_name, last_name, user_email, password, role} = req.body
        const db = req.app.get('db')

        let user = await db.auth.check_user(username)
        if(user[0]) {
            return res.status(400).send('Username taken')
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

    userInfo: async (req, res) => {
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
    }
}