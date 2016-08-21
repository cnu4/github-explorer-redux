import React, { Component, PropTypes } from 'react';
import classNames from 'classnames'
import SearchInput from './SearchInput'
import Image from './Image'
import '../styles/navMenu.scss'
import { fullNavMenu } from '../actions'

export default class NavMenu extends Component {

  constructor (args) {
    super(args)
    this.state = {
      searchText: ''
    }
    this.onSearchTextChange = this.onSearchTextChange.bind(this)
    this.userClick = this.userClick.bind(this)
    this.cancelFullMenu = this.cancelFullMenu.bind(this)
  }

  componentDidMount () {
    this.props.getUsers()
  }

  onSearchTextChange (e) {
    this.setState({
      searchText: e.target.value
    })
    this.props.getUsers(e.target.value)
  }

  cancelFullMenu () {
    this.props.openNavMenu()
    this.setState({searchText: ''})
  }

  userClick (path) {
    this.props.closeNavMenu()
    // browserHistory.push(path)
    this.context.router.push(path)
  }

	render () {
		return (
      <div
        id="nav-menu"
        className={classNames({ open: this.props.menuStatus === 'open' })}
      >
        <div
          id="search-bar"
          ref="searchBar"
        >
          <SearchInput
            onFocus={this.props.fullNavMenu}
            onChange={this.onSearchTextChange}
            value={this.state.searchText}
            placeholder="Search by username..."
            onSearch={() => this.props.getUsers(this.state.searchText)}
          />
          <div
            id="cancel-button"
            className={classNames({ show: this.props.menuStatus === 'full' })}
            onClick={this.cancelFullMenu}
          >Cancel
          </div>
        </div>
        <div
          id="user-list"
          ref="userList"
        >
          {this.props.searching ?
            <div id="loading">
              <div className="loading"></div>
            </div> :
            <div>
            {this.props.users.length ? this.props.users.map(user =>
              <a
                key={user.id}
                className="user-item"
                onClick={() => this.userClick(`/user/${user.login}`)}
              >
                <Image
                  className="user-avatar"
                  src={`https://avatars.githubusercontent.com/u/${user.id.split('-')[1]}`}
                />
                <div className="user-info">
                  <div className="fullname">{user.fullname || user.login}</div>
                  <div className="username">{user.login || user.fullname}</div>
                </div>
              </a>
              ) : <div className="empty-data">
                We couldn’t find any users matching {this.state.searchText}
              </div>
            }
            </div>
          }
        </div>
      </div>
    )
	}
}

NavMenu.propTypes = {
  menuStatus: PropTypes.string.isRequired,
  fullNavMenu: PropTypes.func.isRequired,
  openNavMenu: PropTypes.func.isRequired,
  closeNavMenu: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  searching: PropTypes.bool.isRequired
};

NavMenu.contextTypes = {
  router: React.PropTypes.object.isRequired
}
