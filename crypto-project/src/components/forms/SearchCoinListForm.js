import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Form, Dropdown } from "semantic-ui-react";
import "../../CoinsList.css";
import NumberFormat from "react-number-format";

class SearchCoinListForm extends React.Component {
  constructor(props); {
  this.state = {
    cryptos: []
  };
}


componentDidMount() {
  axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,IOT&tsyms=USD')
      .then(res => {
        const cryptos = res.data;
        console.log(cryptos);
        this.setState({cryptos: cryptos});
      })
}
  render() {
    return (
      <div className="App">
        {Object.keys(this.state.cryptos).map((key) => (
          <div id="crypto-container">
            <span className="left">{key}</span>
            <span className="right"><NumberFormat value={this.state.cryptos[key].USD} displayType={'text'} decimalPrecision={2} thousandSeparator={true} prefix={'$'} /></span>
          </div>
        ))}
      </div>
    );
  }
}


export default SearchCoinListForm;
