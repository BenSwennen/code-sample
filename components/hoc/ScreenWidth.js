import React from "react";

export default WrappedComponent => class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    this.setState({
      width: window.innerWidth,
    });
  }

  render() {
    return (
      <WrappedComponent
        windowWidth={this.state.width}
        windowHeight={this.state.height}
        isMobile={this.state.width < 768}
        isTablet={this.state.width >= 768 && this.state.width < 1024}
        isDesktop={this.state.width > 1024}
        isLargeDesktop={this.state.width >= 1200}
        isExtraLarge={this.state.width >= 1400}
        {...this.props}
      />
    );
  }
};
