const validateUserAuth = (req, res) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
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