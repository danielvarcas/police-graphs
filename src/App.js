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
    crimeData: [],
    selectedMonth: {
      url: '',
      month: ''
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className='graph'>NC Crime</h1>
        </header>
        <DataSelector setMonth={this.setMonth}/>
        {this.state.crimeData.length > 0 &&<DataVisualisation className='graph' crimeData={this.state.crimeData} selectedMonth={this.state.selectedMonth.month} crimeCategories={this.state.crimeCategories} /> || <div><img className='loading' src='http://i.imgur.com/g7TUsLv.png'></img>
        <p>Pls wait, much loading, very api, wow</p></div>}
        
      </div>
    );
  }

  componentDidMount() {
   this.getLastCrimeUpdate()
   this.getCrimeCategories()
  }
componentDidUpdate(prevProps, prevState) {
  if (this.state.selectedMonth !== prevState.selectedMonth)
  {this.setState({crimeData: []})
    this.getCrimeData()}
    console.log(this.state, '@@@@@@@@@@@@@@@@@@')
}

  getCrimeCategories() {
    Axios.get('https://data.police.uk/api/crime-categories')
      .then((response) => {
        return this.setState({
          crimeCategories: response.data
        })
      })
      .catch(console.log('catch block reached'))
  }

  getCrimeData = () => {
    console.log(this.state)
    const date = this.state.selectedMonth.url
    Axios.get(`https://data.police.uk/api/crimes-street/all-crime?lat=53.4860839&lng=-2.242446&date=${date}`).then((response)=>{
    return this.setState({crimeData: response.data})
    })
  }
  
  getLastCrimeUpdate = () => {
    Axios.get('https://data.police.uk/api/crime-last-updated')
    .then((response)=>{
      const date = response.data.date.slice(0,7)
      return this.setState({lastUpdate:  date,}, ()=>{
        this.setMonth()

      })
    })
  }
  
  setMonth = (event) => {
    const months = ['January','February','March','April','May','June','July','August','September','October']
    const date = event ? event.target.value : this.state.lastUpdate
    const month = months[date.slice(-2)-1]
    
    this.setState({selectedMonth: {
     url: date,
     month: month
   } })
 }
}

export default App;