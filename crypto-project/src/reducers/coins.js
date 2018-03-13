import { createSelector } from "reselect";
import { COINS_FETCHED, COIN_CREATED } from "../types";

export default function coins(state = {}, action = {}) {
  switch (action.type) {
    case COINS_FETCHED:
    case COIN_CREATED:
      return { ...state, ...action.data.entities.coins };
    default:
      return state;
  }
}

// SELECTORS

export const coinsSelector = state => state.coins;

export const allCoinsSelector = createSelector(coinsSelector, coinsHash =>
  Object.values(coinsHash)
);
