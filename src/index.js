const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');

const apiRoutes = require('./routes/index');
//const UserServie = require('./services/user-service');

 
const app = express();

const prepareAndStartServer = async () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));   
    app.use('/api', apiRoutes);

    app.listen(PORT, async() => {
       
        console.log(`Server is running on port: ${PORT}`);
        // const repo = new UserRepository();
        // const reponse = await repo.getById(1);
        //  console.log(reponse);
        // const service = new UserServie();
        // const newToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpZCI6MSwiaWF0IjoxNzc1NzUzMTc0LCJleHAiOjE3NzU3NTY3NzR9.Kwf0osEkUdNqPKN4yzfiBIKpHDihIfD-x8AgAYpogbA";
        // const response = service.verifyToken(newToken);
        // console.log(response);

            
     });
}
  

prepareAndStartServer();
