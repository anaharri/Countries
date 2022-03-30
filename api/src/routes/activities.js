const { Router } = require("express");
const { Activity } = require("../db");

const router = Router();

router.get("/", (req, res) => {
  Activity.findAll()
    .then((activities) => res.send(activities))
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .send({ error: "Something went wrong with this query..." });
    });
});

router.post("/", async (req, res) => {
  const { name, difficulty, season, countries } = req.body;

  try {
    if (Object.keys(req.body).length < 4)
      throw new Error("Not enough information provided!");

    const newActivity = await Activity.findOrCreate({
      where: {
        name,
        difficulty,
        season,
      },
    });
    await newActivity[0].setCountries(countries);

    res.send(newActivity[0]);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong..." });
  }
});
router.put("/:activityId", (req, res) => {});
router.delete("/:activityId", (req, res) => {});

module.exports = router;
