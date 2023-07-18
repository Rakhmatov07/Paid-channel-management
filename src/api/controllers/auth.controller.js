const {fetchOne} = require('../../libs/pg');
const {getToken, verifyToken} = require('../../libs/jwt');
const { validateRegistration, validatelogin } = require('../../libs/auth.validation');

async function register(req, res) {
    try {
        const {firstname, lastname, username, phone_number} = req.body;
        const isValid = validateRegistration(firstname, lastname, username, phone_number);

        if(isValid) return res.status(400).json({msg: 'Input Error'}) // res.redirect('/api/register');

        const user = await fetchOne('SELECT * FROM users WHERE username=$1 AND phone_number=$2;', username, phone_number);
    
        if(user) return res.status(409).json({msg: 'Already registered'}) // res.redirect('/api/login'); // !set! add status and message
    
    
        const newUser = await fetchOne('INSERT INTO users(firstname, lastname, username, phone_number) VALUES($1, $2, $3, $4) RETURNING*;', firstname, lastname, username, phone_number);
        const token = getToken(newUser.user_id);
    
        res.cookie('token', token)
        return res.status(201).json({msg: "Successfully registered"}) // res.redirect(/api/channels)   
    } catch (error) {
        console.log(error.message);
        // return res.redirect('/api/register');   
    }
};

async function login(req, res) {
    try {
        const {username, phone_number} = req.body;
        const isValid = validatelogin(username, phone_number);

        if(isValid) return res.status(400).json({msg: 'Bad request'}) // res.redirect('/api/register');
        const user = await fetchOne('SELECT * FROM users WHERE username=$1 AND phone_number=$2;', username, phone_number);
    
        if(!user) return res.status(404).json({msg: 'User Not Found'}) // res.redirect('/api/login'); // !set! add status and message
    
        const token = getToken(user.user_id);
    
        res.cookie('token', token);
        return res.status(200).json({msg: 'Successfully Logged in'}); // res.redirect('/api/');
    } catch (error) {
        console.log(error.message);
        // return res.redirect('/api/login');
    }
};

async function logout(req, res){
    try {
        const {token} = req.cookies;
        const user_id = verifyToken(token);

        if(!user_id) return res.status(401).json({msg: 'Invalid Token'});
        
        await fetchOne('DELETE FROM users WHERE user_id=$1;', user_id);
        res.cookie('token', '');

        return res.status(200).json({msg: 'Successfully Logged out'}); // res.redirect('/api/');
    } catch (error) {
        console.log(error.message);
        // return res.redirect('/api/');
    }
};

function registerPage(req, res) {
    res.render('registration')
};

function loginPage(req, res) {
    res.render('login')
};

module.exports = {
    register,
    login,
    logout,
    registerPage,
    loginPage
};