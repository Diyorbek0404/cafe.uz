const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt");

// update user
router.put("/:id", async (req, res) => {
    try {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            if (req.body.password) {
                try {
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password, salt);
                } catch (error) {
                    res.status(500).json(error)
                }
            }
            try {
                const user = await User.findByIdAndUpdate(req.params.id,
                    {
                        $set: req.body
                    }
                )
                res.status(200).json(user)
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            return res.status(403).json("yangilanmadi")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// delete user
router.delete("/:id", async (req, res) => {
    try {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            try {
                const user = await User.findByIdAndDelete(req.params.id)
                res.status(200).json("akkaunt o'chdi")
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            return res.status(403).json("o'chmadi")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// get user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const {password, updatedAt, ...other} = user._doc
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error)
    }
})

// get all user
router.get("/", async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router