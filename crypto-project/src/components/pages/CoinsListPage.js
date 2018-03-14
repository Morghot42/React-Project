import React from "react";
import axios from "axios";
import NumberFormat from "react-number-format";
import "../css/CoinsList.css";



class CoinsListPage extends React.Component {
  state = {
      cryptos: []
  };

  componentDidMount() {
    axios.get('https://api.coinmarketcap.com/v1/ticker/')
        .then(res => {
          const cryptos = res.data;
          this.setState({cryptos: cryptos});
        })
  }
  getImageURI(key) {
    return "../../img/" + this.state.cryptos[key].symbol + ".svg";
}
  render() {
    return (

      <div className="App">
        {Object.keys(this.state.cryptos).map((key) => (


          <div className="ui special cards">
            <div className="card">
              <div className="blurring dimmable image">
                <div className="ui dimmer">
                  <div className="content">
                    <div className="center">
                      <div className="ui inverted button">Add Coin</div>
                    </div>
                  </div>
                </div>
                <img src={this.getImageURI(key)}/>
              </div>
              <div className="content">
                <a className="header">{this.state.cryptos[key].name}</a>
                <div className="meta">
                  <span className="date">{this.state.cryptos[key].price_usd} $</span>
                </div>
              </div>
              <div className="extra content">
                <a>
                  <i className="currency icon"></i>
                Change 24 h :  {this.state.cryptos[key].percent_change_24h} %
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default (CoinsListPage);
