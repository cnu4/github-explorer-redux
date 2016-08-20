import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import filesize from 'filesize'
import ReactMarkdown from 'react-markdown'
import classNames from 'classnames'
import '../styles/repoDetail.scss'
import RepoContent from '../components/RepoContent'
import { getRepoDetail,
  getReadme,
  getRepoContents,
  getContribs,
  getLanguages } from '../actions'

const TABS = [
  { key: 'readme', value: 'README' },
  { key: 'files', value: 'FILES & DIRECTORIES' },
  { key: 'contributors', value: 'CONTRIBUTORS' },
  { key: 'languages', value: 'LANGUAGES' }
];

class RepoDetail extends Component {

  constructor() {
    super();
    this.state = {
      activeTab: ''
    }

    this.getProfile = this.getProfile.bind(this);
    this.switchTab = this.switchTab.bind(this);
    this.refreshContentHeight = this.refreshContentHeight.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.repoReadme !== '' && this.state.activeTab === '') {
      this.switchTab(TABS[0])
    }
  }

  componentDidMount () {
    this.getProfile();
  }

  getProfile () {
    this.props.getRepoDetail(this.props.params.username, this.props.params.repoName),
    this.props.getReadme(this.props.params.username, this.props.params.repoName),
    this.props.getRepoContents(this.props.params.username, this.props.params.repoName),
    this.props.getContribs(this.props.params.username, this.props.params.repoName),
    this.props.getLanguages(this.props.params.username, this.props.params.repoName)
  }

  switchTab(tab) {
    this.setState({
      activeTab: tab.key
    }, () => {
      this.refreshContentHeight(tab);
    });
  }

  refreshContentHeight(tab) {
    const selectedTab = document.getElementById(tab.key);
    this.refs.tabContent.style.height = `${selectedTab.offsetHeight + 30}px`;
  }

  getRandomColor () {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
  
  render() {
    return (
      <div
        id="repo-detail"
        className="transition-item"
      >
        <RepoContent {...(this.props.repoDetail)} />

        <div
          id="repo-tabs-wrapper"
          ref="tabWrapper"
        >
          <div id="repo-tabs">
            {TABS.map(tab =>
              <div
                key={tab.key}
                onClick={() => this.switchTab(tab)}
                className={classNames('repo-tab-item',
                                      { selected: this.state.activeTab === tab.key })}
              >{tab.value}</div>
            )}
          </div>
        </div>

        {this.props.failed ?
          <div className="offline-msg">
            You are offline!
            <div onClick={this.getProfile} className="blue-link">Try again</div>
          </div> : null}

        <div ref="tabContent" id="repo-tab-content">
          <div
            className={classNames('repo-content-item', 'markdown-body',
                                  { show: this.state.activeTab === 'readme' })}
            id="readme"
          >
            {this.props.repoReadme ?
              <ReactMarkdown source={this.props.repoReadme} /> :
              <div className="empty-data">No data</div>}
          </div>

          <div
            className={classNames('repo-content-item', { show: this.state.activeTab === 'files' })}
            id="files"
          >
            {this.props.repoContents.length ? this.props.repoContents.map(content =>
              <div key={content.sha + content.name} className="file-item">
                <div className="file-icon">
                  {content.type === 'file' ?
                    <i className="fa fa-file-text-o"></i> :
                    <i className="fa fa-folder"></i>}
                </div>
                <div className="file-info">
                  <div className="file-name">{content.name}</div>
                  <div className="file-date">
                    {content.type === 'file' ?
                      filesize(content.size) : null}
                  </div>
                </div>
              </div>
            ) : <div className="empty-data">No data</div>}
          </div>

          <div
            className={classNames('repo-content-item',
                                  { show: this.state.activeTab === 'contributors' })}
            id="contributors"
          >
            {this.props.repoContribs.length ? this.props.repoContribs.map(contrib =>
              <div key={contrib.id + contrib.login} className="contrib-item">
                <div
                  className="contrib-avatar"
                  style={{ backgroundImage: `url('${contrib.avatar_url}')` }}
                ></div>
                <div className="contrib-info">
                  <div className="contrib-name">{contrib.login}</div>
                  <div className="contrib-value">{contrib.contributions} {' '}
                    contribution{contrib.contributions === 1 ? '' : 's'}</div>
                </div>
              </div>
            ) : <div className="empty-data">No data</div>}
          </div>

          <div
            className={classNames('repo-content-item',
                                  { show: this.state.activeTab === 'languages' })}
            id="languages"
          >
            {this.props.repoLanguages.length ? this.props.repoLanguages.map(language =>
              <div key={language.name} className="lang-item">
                <div
                  className="lang-color"
                  style={{ backgroundColor: this.getRandomColor() }}
                ></div>
                <div className="lang-info">
                  <div className="lang-name">{language.name}</div>
                  <div className="lang-value">{language.value}%</div>
                </div>
              </div>
              ) : <div className="empty-data">No data</div>}
          </div>

        </div>
      </div>
    )
  }
}

RepoDetail.propTypes = {
  showLoading: PropTypes.bool.isRequired,
  failed: PropTypes.bool.isRequired,
  repoDetail: PropTypes.object.isRequired,
  repoReadme: PropTypes.string.isRequired,
  repoContents: PropTypes.array.isRequired,
  repoContribs: PropTypes.array.isRequired,
  repoLanguages: PropTypes.array.isRequired,
  getRepoDetail: PropTypes.func.isRequired,
  getReadme: PropTypes.func.isRequired,
  getRepoContents: PropTypes.func.isRequired,
  getContribs: PropTypes.func.isRequired,
  getLanguages: PropTypes.func.isRequired
};
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const { repoDetail,
    repoReadme,
    repoContents,
    repoContribs,
    repoLanguages,
    homeLoading } = state
  return { repoDetail,
    repoReadme,
    repoContents,
    repoContribs,
    repoLanguages,
    showLoading: homeLoading.showLoading,
    failed: homeLoading.failed
  }
}
export default connect(mapStateToProps, {
  getRepoDetail,
  getReadme,
  getRepoContents,
  getContribs,
  getLanguages
})(RepoDetail);
