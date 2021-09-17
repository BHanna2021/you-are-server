const router = require("express").Router();
const { Member } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateIsAdmin = require("../middleware/validate-is-admin");
const validateJWT = require("../middleware/validate-member")

router.post("/register", async(req, res) => {
    let { email, password, firstName, phoneNumber } = req.body.Member;
    try {
        let isAdmin = req.body.Member.isAdmin ? req.body.Member.isAdmin : false
        const newMember = await Member.create({
            email,
            password: bcrypt.hashSync(password, 13),
            firstName,
            phoneNumber,
            isAdmin
        });
        let token = jwt.sign({
            id: newMember.id,
        }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

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
        const loggedInMember = await Member.findOne({
            where: {
                email: email,
            },
        });
        if (loggedInMember) {
            let passwordCompare = await bcrypt.compare(password, loggedInMember.password);
            if (passwordCompare) {
                let token = jwt.sign({
                    id: loggedInMember.id,
                }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
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

//get all users, admin only
router.get("/all", [validateJWT, validateIsAdmin], async(req, res) => {
    try {
        const results = await Member.findAll();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get("/:id", [validateJWT, validateIsAdmin], async(req, res) => {
    const { id } = req.params;
    try {
        const foundMember = await Member.findOne({
            where: {
                id: id
            }
        });
        res.status(200).json(foundMember)
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.delete("/:id", [validateJWT, validateIsAdmin], async(req, res) => {
    const { id } = req.params;
    try {
        const query = {
            where: {
                id: id
            }
        };
        await Member.destroy(query);
        res.status(200).json({
            message: `Member ${id} has been removed.`
        })
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;