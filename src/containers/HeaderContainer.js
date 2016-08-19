import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { hideLoading } from '../actions'

class HeaderContainer extends Component {

	render () {
		return (
      <Header
        {...this.props}
      />
    )
	}
}

// HeaderContainer.propTypes = {
//   router: PropTypes.object.isRequired
// };
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const { homeLoading } = state
  return {
    ...homeLoading
  }
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = { hideLoading };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
