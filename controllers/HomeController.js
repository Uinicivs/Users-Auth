class HomeController{
    
    async index(_req, res){
        res.send('APP EXPRESS')

        return
    }
}

module.exports = new HomeController()