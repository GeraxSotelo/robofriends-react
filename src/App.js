import React from 'react';
import './App.css';
import CardList from './CardList';
import SearchBox from './SearchBox';
import { robots } from './robots'; //files doesn't have default export
import Scroll from './Scroll'


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
    if (this.state.robots.length == 0) {
      return <h1 className="tc">Loading...</h1>
    } else {

      return (
        <div className="tc">
          <h1>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
    }
  }
}

export default App;