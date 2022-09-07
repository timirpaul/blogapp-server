const express = require('express');
const router = express.Router();


// const jwt = require("jsonwebtoken")
const User = require('../models/userSchema')
const bcrypt = require('bcrypt');



router.post('/signup', async (request, response) => {
    const { name, email, password } = request.body;
    let existingUser;
    try {

        existingUser = await User.findOne({ email })
        if (existingUser) {
            response.status(400).json({ msg: "existingUser" })
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password.toString(), salt)



        const newUser = new User({ name, email, password: hashedPass });
        console.log(newUser);

        const user = await newUser.save();


        response.status(200).json({ msg: "successfull", user })
    } catch (error) {
        console.log(error);
        response.status(500).json({ msg: 'Error SingUp', error })
    }
})


router.post('/login', async (request, response) => {
    const { email, password } = request.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email })
        if (!existingUser) {
            response.status(400).json({ msg: "User Not Found" })
            return;
        }
        const passwordCheck = await bcrypt.compare(password, existingUser.password)

        if (!passwordCheck) {
            response.status(404).json({ msg: "Password Not Match" })
            return;
        }
        // const token = await existingUser.generateToken()
        // console.log(token);
        // response.cookie("blogappjwttoken" , token )
        

        
        console.log("login");

        response.status(200).json({ msg: "login successfull", user: existingUser })
    } catch (error) {
        response.status(500).json({msg: "Server Error",error})
    }


})


module.exports = router;

