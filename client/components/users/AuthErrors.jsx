AuthErrors = React.createClass({
  propTypes: {
    errors: React.PropTypes.object
  },
  render() {
    if (this.props.errors) {
      return (
        <ul className="error-list-group">
          {
            _.values(this.props.errors).map((errorMessage) => {
              return <li key={errorMessage} className="error-list-group-item alert">{errorMessage}</li>;
              })
            }
          </ul>
        )
      }
    }
  });
