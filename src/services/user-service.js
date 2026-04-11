const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const UserRepository = require('../repository/user-repository');
const {JWT_KEY} = require('../config/serverConfig');

const AppErrors = require('../utils/error-handler');

class UserService{
    constructor(){
        this.UserRepository = new UserRepository();

    }
    async create(data){
        try {
            const user = await this.UserRepository.create(data); 
            return user;
             
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                throw error;
            }
            console.log("Something went wrong  on service layer");
            throw error;
        }
    }

    async signIn(email, plainPassword){
        try {
            //step 1: fetch the user using email
            const user = await this.UserRepository.getByEmail(email);
            //step 2: compare incoming plain password with store encrypted password
            const passwordsMatch = await this.checkPassword(plainPassword, user.password);
             if(!passwordsMatch){
                console.log("Password doesn't match");
                throw {error: "Incorrect password"};
             }

                //step 3: if password matches then create a token and send it to the user
                const newToken = this.createToken({email: user.email, id: user.id});

                return newToken;
        } catch (error) {
            console.log("Something went wrong  in the sign in process");
            console.error(error);
            throw error;    
        }
    }
    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error: "Invalid token"};
            }
            const user = await this.UserRepository.getById(response.id);
            if(!user){
                throw {error: "NO user with the coresponding token exists"};
            }
            return user.id;

        } catch (error) {
            console.log("Something went wrong  in auth process");
            throw error;    
        }
    }
    createToken(user) {
         try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1d'});
            return result;
        } catch (error) {
            console.log("Something went wrong  in Token Creation");
            throw error; 
         }
    }

    verifyToken(token){
        try {  
            const response = jwt.verify(token, JWT_KEY);    
            return response;
        } catch (error) {
             console.log("Something went wrong  in Token Validation", error);
            throw error; 
        }
    }

    checkPassword(userInputPassword, encryptedPassword){
        try {
             return bcrypt.compareSync(userInputPassword, encryptedPassword);  
        } catch (error) {
            console.log("Something went wrong  in password comparison");
            throw error;
        }
    }

    isAdmin(userId){
        try {
            return this.UserRepository.isAdmin(userId);
            
        } catch (error) {
            
        }
    }




}

module.exports = UserService;