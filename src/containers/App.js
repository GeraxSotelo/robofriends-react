import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import { robots } from '../robots'; //files doesn't have default export
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'

import { setSearchField } from '../actions.js'

//Receive a state and return an object
//What state to listen to and send down as props
const mapStateToProps = state => {
  return {
    // The searchField to be return is going to be used as props by the App component
    searchField: state.searchRobots.searchField
  }
}

//Dispatch can be used to send actions
//What props to listen to that are actions to be dispatched
const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  }
}


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      robots: []
      //Redux can replace your state. Will need need this 'searchfield' anymore.
      // searchfield: ''
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users').then(response => {
      return response.json();
    }).then(users => {
      this.setState({ robots: users })
    })

  }

  //With Redux, onSearchChange is now coming down as props so we don't need to declare it as a method
  // onSearchChange = (event) => {
  //   this.setState({ searchfield: event.target.value }); // setState is a method that comes with react
  // }

  render() {
    //destructure
    //Will not need searchfield here anymore because now it's coming down as props
    // const { robots, searchfield } = this.state;
    const { robots } = this.state;
    const { searchField, onSearchChange } = this.props;
    const filteredRobots = robots.filter(r => {
      return r.name.toLowerCase().includes(searchField.toLowerCase())
    })
    if (!robots.length) {
      return <h1 className="tc">Loading...</h1>
    } else {

      return (
        <div className="tc">
          <h1>RoboFriends</h1>
          {/*onSearchChange doesn't come from 'this.onSearchChange' anymore, which was a method. It now comes from the props  */}
          {/* <SearchBox searchChange={this.onSearchChange} /> */}
          <SearchBox searchChange={onSearchChange} />
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


//connect() is higher order function - a function that returns another function
//subscribe to any state changes in the redux store
export default connect(mapStateToProps, mapDispatchToProps)(App);