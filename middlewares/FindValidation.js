const FindValidation = (req, res, next) => {
    if(req.params.id){
        next()
    }
    else{
        res.status(400).send('missing parameter {id}')
    }
}

module.exports = FindValidation