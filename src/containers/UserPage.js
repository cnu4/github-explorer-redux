import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Profile from '../components/Profile';
import RepoItem from '../components/RepoItem';
import { Link } from 'react-router';
import '../styles/userPage.scss'
import { loadUserProfile, loadUserProfileRepos, getRandomUser } from '../actions'

class UserPage extends Component {

  constructor() {
    super();
  }

  componentDidMount () {
    this.loadUser(this.props.params.username)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.params.username != this.props.params.username) {
      this.loadUser(nextProps.params.username)
    }
    if (nextProps.randomUser.login && !this.props.params.username && !this.randomUser) {
      this.randomUser = nextProps.randomUser.login
      this.loadUser(nextProps.randomUser.login)
    }
  }

  loadUser (username) {
    if (username) {
      this.props.loadUserProfile(username)
      this.props.loadUserProfileRepos(username)
    } else {
      this.props.getRandomUser()
    }
  }

  render() {
    return (
      <div id="user-page">
        <Profile
          username={this.props.userProfile.login}
          profile={this.props.userProfile || {}}
        />
        <div className="repo-list">
          <div className="repo-list-header">POPULAR REPOSITORIES</div>
          <div>
            {this.props.repos.map(repo =>
              <RepoItem key={repo.id} {...repo} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

UserPage.propTypes = {
  userProfile: PropTypes.object.isRequired,
  repos: PropTypes.array.isRequired,
  randomUser: PropTypes.object.isRequired,
  loadUserProfile: PropTypes.func.isRequired,
  loadUserProfileRepos: PropTypes.func.isRequired,
  getRandomUser: PropTypes.func.isRequired
};
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const { userProfile, userProfileRepos, randomUser } = state
  return {
    userProfile,
    repos: userProfileRepos,
    randomUser
  }
}
export default connect(mapStateToProps, {
  loadUserProfile,
  loadUserProfileRepos,
  getRandomUser
})(UserPage);
