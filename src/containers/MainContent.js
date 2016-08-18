import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HeaderContainer from '../containers/HeaderContainer';
import '../styles/mainContent.scss'

class MainContent extends Component {
  render() {
    const {actions} = this.props;
    return (
      <div
        id="main-content"
      >
        <HeaderContainer route={this.props.route} />
        <div
          id="scroll-section"
          ref="scrollSection"
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

// MainContent.propTypes = {
//   router: PropTypes.object.isRequired
// };
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {};
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
