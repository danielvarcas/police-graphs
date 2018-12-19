import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Bar, Pie } from 'react-chartjs-2';

class DataVisualisation extends Component {
  render() {
    console.log('PROPS:')
    console.log(this.props)
    // console.log(props)
    const categoriesForGraph = this.props.crimeCategories.slice(1)
    const labels = categoriesForGraph.map(category => category.name)
    console.log(labels)

    const dataCount = this.props.crimeData.reduce((acc, datum)=>{
      const category = datum.category
      if (!acc[category]){acc[category] = 1}
      else {acc[category]++}
      return acc
    }, {})
    console.log(dataCount)

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: labels.map(()=>{return `rgba(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},1)`}),
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: Object.values(dataCount)
        }
      ]
    };
    return (
      <div>
        <h2>Crime in {this.props.selectedMonth}</h2>
        <Pie
          data={data}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  }
}

DataVisualisation.propTypes = {

};

export default DataVisualisation;