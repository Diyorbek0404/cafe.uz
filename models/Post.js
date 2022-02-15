const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        min: 500
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        max: 13
    },
    email: {
        type: String,
        required: true
    },
    like: {
        type: Array,
        default: []
    },
    unlike: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    },
    menyu: {
        type: Array,
        default: []
    },
    website: {
        type: String,
    },
    city: {
        type: String
    },
    photo: {
        type: Array,
        default: []
    },
    isOpen: {
        type: String
    },
    isClose: {
        type: String
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model("Post", PostSchema)