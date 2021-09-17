const router = require("express").Router();
const { Quote } = require("../models");
const { JsonWebTokenError } = require("jsonwebtoken");
const validateIsAdmin = require("../middleware/validate-is-admin");
const validateJWT = require("../middleware/validate-member")

router.post("/", validateJWT, async(req, res) => {
    // if(req.member.isAdmin) {
    //     const { quoteBody, attribution, share, approvedForAll } = req.body.Quote;
    //     const { id } = req.member;
    //     const quoteEntry = {
    //         quoteBody,
    //         attribution,
    //         share,
    //         approvedForAll,
    //         createdBy: id
    //     }
    //     try {
    //         const newQuote = await Quote.create(quoteEntry);
    //         res.status(200).json(newQuote);
    //     } catch (err) {
    //         res.status(500).json({ error: err })
    //     }
    // } else {
        const { quoteBody, attribution, share } = req.body.Quote;
        const { id } = req.member;
        const quoteEntry = {
            quoteBody,
            attribution,
            share,
            owner: id
        }
        try {
            const newQuote = await Quote.create(quoteEntry);
            res.status(200).json(newQuote);
        } catch (err) {
            res.status(500).json({ error: err })
        }
    // }
});

// router.get("/favorites", validateJWT, async(req, res) => {
//     const { id } = req.member.id;
//     try {
//         const favQuotes = await QuoteModel.findAll({
//             where: {
//                 owner: id,
//                 favoriteQuotes
//             }
//         });
//         res.status(200).json(favQuotes);
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });

router.get("/", validateJWT, async(req, res) => {
    const userId = req.member.id;
    const journalId = req.params.id;
    try {
        const journal = await Quote.findOne({
            where: {
                owner: userId,
                id: journalId
            }
        });
        res.status(200).json(journal);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.put("/:id", validateJWT, async(req, res) => {
    const { quoteBody, attribution, tags, share } = req.body.Quote;
    const memberId = req.member.id;
    const quoteId = req.params.id;
    const query = {
        where: {
            id: quoteId,
            owner: memberId,
        }
    };
    const updatedQuote = {
        quoteBody: quoteBody,
        attribution: attribution,
        tags: tags,
        share: share,
    };
    try {
        const update = await Quote.update(updatedQuote, query);
        res.status(200).json({
            message: `Quote ${quoteId} has been updated.`
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.delete("/:id", validateJWT, async(req, res) => {
    const ownerId = req.member.id;
    const quoteId = req.params.id;
    try {
        const query = {
            where: {
                id: quoteId,
                owner: ownerId,
            }
        };
        await Quote.destroy(query);
        res.status(200).json({
            message: `Quote ${quoteId} has been removed.`
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;