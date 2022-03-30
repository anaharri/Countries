const { Router } = require("express");
const activities = require("./activities");
const countries = require("./countries");

const router = Router();

router.use("/countries", countries);
router.use("/activities", activities);

router.get("/", function (req, res) {
  res.send("Holis!");
});
module.exports = router;
