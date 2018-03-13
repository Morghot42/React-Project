import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import { allCoinsSelector } from "../../reducers/coins";
import AddCoinCtA from "../ctas/AddCoinCtA";
import { fetchCoins } from "../../actions/coins";

class DashboardPage extends React.Component {
  componentDidMount = () => this.onInit(this.props);

  onInit = props => props.fetchCoins();

  render() {
    const { isConfirmed, coins } = this.props;
    return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}

        {coins.length === 0 ? <AddCoinCtA /> : <p>You have coins!</p>}
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  fetchCoins: PropTypes.func.isRequired,
  coins: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    coins: allCoinsSelector(state)
  };
}

export default connect(mapStateToProps, { fetchCoins })(DashboardPage);
