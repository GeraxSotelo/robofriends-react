import React from 'react';
import './App.css';
import CardList from './CardList';
import SearchBox from './SearchBox';
import { robots } from './robots'; //files doesn't have default export


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      robots: [],
      searchfield: ''
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users').then(response => {
      return response.json();
    }).then(users => {
      this.setState({ robots: users })
    })

  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value }); //setState is a method that comes with react
  }

  render() {
    const filteredRobots = this.state.robots.filter(r => {
      return r.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
    })
    return (
      <div className="tc">
        <h1 id="title">RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <CardList robots={filteredRobots} />
      </div>
    )
  }
}

export default App;