// Street crimes within 1 mile of Northcoders: 
// https://data.police.uk/api/crimes-street/all-crime?lat=53.4860839&lng=-2.242446

import React, { Component } from 'react';
import './App.css';
import DataVisualisation from './components/DataVisualisation';
import Axios from 'axios';

class App extends Component {
  state = {
    crimeCategories: [{}]
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hello World</h1>
        </header>
        {this.state.crimeData &&<DataVisualisation crimeData={this.state.crimeData} crimeCategories={this.state.crimeCategories} />}
      </div>
    );
  }

  componentDidMount() {
    this.getCrimeCategories()
    this.getCrimeData()
  }
  getCrimeCategories() {
    Axios.get('https://data.police.uk/api/crime-categories')
      .then((response) => {
        console.log('RESPONSE:')
        console.log(response)
        this.setState({
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
    Axios.get('https://data.police.uk/api/crimes-street/all-crime?lat=53.4860839&lng=-2.242446').then((response)=>{
    console.log(response)
    this.setState({crimeData: response.data})
    })
  }
}

export default App;