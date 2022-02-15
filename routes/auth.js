const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt")

// registration
router.post("/registration", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = await new User({
            username: req.body.username,
            password: hashedPassword
        })
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username})
        !user && res.status(404).json("Bunday foydalanuvchi yo'q")

        const ValidationPassword = await bcrypt.compare(req.body.password, user.password)
        !ValidationPassword && res.status(400).json("Parol xato")

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router