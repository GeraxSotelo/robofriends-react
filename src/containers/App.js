import React from 'react';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import { robots } from '../robots'; //files doesn't have default export
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'


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
    //destructure
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(r => {
      return r.name.toLowerCase().includes(searchfield.toLowerCase())
    })
    if (!robots.length) {
      return <h1 className="tc">Loading...</h1>
    } else {

      return (
        <div className="tc">
          <h1>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <ErrorBoundry>
              <CardList robots={filteredRobots} />
            </ErrorBoundry>
          </Scroll>
        </div>
      );
    }
  }
}

export default App;