const user = require("../models/user");
const UserService = require("../services/user-service");

const userService = new UserService();

const create = async (req,res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            message: "Successfully created a new user",
            data: response,
            success: true,
            err:{}
        });
    } catch (error) {
        console.log.apply(error);
        return res.status(error.statusCode).json({
            message: error.message,
            data: {},
            succes: false,
            err:error.explanation
        });
        
    }
}
const signIn = async (req,res) => {
        try {
            const reponse = await userService.signIn(req.body.email, req.body.password);
            return res.status(200).json({
                message: "Successfully logged in",
                data: reponse,
                success: true,
                err:{}  
            });
            
        } catch (error) {
             console.log.apply(error);
        return res.status(error.statusCode).json({
            message: error.message,
            data: {},
            succes: false,
            err:error.explanation
        });
        }
}
const isAuthenticated= async (req,res) => {
    try {
        const token = req.headers['x-access-token'] || req.get('x-access-token');

        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            succes: true,
            err: {},
            data: response,
            message: "user is authenticated and token is valid"
        });

        
    } catch (error) {
         console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            data: {},
            succes: false,
            err:error
        });
    }
}
    const isAdmin = async (req,res) => {
        try {
             const repponse = await userService.isAdmin(req.body.id);
             return res.status(200).json({
                succes: true,
                err: {},  
                data: response,
                message: "Successfully fetched user is Admin or not"
            }); 
        } catch (error) {
            console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            data: {},
            succes: false,
            err:error
        });
        }
      
}

module.exports ={
    create,
    signIn,
    isAuthenticated,
    isAdmin
} 