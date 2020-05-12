import React, { Component } from "react";
import axios from 'axios';

export default class DanComponent extends Component {
  state = {
    error: null,
    isLoaded: false,
    items: []
  };

  componentDidMount() {
    axios.get("https://opentdb.com/api.php?amount=1&category=19&difficulty=medium&type=boolean").then(
      result => {
        this.setState({
          isLoaded: true,
          questions: result.data
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
    const { error, isLoaded, questions } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
        <h2>A question</h2>
        <p> {questions.results[0].question} ( {questions.results[0].difficulty} )</p>
        </div>
      );
    }
  }
}
