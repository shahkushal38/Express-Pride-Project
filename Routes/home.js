const express = require('express');
const router = express.Router();


// Handling request using router
router.get("/page", (req,res,next) => {
    console.log(req.query);
    console.log("API called")
    res.send("This is the homepage request")
})

module.exports = router;