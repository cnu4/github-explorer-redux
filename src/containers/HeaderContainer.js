import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { hideLoading, toggleNavMenu } from '../actions'

class HeaderContainer extends Component {

	render () {
		return (
      <Header
        {...this.props}
      />
    )
	}
}

HeaderContainer.propTypes = {
  route: PropTypes.string.isRequired,
  toggleNavMenu: PropTypes.func.isRequired,
  hideLoading: PropTypes.func.isRequired
};
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const { homeLoading } = state
  return {
    ...homeLoading
  }
}
export default connect(mapStateToProps, {
  hideLoading,
  toggleNavMenu
})(HeaderContainer);
