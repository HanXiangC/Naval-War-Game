const User = require('../models/User');

/**
 * GET /
 * Home page.
 */
exports.loginPage = (req, res) => {

  if (req.user) {
    return res.redirect('characterPage');
  }else{
  	res.render('loginPage', {
    	title: 'Game Template - Login'
 	 });
  };
};


