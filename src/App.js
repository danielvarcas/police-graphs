// Street crimes within 1 mile of Northcoders: 
// https://data.police.uk/api/crimes-street/all-crime?lat=53.4860839&lng=-2.242446

import React, { Component } from 'react';
import './App.css';
import DataVisualisation from './components/DataVisualisation';
import Axios from 'axios';
import DataSelector from './components/DataSelector';

class App extends Component {
  state = {
    crimeCategories: [{}],
    lastUpdate : '',
    crimeData: []
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>NC Crime</h1>
        </header>
        <DataSelector setMonth={this.setMonth}/>
        {this.state.crimeData.length > 0 &&<DataVisualisation crimeData={this.state.crimeData} crimeCategories={this.state.crimeCategories} /> || <p>Loading...</p>}
      </div>
    );
  }

  componentDidMount() {
   this.getCrimeCategories()
   this.getLastCrimeUpdate()
  }
componentDidUpdate(prevProps, prevState) {
  if (this.state.lastUpdate !== prevState.lastUpdate)
  {this.setState({crimeData: []})
    this.getCrimeData()}
}

  getCrimeCategories() {
    Axios.get('https://data.police.uk/api/crime-categories')
      .then((response) => {
        console.log('RESPONSE:')
        console.log(response)
        return this.setState({
          crimeCategories: response.data
        })
      })
      .then(() => {
        console.log('STATE:')
        console.log(this.state)
      })
      .catch(console.log('catch block reached'))
  }

  getCrimeData = () => {
    const date = this.state.lastUpdate
    Axios.get(`https://data.police.uk/api/crimes-street/all-crime?lat=53.4860839&lng=-2.242446&date=${date}`).then((response)=>{
    console.log(response)
    return this.setState({crimeData: response.data})
    })
  }
   setMonth = (event) => {
    console.log(event.target.value)
    this.setState({lastUpdate: event.target.value})
  }
  getLastCrimeUpdate = () => {
    Axios.get('https://data.police.uk/api/crime-last-updated')
    .then((response)=>{
      const date = response.data.date.slice(0,7)
      return this.setState({lastUpdate:  date})
    })
  }
}

export default App;