BarChart = React.createClass({
	componentDidMount: function() {
    var el = document.getElementById("mybarChart"); // this.getDOMNode();
    var mybarChart = new Chart(el, {
      type: 'bar',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
          label: '# of Votes',
          backgroundColor: "#26B99A",
          data: [51, 30, 40, 28, 92, 50, 45]
        }, {
          label: '# of Votes',
          backgroundColor: "#03586A",
          data: [41, 56, 25, 48, 72, 34, 12]
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  },
	getDefaultProps: function() {
		return {
		  width: 412,
		  height: 824
		}
	},
  render: function() {
      return (
      	<canvas id="mybarChart" height="412" width="824" style={{ width: '412px', height: '206px' }}></canvas>
      );
  }
});
