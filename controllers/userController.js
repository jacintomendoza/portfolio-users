// require the db created in the index file
const db = require('../models/index')

// get the Users model
const User = db.Users;

// main work
const addUser = async (req, res) => {
    let input_data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
     }

     // using the builtin 'create' function on User Model
     const user = await User.create(input_data)

     if (user) {
         // send a 200 response with the created entry
        res.status(200).send(user)
     } else {
         res.status(500).send("server error")
     }
     
}

const getAllUsers = async (req, res) => {

    // using the builtin 'findAll' function on User Model
    let users = await User.findAll({})
    res.status(200).send(users)
}

const getOneUser = async (req, res) => {

    // getting the id from the params in the req
    let id = req.params.id

    // using the builtin 'findAll' function on User Model
    let users = await User.findOne({where: {id: id}})
    res.status(200).send(users)
}

const updateUser = async (req, res) => {
    let id = req.params.id

    // using the builtin 'findAll' function on User Model
    const user = await User.update(req.body, { where: {id: id}})
    res.status(200).send(user)
}

const deleteUser = async (req, res) => {
    let id = req.params.id

    // using the builtin 'destroy' function on User Model
    await User.destroy({where :{id: id}})
    res.status(200).send(`user with id: ${id} is deleted`)
}

// export all the controller functions
module.exports = {
    addUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser
} 
