import { Chart } from 'react-google-charts';
import React from 'react';

class DataChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: 'Current value vs Average Value',
        hAxis: { title: 'Time', minValue: 0, maxValue: 5},
        vAxis: { title: 'Sum', minValue: 0, maxValue: 1 },
        legend: 'none',
      },
      rows: [
        [0, 0, 0],
        [.15, .2, .5],
        [.3, .8, .6],
        [.45, .3, .7],
        [.6, .5, .4],
        [.75, .45, .5],
        [.9, .3, .4],
        [1.05, .88, .3],
        [1.2, .63, .54],
        [1.35, .56, .66],
      ],
      columns: [
        {
          type: 'number',
          label: 'X',
        },
        {
          type: 'number',
          label: 'Average',
        },
        {
          type: 'number',
          label: 'Current',
        },

      ],

    };
  }
  render() {
    return (
      <div>
        <div chartName="Chart1">
          <Chart 
            id='average'
            chartType="LineChart" 
            rows={this.state.rows}
            columns={this.state.columns}
            width="100%"
            options={this.state.options}>
          </Chart>
        </div>
      </div>
    );
  }
}
export default DataChart;