const router = require('express').Router()
const {authenticateToken} = require('../utiles/authenticate')

router.get('/',authenticateToken,(req,res) =>{
    console.log(req.user)
    res.send("Got me!")
})

module.exports = router