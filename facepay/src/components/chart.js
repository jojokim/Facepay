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
      // data: [
      //   {"name":"Average", "data": {1: 3, 2: 4, 3: 5}},
      //   {"name":"Current", "data": {1: 5, 2: 6, 3: 7}}
      // ],
      // data: [
      // {5: 3, 6: 4},
      // {1: 5, 4: 3},
      // ],
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
      // data: [
      //   [1, 1],
      //   [.5, .75],
      // ],
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


// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   View
// } from 'react-native';
// import Svg,{ Circle, Line, G, Path, Text, Rect } from 'react-native-svg'
// import * as d3 from "d3";
// import * as scale from 'd3-scale';
// import _ from 'lodash'
// import { MultiLineChart } from 'react-native-d3multiline-chart'

// var data = [ [ {
//   "y": "202",
//   "x": 2000
// }, {
//   "y": "215",
//   "x": 2001
// }, {
//   "y": "179",
//   "x": 2002
// }],
// [{
//   "y":"152",
//   "x":2000
// }, {
//   "y": "189",
//   "x": 2002
// }, {
//   "y": "179",
//   "x": 2004
// }]
// ]

// let leftAxisData = [
//   134,144,154,164,174,184,194,204,215
// ]

// let bottomAxisData = [
//   2000,2002,2004,2006,2008,2010
// ]
// let legendColor = ['#00b7d4', 'red']
// let legendText = ['sales','year']
// let minX= 2000, maxX= 2010
// let minY= 134, maxY= 215

// var Color = ['#00b7d4','red']
// let bottomAxisDataToShow = [
//     "Jan 2017", "Feb 2017", "Mar 2017", "Apr 2017", "May 2017", "Jun 2017", "Jul 2017", "Aug 2017"
// ]

// export default class Example extends Component {
//   render() {
//     return (
//      <View style={styles.container}>
//        <MultiLineChart data= {data} leftAxisData= {leftAxisData} bottomAxisData= {bottomAxisData} legendColor= {legendColor}
//         legendText= {legendText} minX= {minX} maxX= {maxX} minY= {minY} maxY= {maxY} scatterPlotEnable= {false} dataPointsVisible= {true} Color= {Color}
//         bottomAxisDataToShow={bottomAxisDataToShow}
//         circleLegendType= {true}
//         fillArea= {true}
//         yAxisGrid= {false}
//         xAxisGrid= {false}
//         hideXAxis= {false}
//         hideYAxis= {false}
//         inclindTick= {true} />
//      </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'blue'
//   }
// });
