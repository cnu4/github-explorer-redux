import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NavMenu from '../components/NavMenu'
import { fullNavMenu, openNavMenu, closeNavMenu, getUsers } from '../actions'

class NavMenuContainer extends Component {
  render() {
    return (
      <NavMenu
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const { menuStatus, userSearching, users } = state;
  return {
    menuStatus,
    ...userSearching,
    users
  };
}
export default connect(mapStateToProps, {
  fullNavMenu,
  openNavMenu,
  closeNavMenu,
  getUsers
})(NavMenuContainer);
