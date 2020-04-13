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

    isNotLoggedIn(),
    validationLoggin(),

    async (req, res, next) => {

        const { email, password, shippingAddress } = req.body
        //console.log({email, password, shippingAddress})

        try {
            const emailExists = await User.findOne({ email }, 'email');

            if (emailExists) return next(createError(400));
            else {

                const salt = bcrypt.genSaltSync(saltRounds);
                const hashPass = bcrypt.hashSync(password, salt);
                const newUser = await User.create({ email, shippingAddress, password: hashPass});

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
        const { email, password } = req.body;
        //console.log({email, password})

        try {
            const findUser = await User.findOne({ email });

            if (!findUser) {
                next(createError(404))
            } else if (bcrypt.compareSync(password, findUser.password)) {
                req.session.currentUser = findUser;
                res.status(200).json(findUser);
                return;
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

//// /user

router.get("/user", isLoggedIn(), (req, res, next) => {
    req.session.currentUser.password = "******";
    res.json(req.session.currentUser);
  });
  
//user/edit-profile

  router.post('/user/:userId/edit-profile', (req, res, next) => {
    User.findByIdAndUpdate(req.params.userId, req.body)
    .then(() => {
      res.json({
        message: `User ${req.params.userId} is updated successfully.`
      });
    })
    .catch(err => {
      res.json(err);
    });
});


module.exports = router