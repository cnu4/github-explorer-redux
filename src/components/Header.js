import React, { Component, PropTypes } from 'react';
import '../styles/header.scss';
import '../images/github-logo.png';
import '../images/notification-icon.png';
import { Link } from 'react-router';
import HamburgerIcon from './HamburgerIcon'
import LoadingBlock from './LoadingBlock'

export default class Header extends Component {

  constructor (args) {
    super(args)
    this.hbIconClick = this.hbIconClick.bind(this)
  }

  hbIconClick () {
    this.props.toggleNavMenu()
  }

	render () {
		return (
      <div>
        <div
          ref="header"
          className="header transparent"
        >
          <HamburgerIcon
            id="hamberger-menu"
            onClick={this.hbIconClick}
          />
          <Link to="/">
            <div id="brand-logo"></div>
          </Link>
          <div id="notification-icon"></div>
        </div>
        {this.props.showLoading ?
          <LoadingBlock
            done={this.props.doneLoading}
            failed={this.props.failed}
            hideLoading={this.props.hideLoading}
          /> : null}
      </div>
    )
	}
}

Header.propTypes = {
  toggleNavMenu: PropTypes.func.isRequired,
  hideLoading: PropTypes.func.isRequired
};
