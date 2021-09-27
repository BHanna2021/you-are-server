const router = require("express").Router();
const { Journal } = require("../models");
const { JsonWebTokenError } = require("jsonwebtoken");
// const validateIsAdmin = require("../middleware/validate-is-admin");
const validateJWT = require("../middleware/validate-member");

router.post("/", validateJWT, async(req, res) => {
    const { journalBody, journalName } = req.body.Journal;
    const { id } = req.member;
    const journalEntry = {
        journalBody,
        journalName,
        memberId: id
    }
    try {
        const newJournal = await Journal.create(journalEntry);
        res.status(201).json(newJournal);
    } catch (err) {
        res.status(500).json({ error: err })
    }
});

router.get("/", validateJWT, async(req, res) => {
    const { id } = req.member;
    try {
        const journals = await Journal.findAll({
            where: {
                memberId: id
            }
        });
        res.status(200).json(journals)
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//when attempting a user that is not associated to the journal, it hits 500
//tried commenting the try/catch block, tried a few things but no go with try in place
router.get("/:id", validateJWT, async(req, res) => {
    const { id } = req.member;
    const journalId = req.params.id;
    try {
        const journal = await Journal.findOne({
            where: {
                memberId: id,
                id: journalId
            }
        });
        res.status(200).json(journal)
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.put("/:id", validateJWT, async(req, res) => {
    const journalId = req.params.id;
    const memberId = req.member.id;
    const { journalBody, journalName } = req.body.Journal;
    const query = {
        where: {
            id: journalId,
            memberId: memberId,
        }
    };
    const updatedJournal = {
        journalBody: journalBody,
        journalName: journalName
    };
    try {
            const update = await Journal.update(updatedJournal, query);
            res.status(200).json({
                message: `Journal ${journalId} has been updated.`
            });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.delete("/:id", validateJWT, async(req, res) => {
    const ownerId = req.member.id;
    const journalId = req.params.id;
    try {
        const query = {
            where: {
                id: journalId,
                memberId: ownerId,
            }
        };
        await Journal.destroy(query);
        res.status(200).json({
            message: `Journal ${journalId} has been removed.`
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;