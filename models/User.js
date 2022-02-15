const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min:3, 
        max:22,
        unique: true
    }, 
    password: {
        type: String,
        required: true,
        min:3, 
        max:22,
    },
    isAdmin:{
        type: Boolean,
        default:false
    },
    city:{
        type: String,
        max:50
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("User", UserSchema)