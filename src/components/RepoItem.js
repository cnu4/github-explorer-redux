import React from 'react';
import { Link } from 'react-router';
import RepoContent from './RepoContent';
import ReactDom from 'react-dom';
import '../styles/repoItem.scss';

export default class RepoItem extends React.Component {
  constructor(args) {
    super(args);
    this.click = this.click.bind(this);
  }

  click() {
    // const dom = ReactDom.findDOMNode(this.refs.link);
    // action.onNext({
    //   name: ACTIONS.DETAIL_TRANSITION_DATA,
    //   data: {
    //     startPosition: dom.getBoundingClientRect(),
    //     repoData: this.props
    //   }
    // });
    window.console.log('repo click')
  }

  render() {
    return (
      <Link
        ref="link"
        to={`/user/${this.props.owner.login}/repos/${this.props.name}`}
        className="repo-item"
        onClick={this.click}
      >
        <RepoContent {...this.props} />
      </Link>
    );
  }
}
