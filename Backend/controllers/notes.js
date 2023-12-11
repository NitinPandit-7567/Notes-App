const express = require("express")
const router = express.Router({ mergeParams: true });

router.route('/new')
    .get((req, res) => {
        res.send('HELLO')
    })


module.exports = router;