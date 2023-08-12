const knex = require('../database/connection')
const User = require('./User')

class PasswordToken{

    async create(email){
        const user = await User.findEmail(email)
        if(user == undefined){
            return {res: false, status: 404, msg: 'invalid user'}
        }
        else{
            try{
                const token = Date.now()
                await knex.insert({
                    token: token,
                    user_id: user.id,
                    used: 0
                })
                .table('passwordtokens')
                return {res: true, token: token}
            }
            catch(err){
                console.log(err)
                return {res: false, status: 500, msg: err}
            }
        }
    }
    async validate(token){
        try{
            const result = await knex.select().where({token: token}).table('passwordtokens')
            const rtoken = result[0]
            if(result.length > 0 && !(rtoken.used)){
                const updtResult = await this.update(rtoken.id)

                if(updtResult.res){
                    return {res: true, token: rtoken}
                }
                else{
                    return updtResult
                } 
            }
            return {res: false}
        }
        catch(err){
            console.log(err)
            return {res: false}
        }
    }
    async update(id){
        try{
            await knex.update({used: 1}).where({id: id}).table('passwordtokens')
            return {res: true}
        }
        catch(err){
            console.log(err)
            return {res: false, msg: err}
        }
    }
}

module.exports = new PasswordToken()