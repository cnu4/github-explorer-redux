import React from 'react';
import { Link } from 'react-router';
import RepoContent from './RepoContent';
import ReactDom from 'react-dom';
import '../styles/repoItem.scss';

export default class RepoItem extends React.Component {
  constructor(args) {
    super(args);
  }

  render() {
    return (
      <Link
        ref="link"
        to={`/user/${this.props.owner.login}/repos/${this.props.name}`}
        className="repo-item"
      >
        <RepoContent {...this.props} />
      </Link>
    );
  }
}
