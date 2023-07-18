const {verifyToken} = require('../../libs/jwt');

const isAuth = (req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token) return res.status(401).json({msg: 'Not Allowed'});
    
        const item = verifyToken(token);
        if(!item) return res.status(401).json({msg: 'Not Allowed'});
    
        req.user = item;
        next();   
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({msg: error.message});
    }
}

module.exports = isAuth;