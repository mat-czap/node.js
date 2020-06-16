const jwt = require("jsonwebtoken");
require('dotenv/config')

const cb_verify = (err,user) =>{
    if (err) return res.sendStatus(403)
    req.user = user 
    next()
}

function authenticateToken (req,res,next){
    // getting token from header which equals "Bearer 029309213".It's needed 2nd part. 
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if (token==null) return res.sendStatus(401)

    jwt.verify(token,process.env.SECRET_JWT, cb_verify)
}

module.exports.authenticateToken = authenticateToken