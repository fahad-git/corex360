var express = require("express");
var router = express.Router();

/* GET home page. */
router.put("/", function (req, res, next) {
  const io = require("../socket");
  io.getIO().emit("status", { action: "update", status: req.body.status });
  res.send("Updated successfully");
});

module.exports = router;
