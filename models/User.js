const knex = require('../database/connection')
const bcrypt = require('bcrypt')

class User{
    async new(email, name, password){
        try{
            const hash = await bcrypt.hash(password, 10)
            await knex.insert({name, email, password: hash, role: 0}).table('users')
        }
        catch(err){
            console.log(err)
        }
    }
    async findAll(){
        try{
            return await knex.select(['name', 'email', 'role']).table('users')
        }
        catch(err){
            console.log(err)
            return []
        }
    }
    async findID(id){
        try{
            const result = await knex.select(['name', 'email', 'role']).where({id: id}).table('users')
            if(result.length > 0)
                return result[0]
            else
                return undefined
        }
        catch(err){
            console.log(err)
            return undefined
        }
    }
    async findEmail(email){
        try{
            const result = await knex.select(['id', 'name', 'password', 'email', 'role']).where({email: email}).table('users')
            if(result.length > 0)
                return result[0]
            else
                return undefined
        }
        catch(err){
            console.log(err)
            return undefined
        }
    }
    async update(id, email, name, role){
        const user = await this.findID(id)
        if(user != undefined){

            var updtUser = {}

            if(email != undefined){
                updtUser.email = email
            }
            if(name != undefined){
                updtUser.name = name
            }
            if(role != undefined){
                updtUser.role = role
            }

            try{
                await knex.update(updtUser).where({id: id}).table('users')
                return {res: true}
            }catch(err){
                console.log(err)
                return {res: false, err: 500, msg: err}
            }
        }
        else{
            return {res: false, err: 400, msg: 'invalid user'}
        }
    }
    async delete(id){
        try {
            await knex.delete().where({id: id}).table('users')
            return {res: true}
        } catch (err) {
            return {res: false, msg: err}            
        }
    }
    async changePassword(password, id){
        try{
            const hash = await bcrypt.hash(password, 10)
            await knex.update({password: hash}).where({id: id}).table('users')
            return true
        }
        catch(err){
            console.log(err)
            return false
        }
    }
}

module.exports = new User