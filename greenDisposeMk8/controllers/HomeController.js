const User = require('../models/User')

module.exports = class HomeController{
  static async showHome(req, res){
    return res.render('home')//Mostrando um view
  }
  static async showCont(req,res){
    return res.render('contacts')
  }
}
