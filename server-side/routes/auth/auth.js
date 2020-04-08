const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../../models/User");


// middlewares
const {
    isLoggedIn,
    isNotLoggedIn,
    validationLoggin,
} = require("../../helpers/middlewares");
////////

//SignUp

router.post(
    '/signup',

    isLoggedIn(),
    validationLoggin(),

    async (req, res, next) => {

        const { username, email, password, shippingAddress } = req.body

        try {
            const userNameExists = await User.findOne({ username }, 'username');

            if (userNameExists) return next(createError(400));
            else {

                const salt = bcrypt.genSaltSync(saltRounds);
                const hashPass = bcrypt.hashSync(password, salt);
                const newUser = await User.create({ username, password: hashPass });

                req.session.currentUser = newUser;

                res.status(200).json(newUser);

            }
        } catch (error) {
            next(error);
        }
    }
)

////// Login

router.post('/login',

    isNotLoggedIn(),
    validationLoggin(),
    async (req, res, next) => {
        const { username, email, password, shippingAddress } = req.body;

        try {
            const findUser = await User.findOne({ username });

            if (!user) {
                next(createError(404))
            } else if (bcrypt.compareSync(password, findUser.password)) {
                req.session.currentUser = findUser;
                res.status(200).json(findUser);
            } else {
                next(createError(404));
            }

        } catch (error) {
            next(error);
        }
    }
);

//// logout

router.post("/logout", isLoggedIn(), (req, res, next) => {
    req.session.destroy();

    res.status(204).send();
    return;
  });

//// user

router.get("/user", isLoggedIn(), (req, res, next) => {
    req.session.currentUser.password = "*";
    res.json(req.session.currentUser);
  });
  

module.exports = router