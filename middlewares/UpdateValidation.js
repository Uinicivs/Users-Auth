const knex = require('../database/connection')

const UpdateValidation = async (req, res, next) => {
    const {id, email, name, role} = req.body

    if(!id){
        res.status(400).send('Missing param {id}')
    }

    if(email){
        if(ValidateEmail(email, res)){
            console.log(email, name, role)
            next()
        }
    }
    else{
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

module.exports = UpdateValidation