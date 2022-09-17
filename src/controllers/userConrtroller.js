const { createUser, getUser, getloginModel, userEmployee, deleteEmployee, check_user_exist } = require("../models/users")
const jwt = require('jsonwebtoken');
const createUserController = async(req, res) => {
    let newuser = req.body;
    newuser.parent_id = req.session.user_id
    if (req.session.user && req.session.user.rol == 'user_admin') {
        newuser.rol = 'user_supervisor'
    }
    let is_email_exist = await check_user_exist(newuser.email)
    if (is_email_exist.length) {
        res.redirect('/')
    } else {
        const user = await createUser(newuser)
        res.redirect('/')
    }


}

const getuser = async(req, res) => {
    const user = await getUser(req.body)
    res.status(200).json({ user })
}

const getEmployees = async(id) => {
    const user = await userEmployee(id)
    return user;
}

const deleteEmployeeController = async(req, res) => {
    const { id } = req.params
    const user = await deleteEmployee(req.session.user_id, id)

    res.redirect("/")
}


const getlogin = async(req, res) => {
    const users = await getloginModel(req.body)
    if (req.body && users.length) {
        req.session.login = true;
        req.session.user_id = users[0]._id
        req.session.user = users[0]
    } else {
        req.session.login = false
    }

    res.redirect('/');
}


module.exports = { createuser: createUserController, getuser, getlogin, getEmployees, deleteEmployeeController }