const knex = require('../database/connection')
const User = require('../models/User')

const DelValidation = async (req, res, next) => {
    const id = req.params.id

    if(!id){
        res.status(400).send('Missing param {id}')
    }
    else{
        const user = await User.findID(id)
        if(user != undefined){
            next()
        }
        else{
            res.status(400).send('Invalid id')
        }
    }
}

module.exports = DelValidation