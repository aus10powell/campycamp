import React, { Component } from 'react';

import './SearchBox.css';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
  }

  handleOnChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div className='SearchBox'>
        <form onSubmit={this.handleSubmit}>
          <input
            className='SearchBox-text'
            type='text'
            value={this.state.value}
            onChange={this.handleOnChange}
            placeholder='Search'
          />
          <input className='SearchBox-submit' type='submit' value='submit' />
        </form>
      </div>
    );
  }
}

export default SearchBox;
