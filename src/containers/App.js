import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainContent from '../containers/MainContent';
import NavMenuContainer from '../containers/NavMenuContainer'
import '../styles/App.scss'
import { closeNavMenu } from '../actions'

class App extends Component {
  render() {
    const {actions} = this.props;
    return (
      <div className={this.props.menuStatus + '-menu'}>
        <div id="menu-overlay"
             onClick={() => this.props.closeNavMenu()}>
        </div>
        <NavMenuContainer menuStatus={this.props.menuStatus}/>
        <MainContent
          route={this.props.route.path}
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
}
App.propTypes = {
  menuStatus: React.PropTypes.string.isRequired,
  closeNavMenu: React.PropTypes.func.isRequired
}
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const { menuStatus } = state;
  return {
    menuStatus
  };
}
export default connect(mapStateToProps, {
  closeNavMenu
})(App);
