import React, { Component, PropTypes } from 'react';
import '../styles/header.scss';
import '../images/github-logo.png';
import '../images/notification-icon.png';
import { Link } from 'react-router';
import HamburgerIcon from './HamburgerIcon'
import LoadingBlock from './LoadingBlock'
import { matchParams } from '../utils/router'

export default class Header extends Component {

  constructor (args) {
    super(args)
    this.hbIconClick = this.hbIconClick.bind(this)
  }

  componentDidMount () {
    this.scrollSection = document.getElementById('scroll-section')
    if (this.isUserPage(this.props.route)) {
      this.bindHeaderChange();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.isUserPage(nextProps.route)) {
      this.unbindHeaderChange();
    } else {
      this.bindHeaderChange();
    }
  }

  componentWillUnmount () {
    this.unbindHeaderChange()
  }

  bindHeaderChange () {
    this.unbindHeaderChange()
    this.refs.header.classList.add('transparent')
    this.scrollSection.addEventListener('scroll', this.handleScroll.bind(this))
  }

  unbindHeaderChange () {
    this.refs.header.classList.remove('transparent')
    this.scrollSection.removeEventListener('scroll', this.handleScroll.bind(this))
  }

  handleScroll () {
    this.wait = false
    this.lastScrollTop = this.scrollSection.scrollTop
    if (this.wait === false) {
      window.requestAnimationFrame(() => {
        if (this.lastScrollTop === 0) {
          this.refs.header.classList.add('transparent')
        } else {
          this.refs.header.classList.remove('transparent')
        }
        this.wait = false
      })
      this.wait = true
    }
  }

  isUserPage(route) {
    return route === undefined || // React Router returns undefined on root?
      route === '/' ||
        route === '/user/:username';
  }

  shouldShowBckBtn (route) {
    switch (route) {
      case '/': return false;
      case '/user/:username': return false;
      case '/user/:username/repos': return '/user/:username';
      case '/user/:username/repos/:repoName': return '/user/:username/repos';
      default: return false;
    }
  }

  hbIconClick () {
    const backRoute = this.shouldShowBckBtn(this.props.route)
    if (backRoute) {
      const path = matchParams(backRoute, this.props.params)
      this.context.router.push(path)
      // browserHistory.push(path)
    } else {
      this.props.toggleNavMenu()
    }
  }

	render () {
		return (
      <div>
        <div
          ref="header"
          className="header"
        >
          <HamburgerIcon
            id="hamberger-menu"
            onClick={this.hbIconClick}
            back={this.shouldShowBckBtn(this.props.route)}
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

Header.contextTypes = {
  router: React.PropTypes.object.isRequired
}
