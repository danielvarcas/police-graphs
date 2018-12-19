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
    lastUpdate : ''
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hello World</h1>
        </header>
        {this.state.crimeData &&<DataVisualisation crimeData={this.state.crimeData} crimeCategories={this.state.crimeCategories} />}
        {/* <DataSelector setMonth={this.setMonth}/> */}
      </div>
    );
  }

  componentDidMount() {
   this.getCrimeCategories()
   this.getLastCrimeUpdate()
  }
componentDidUpdate(prevProps, prevState) {
  if (this.state.lastUpdate !== prevState.lastUpdate)
  {this.getCrimeData()}
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
    console.log(event)
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