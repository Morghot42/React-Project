import { normalize } from "normalizr";
import { COINS_FETCHED, COIN_CREATED } from "../types";
import api from "../api";
import { coinSchema } from "../schemas";

// data.entities.coins
const coinsFetched = data => ({
  type: COINS_FETCHED,
  data
});

const coinCreated = data => ({
  type: COIN_CREATED,
  data
});

export const fetchCoins = () => dispatch =>
  api.coins
    .fetchAll()
    .then(coins => dispatch(coinsFetched(normalize(coins, [coinSchema]))));

export const createCoin = data => dispatch =>
  api.coins
    .create(data)
    .then(coin => dispatch(coinCreated(normalize(coin, coinSchema))));
