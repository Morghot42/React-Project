import express from "express";
import request from "request-promise";
import { parseString } from "xml2js";
import authenticate from "../middlewares/authenticate";
import Coin from "../models/Coin";
import parseErrors from "../utils/parseErrors";
import CoinMarketCap from "node-coinmarketcap";
import Parser from "xml2json"

const router = express.Router();

router.post("/", (req, res) => {
  Coin.create({ ...req.body.coin })
    .then(coin => res.json({ coin }))
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

 router.post("/coinsList", (req, res){
      let self = this;

      axios.get(CRYPTOCOMPARE_API_URI + "/data/all/coinlist")
        .then((resp) => {
          this.coinData = resp.data.Data;
          this.getCoins();
        })
        .catch((err) => {
          this.getCoins();
          console.error(err);
        });
    },

    getCoins: function() {
      let self = this;

      axios.get(COINMARKETCAP_API_URI + "/v1/ticker/?limit=10")
        .then((resp) => {
          this.coins = resp.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },

    getCoinImage: function(symbol) {

      symbol = (symbol === "MIOTA" ? "IOT" : symbol);
      symbol = (symbol === "VERI" ? "VRM" : symbol);

      return CRYPTOCOMPARE_URI + this.coinData[symbol].ImageUrl;
    },

    getColor: (num) => {
      return num > 0 ? "color:green;" : "color:red;";
    },
  },
  created: function () {
    this.getCoinData();
  }
});

setInterval(() => {
  app.getCoins();
}, UPDATE_INTERVAL);


export default router;
