import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import '../styles/RepoList.scss'
import SearchInput from '../components/SearchInput'
import RepoItem from '../components/RepoItem'
import { searchUserRepos } from '../actions'

class RepoList extends Component {

  constructor() {
    super();

    this.state = {
      searchText: ''
    }

    this.search = this.search.bind(this)
    this.loadMore = this.loadMore.bind(this)
    this.wait = false
  }

  componentDidMount () {
    this.props.searchUserRepos(
      this.props.params.username, this.state.searchText, 1
    )
    this.refs.scrollWrapper.addEventListener('scroll', this.handleScroll.bind(this))
  }

  componentWillUnmount () {
    this.refs.scrollWrapper.removeEventListener('scroll', this.handleScroll.bind(this))
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.params.username !== this.props.params.username) {
      this.props.searchUserRepos(
        nextProps.params.username, this.state.searchText, this.props.page)
    }
  }

  search () {
    if (this.showLoading) {
      return
    }
    this.refs.scrollWrapper.scrollTop = 0;
    this.props.searchUserRepos(
      this.props.params.username, this.state.searchText, 1)
  }

  handleScroll () {
    let lastScrollTop = this.refs.scrollWrapper.scrollTop
    if (this.wait === false) {
      window.requestAnimationFrame(() => {
        if (lastScrollTop > 0) {
          this.refs.searchWrapper.classList.add('shadow')
        } else {
          this.refs.searchWrapper.classList.remove('shadow')
        }
        this.wait = false
      })
      this.wait = true
    }
  }

  loadMore() {
    if (this.props.showLoading) {
      return
    }
    this.props.searchUserRepos(
      this.props.params.username, this.state.searchText, this.props.page + 1)
  }

  render() {
    return (
      <div className="trasition-wrapper">
      <div
        id="repo-list-page"
        className="transition-item"
      >
        <div
          ref="searchWrapper"
          id="search-wrapper"
        >
          <SearchInput
            placeholder="Find a repository..."
            buttonText="SEARCH"
            onChange={e => this.setState({ searchText: e.target.value })}
            onSearch={this.search}
          />
        </div>
        <div
          ref="scrollWrapper"
          id="scroll-wrapper"
        >
          <div id="repo-list">
            {this.props.repos.length === 0 && this.props.page === 1 && !this.props.showLoading ?
              <div className="empty-data">:-( Sad... No result found!</div> :
              <div>
                <div>
                  {this.props.repos.map(repo =>
                    <RepoItem key={repo.id} {...repo} />
                  )}
                </div>

                {!this.props.complete && this.props.repos.length > 0 ?
                  <div
                    id="load-more"
                    onClick={this.loadMore}
                  >
                    {this.props.showLoading ? 'LOADING...' : 'LOAD MORE'}
                  </div>
                : null}
              </div>
            }
          </div>
        </div>
      </div>
      </div>
    );
  }
}

RepoList.propTypes = {
  page: PropTypes.number.isRequired,
  repos: PropTypes.array.isRequired,
  complete: PropTypes.bool.isRequired,
  showLoading: PropTypes.bool.isRequired,
  searchUserRepos: PropTypes.func.isRequired
};
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const { repoPagination, homeLoading } = state
  return {
    ...repoPagination,
    showLoading: homeLoading.showLoading
  }
}
export default connect(mapStateToProps, {
  searchUserRepos
})(RepoList);
