import React, { Component } from "react";
import axios from 'axios';

export default class MyComponent extends Component {
  state = {
    error: null,
    isLoaded: false,
    items: []
  };

  componentDidMount() {
    axios.get("http://quotes.stormconsultancy.co.uk/random.json").then(
      result => {
        this.setState({
          isLoaded: true,
          quote: result.data
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      error => {
        this.setState({
          isLoaded: true,
          error
        });
      }
      );
  }

  render() {
    const { error, isLoaded, quote } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <p> {quote.quote} by {quote.author}</p>
      );
    }
  }
}
