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
        return res.status(500).json({
            message: "Something went wrong",
            data: {},
            succes: false,
            err:error
        });
        
    }
}

module.exports ={
    create
}