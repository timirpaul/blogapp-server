const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,

    }
    // ,
    // tokens: [
    //     {
    //         token: {
    //             type: String
    //         }
    //     }
    // ]

}, { timestamps: true })

//Create token 
// userSchema.methods.generateToken = async function () {
//     try {
//         let createToken = jwt.sign({ _id: this._id }, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9dsgh" , {expiresIn: '5m'})
        
//         this.tokens = this.tokens.concat({token : createToken})
//         const saveToken = await this.save()

//         return saveToken
//     } catch (error) {
//         console.log({msg: "Server Error",error});
//     }
// }

const User = mongoose.model("User", userSchema)

module.exports = User;
