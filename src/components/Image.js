import React from 'react';
import '../styles/image.scss';

export default class Image extends React.Component {

  constructor() {
    super();
    this.state = {
      loaded: false
    };
    this.onImageLoad = this.onImageLoad.bind(this);
  }

  componentDidMount() {
    if (this.props.src) {
      this.img = new window.Image();
      this.img.onload = this.onImageLoad;
      this.img.src = this.props.src;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.img = new window.Image();
      this.img.onload = this.onImageLoad;
      this.img.src = nextProps.src;
      this.setState({ loaded: false });
    }
  }

  componentWillUnmount() {
    if (this.img) {
      this.img.onload = () => {};
    }
  }

  onImageLoad() {
    this.setState({ loaded: true });
  }

  render() {
    return (
      <div
        id={this.props.id}
        className="image-fade"
        style={this.state.loaded ? {
          backgroundImage: `url('${this.props.src}')`,
          opacity: 1
        } : {}}
      >
      </div>
    );
  }

}
