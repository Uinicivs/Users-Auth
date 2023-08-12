const knex = require('../database/connection')

const CadValidation = async (req, res, next) => {
    const {email, name, password} = req.body

    const validations = [
        await ValidateEmail(email, res),
        ValidateName(name, res),
        ValidatePassword(password, res)
    ]
    if(validations.every(condition => condition)){
        next()
    }
}

const ValidateEmail = async (email, res) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!regex.test(email)){
        res.status(400).send('Invalid email')
        return false
    }

    try{
        const user = await knex.select('*').from('users').where({email: email})
        if(user.length > 0){
            res.status(400).send('Email already taken')
            return false
        }
    }
    catch(err){
        console.log(err)
        return false
    }

    return true
}

const ValidateName = (name, res) => {
    if(!name){
        res.status(400).send('Invalid name')
        return false
    }

    return true
}

const ValidatePassword = (password, res) => {
    if(!password){
        res.status(400).send('Invalid password')
        return false
    }

    return true
}

module.exports = CadValidation