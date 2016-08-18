import React from 'react';
import classNames from 'classnames';
import '../styles/loadingBlock.scss';

export default class LoadingBlock extends React.Component {

  constructor(args) {
    super(args);
    this.state = {
      one: false,
      two: false,
      three: false
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.setState({ one: true }), 17);
    this.timer = setTimeout(() => this.setState({ two: true }), 500);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.done) {
      this.setState({ three: true });
    }
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <div
        id="loading-block"
        className={classNames({
          one: this.state.one,
          two: this.state.two,
          three: this.state.three
        })}
      >
      </div>
    );
  }
}
