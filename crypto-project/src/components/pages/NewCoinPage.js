import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";
import axios from "axios";
import SearchCoinForm from "../forms/SearchCoinForm";
import CoinForm from "../forms/CoinForm";
import { createCoin } from "../../actions/coins";

class NewCoinPage extends React.Component {
  state = {
    coin: null
  };

  onCoinSelect = coin => {
    this.setState({ coin });
    axios
      .get(`/api/coins/fetchPages?id=${coin.id}`)
      .then(res => res.data.pages)
      .then(pages => this.setState({ coin: { ...coin, pages } }));
  };

  addCoin = coin =>
    this.props
      .createCoin(coin)
      .then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <Segment>
        <h1>Add new coin to your collection</h1>
        <SearchCoinForm onCoinSelect={this.onCoinSelect} />

        {this.state.coin && (
          <CoinForm submit={this.addCoin} coin={this.state.coin} />
        )}
      </Segment>
    );
  }
}

NewCoinPage.propTypes = {
  createCoin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, { createCoin })(NewCoinPage);
