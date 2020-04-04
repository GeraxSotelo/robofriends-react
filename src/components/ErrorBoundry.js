import React, { Component } from 'react';

class ErrorBoundry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    }
  }

  //componentDidCatch is like try catch. If anything errors out, it will run this lifecyle hook
  componentDidCatch(error, info) {
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return <h1>Ooops. No good</h1>
    }
    return this.props.children;
  }
}

export default ErrorBoundry;