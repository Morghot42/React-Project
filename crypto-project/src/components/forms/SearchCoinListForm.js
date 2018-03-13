import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Form, Dropdown } from "semantic-ui-react";

class SearchCoinListForm extends React.Component {
  state = {
    query: "",
    loading: false,
    options: [],
    coins: {}
  };

  onSearchChange = (e, data) => {
    clearTimeout(this.timer);
    this.setState({
      query: data.searchQuery
    });
    this.timer = setTimeout(this.fetchOptions, 1000);
  };

  onChange = (e, data) => {
    this.setState({ query: data.value });
    this.props.onCoinSelect(this.state.coins);
  };

  fetchOptions = () => {
    if (!this.state.query) return;
    this.setState({ loading: true });
    axios
      .get(`/api/coinsList`)
      .then(res => res.data.coins)
      .then(coins => {
        const options = [];
        const coinsHash = {};
        coins.forEach(coin => {
          coinsHash[coins.id] = coin;
          options.push({
            key: coin.id,
            value: coin.id,
            text: coin.name
          });
        });
        this.setState({ loading: false, options, coins: coinsHash });

      });
   };



  render() {
    return (
      <Form>
        <Dropdown
          search
          fluid
          placeholder="Search for a coin by title"
          value={this.state.query}
          onSearchChange={this.onSearchChange}
          options={this.state.options}
          loading={this.state.loading}
          onChange={this.onChange}
        />
      </Form>
    );
  }
}

SearchCoinForm.propTypes = {
  onCoinSelect: PropTypes.func.isRequired
};

export default SearchCoinListForm;
