import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';

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
  const { loading } = state
  return {
    showLoading: loading.showLoading,
    doneLoading: loading.doneLoading
  }
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
