const jwt = require('jsonwebtoken')
const secret = 'hfdisfdjsanfiookjeklasjkhojlkndalçs'

const AdminAuth = (req, res, next) => {
    const authToken = req.headers['authorization']
    console.log(authToken)
    if(authToken != undefined){
        const bearer = authToken.split(' ')
        const token = bearer[1]

        try{
            const decoded = jwt.verify(token, secret)
            if(decoded.role == 0){
                next()
            }
            else{
                res.status(401).send('You can not access this route')
            }
        }
        catch(err){

        }
    }
    else{
        res.status(400).send('Invalid token')
    }
}

module.exports = AdminAuth