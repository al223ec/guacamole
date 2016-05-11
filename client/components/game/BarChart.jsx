BarChart = React.createClass({
	componentDidMount: function() {
    var el = this.getDOMNode();
    var mybarChart = new Chart(el, {
      type: 'bar',
      data: this.props.chartData,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });
		this.chart = mybarChart;
  },
	getDefaultProps: function() {
		return {
		  width: 412,
		  height: 324,
			chartData: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
          label: 'Expenses',
          backgroundColor: "#26B99A",
          data: [51, 30, 40, 28, 92, 50, 45]
        }, {
          label: 'Incomes',
          backgroundColor: "#03586A",
          data: [41, 56, 25, 48, 72, 34, 12]
        }]
      }
		}
	},
	componentWillUpdate: function(nextProps) {
		this.chart.data.datasets = nextProps.chartData.datasets;
		this.chart.update();
  },
  render: function() {
      return (
      	<canvas id="mybarChart" height={ this.props.height } width={ this.props.width } style={{ width: this.props.width + 'px', height: this.props.height + 'px' }}></canvas>
      );
  }
});
