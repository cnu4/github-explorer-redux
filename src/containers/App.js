import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainContent from '../containers/MainContent';
import '../styles/App.scss'

class App extends Component {
  render() {
    const {actions} = this.props;
    return (
      <div>
        <div id="menu-overlay"
             onClick={() => 1}>
        </div>
        <MainContent
          route={this.props.routes[this.props.routes.length - 1].path}
          location={this.props.location}
        >
          {this.props.children}
        </MainContent>
      </div>
    );
  }
}

// App.propTypes = {
//   router: PropTypes.object.isRequired
// };
App.contextTypes = {
  router: React.PropTypes.object.isRequired
};
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
export default connect(mapStateToProps, mapDispatchToProps)(App);
