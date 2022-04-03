var express = require('express');
var Router = express.Router()
var validator = require("email-validator");



var { database } = require('../index.js')


Router.get('/', (req, res) => {
    res.send('hello world at api')
})


Router.get('/users', (req, res) => {
    res.send({
        status: true,
        result: database
    })
})

Router.get('/user/:id', (req, res) => {
    var id = req.params.id
    var user = database.find((x) => {
        return x.id == id
    })
    if (user != undefined) {
        res.send({
            status: true,
            result: user
        })
    } else {
        res.send({
            status: false,
            result: 'the user does not exist'
        })
    }
})

Router.post('/user', (req, res) => {
    var newuser = {}
    newuser.id = req.body.id
    newuser.name = req.body.name
    newuser.email = req.body.email
    var error = {
        id: '',
        name: '',
        email: ''
    }

    var userFound = database.find((x) => {
        return x.id == newuser.id
    })
    if (userFound != undefined) {
        error.id = 'This user ID has been taken.'
    }
    var emailFound = database.find((x) => {
        return x.email == newuser.email
    })
    if (emailFound != undefined) {
        error.email = 'This email has been taken.'
    }
    if (newuser.id == undefined || newuser.id == '') {
        error.id = 'User ID cannot be undefined or empty'
    }
    if (validator.validate(newuser.email) == false) {
        error.email = 'Email address must be in the right format.'
    }


    if (error.id == '' && error.name == '' && error.email == '') {
        database.push(newuser)
    }
    res.send({
        status: true,
        result: error
    })
})


Router.put('/user/:id', (req, res) => {
    var id = req.body.id
    var name = req.body.name
    var email = req.body.email
    var error = {
        id: '',
        name: '',
        email: ''
    }

    var user = database.find((x) => {
        return x.id == req.params.id
    })

    if (user == undefined) {
        res.send({
            status: false,
            result: 'This user does not exist in database'
        })
        return
    }

    var userFound = database.find((x) => {
        return x.id == id
    })
    if (userFound != undefined && id != user.id) {
        error.id = 'This user ID has been taken.'
    }
    var emailFound = database.find((x) => {
        return x.email == email
    })
    if (emailFound != undefined && email != user.email) {
        error.email = 'This email has been taken.'
    }
    if (id == undefined || id == '') {
        error.id = 'User ID cannot be undefined or empty'
    }
    if (validator.validate(email) == false) {
        error.email = 'Email address must be in the right format.'
    }


    if (error.id == '' && error.name == '' && error.email == '') {
        user.id = id
        user.name = name
        user.email = email
    }
    res.send({
        status: true,
        result: error
    })
})

Router.delete('/user/:id', (req, res) => {
    var index = database.findIndex((x) => {
        return (x.id == req.params.id)
    })
    if (index >= 0) {
        database.splice(index, 1)
        res.send({
            status: true,
            result: 'Delete successfully.'
        })
    } else {
        res.send({
            status: false,
            result: 'Delete failed.'
        })
    }
})




module.exports = Router