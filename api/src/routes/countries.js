const { Router } = require("express");
const { Country } = require("../db");
const axios = require("axios");

const router = Router();

router.get("/", (req, res) => {
  axios
    .get("https://restcountries.com/v3.1/all")
    .then((countries) => {
      countries = countries.data.map((c) => ({
        name: c.name.official,
        id: c.cca3,
        flag: c.flags.png,
        continent: c.region,
        subregion: c.subregion,
        capital: c.capital || "No capital",
        area: c.area,
        population: c.population,
      }));

      Country.bulkCreate(countries);
    })
    .then(() => Country.findAll())
    .then((countries) => res.send(countries))
    .catch((err) => {
      console.log(err);
      res.send({ error: "Something went wrong while loading countries..." });
    });
});

module.exports = router;
