const validateUserAuth = (req, res) => {
    if(!req.body.email || !req.body.password){
        return res.status(500).json({
            success:false,
            data: {},
            message: 'Something went wrong',
            err:'Email and password are missing in the request'

        })
    }
    next();
}


module.exports ={
    validateUserAuth 
}