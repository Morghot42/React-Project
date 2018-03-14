import express from "express";
import request from "request-promise";
import { parseString } from "xml2js";
import authenticate from "../middlewares/authenticate";
import Coin from "../models/Coin";
import parseErrors from "../utils/parseErrors";
import CoinMarketCap from "node-coinmarketcap";
import Parser from "xml2json"

const router = express.Router();
router.use(authenticate);

router.get("/", (req, res) => {
  Coin.find({ userId: req.currentUser.id }).then(coins => res.json({ coins }));
});

router.post("/", (req, res) => {
  Coin.create({ ...req.body.coin, userId: req.currentUser._id })
    .then(coin => res.json({ coin }))
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.get("/coins", (req, res) => {
  request
      .get(
        `https://api.coinmarketcap.com/v1/ticker/${req.query.q}`
      )
      .then(coins => JSON.parse(coins))
      .then(coins =>  (
        res.json({
          coins: coins.map(
            coin => ({
              id: coin.id,
              name: coin.name,
              price_usd: coin.price_usd,

      })
    )
    })
  ))
  });

  router.get("/search", (req, res) => {
    request
        .get(
          `https://api.coinmarketcap.com/v1/ticker/${req.query.q}`
        )
        .then(coins => JSON.parse(coins))
        .then(coins =>  (
          res.json({
            coins})
          ))
        });

export default router;
