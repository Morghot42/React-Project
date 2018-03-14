import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/auth";
import "../css/homepage.css";

const HomePage = ({ isAuthenticated, logout }) => (
  <div>
    <h1></h1>
    {isAuthenticated ? (
      <button onClick={() => logout()}>Logout</button>
    ) : (
      <div>
        <header class="header">
          <h1 class="logo">Logo</h1>
          <ul class="nav">
            <li><a href="/coinslist">Coins</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Sign In</a></li>
              <li><a href="/new/coin">add coin</a></li>

          </ul>
        </header>
      </div>
    )}
  </div>
);

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(mapStateToProps, { logout:actions.logout })(HomePage);
