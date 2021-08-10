const User = require('../models/User')
const bcrypt = require('bcrypt')
const Post = require('../models/Post')

class UserController {
    // [POST] register
    async register(req, res) {
        try {

            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt)
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPass
            })

            const user = await newUser.save()

            const { password, ...others } = user._doc;
            res.status(200).json(others)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [POST] login
    async login(req, res) {
        try {
            const user = await User.findOne({ username: req.body.username })
            !user && res.status(400).json('Wrong credentials !')

            const validated = await bcrypt.compare(req.body.password, user.password)
            !validated && res.status(400).json('Wrong credentials passs !')

            const { password, ...others } = user._doc

            res.status(200).json(others)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [PUT] update
    async update(req, res) {
        if (req.body.userId === req.params.id) {

            if (req.body.password) {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }

            try {
                const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true })
                res.status(200).json(updatedUser)
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            res.status(401).json('You can update only your account !')
        }

    }

    // [DELETE delete
    async delete(req, res) {
        if (req.body.userId === req.params.id) {

            try {
                const user = await User.findById(req.params.id);

                try {

                    await Post.deleteMany({ username: user.username })

                    await User.findByIdAndDelete(req.params.id)
                    res.status(200).json("User has been delete !!")
                } catch (error) {
                    res.status(500).json(error)
                }

            } catch (error) {
                res.status(404).json('User not found !')
            }


        } else {
            res.status(401).json('You can delete only your account !')
        }

    }

    // [GET] user
    async getUser(req, res) {
        try {
            const user = await User.findById(req.params.id);
            const { password, ...others } = user._doc;
            res.status(200).json(others)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new UserController;