const validateUserAuth = (req, res,next) => {
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

const validateisAdmin = (req,res,next) => {
        if(!req.body.userId){
            req.status(400).json({
                success:false,
                data: {},
                message: 'Something went wrong',
                err:'UserId not given'
        }
    )}
    next();
}


module.exports ={
    validateUserAuth ,
    validateisAdmin
}