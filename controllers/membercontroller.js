const router = require("express").Router();
const { MemberModel } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", async(req, res) => {
    let { email, password, firstName, phoneNumber } = req.body.Member;
    try {
        const newMember = await MemberModel.create({
            email,
            password: bcrypt.hashSync(password, 13),
            firstName,
            phoneNumber
        });

        let token = jwt.sign({ id: newMember.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

        res.status(201).json({
            message: `${email} has been successfully registered.`,
            member: newMember,
            sessionToken: token
        })
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: `${email} is already in use.`
            });
        } else {
            res.status(500).json({
                message: `Failed to register ${email}.`
            });
        }
    }
});

router.post("/login", async(req, res) => {
    let { email, password } = req.body.Member;
    try {
        const loggedInMember = await MemberModel.findOne({
            where: {
                email: email,
            },
        });
        if (loggedInMember) {
            let passwordCompare = await bcrypt.compare(password, loggedInMember.password);
            if (passwordCompare) {
                let token = jwt.sign({ id: loggedInMember.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

                res.status(200).json({
                    member: loggedInMember,
                    message: `${email} successfully logged in.`,
                    sessionToken: token
                });
            } else {
                res.status(401).json({
                    message: "Incorrect email or password"
                })
            }
        } else {
            res.status(401).json({
                message: "Incorrect email or password"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to log user in"
        });
    }
});

module.exports = router;