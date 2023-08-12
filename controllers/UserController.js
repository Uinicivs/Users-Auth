const PasswordToken = require('../models/PasswordToken')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secret = 'hfdisfdjsanfiookjeklasjkhojlkndalçs'

class UserController{

    async create(req, res){
        const {email, name, password} = req.body
        await User.new(email, name, password)
        res.send('Created')

        return
    }
    async login(req, res){
        const {email, password} = req.body
        const user = await User.findEmail(email)

        if(user != undefined && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign({email: user.email, role: user.role}, secret)
            res.json(token)
        }
        else{
            res.status(400).send('user not found or password does not match')
        }

        return
    }
    async findUsers(_req, res){
        res.json(await User.findAll())

        return
    }
    async findUser(req, res){
        const id = req.params.id
        const result = await User.findID(id)
        if(result == undefined)
            res.status(404).send('Not found')
        else
            res.send(result)

        return
    }
    async edit(req, res){
        const {id, email, name, role} = req.body
        const result = await User.update(id, email, name, role)
        
        if(!result.res)
            res.status(result.status).send(result.msg)
        else
            res.send('Ok')

        return
    }
    async del(req, res){
        const id = req.params.id
        const result = await User.delete(id)

        if(!result.res)
            res.status(500).send(result.msg)
        else
            res.send('Ok')

        return
    }
    async passwordRecover(req, res){
        const email = req.body.email
        const result = await PasswordToken.create(email)

        if(result.res){
            res.json(result.token)
        }
        else{
            res.status(result.status).send(result.msg)
        }

        return
    }
    async passwordChange(req, res){
        const {token, password} = req.body
        const result = await PasswordToken.validate(token)

        if(result.res){
            if(await User.changePassword(password, result.token.user_id))
                res.send("Password changes")
        }
        else{
            res.status(406).send('Invalid token')
        }

        return
    }
}

module.exports = new UserController