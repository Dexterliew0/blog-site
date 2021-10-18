const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.create_user = async (req, res) => {

    if (req.body.password !== req.body.confirm) {
        return res.json({
            error: 'Passwords do not match'
        });
    }

    if (!req.body.username || !req.body.password || !req.body.confirm) {
        return res.json({
            error: 'All fields must be entered'
        });
    }

    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
        return res.json({
            error: 'Username Taken'
        });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        username: req.body.username,
        password: hashedPassword
    });

    const savedUser = await user.save();

    const token = jwt.sign({
        user: savedUser._id
    }, process.env.JWT_SECRET);

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }).json({
        message: "User Created"
    });

};

exports.login = async (req, res) => {

    if (!req.body.username || !req.body.username) {
        return res.json({
            error: 'All fields must be entered'
        });
    }

    const existingUser = await User.findOne({ username: req.body.username });

    if (!existingUser) {
        return res.json({
            error: 'Incorrect username or password'
        });
    }

    const correctPassword = await bcrypt.compare(req.body.password, existingUser.password);

    if (!correctPassword) {
        return res.json({
            error: 'Incorrect username or password'
        });
    }

    const token = jwt.sign({
        user: existingUser._id
    }, process.env.JWT_SECRET);

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }).json({
        message: 'Login Successful'
    });

};

exports.logout = (req, res) => {

    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none"
    })

    res.json({
        message: 'Logged Out'
    });
};

exports.logged_in = (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.json({
            loggedIn: false,
            userID: ""
        });

        const user = jwt.verify(token, process.env.JWT_SECRET);

        res.json({
            loggedIn: true,
            userID: user
        });

    } catch (err) {
        res.json({
            loggedIn: false,
            userID: ""
        });
    }
};